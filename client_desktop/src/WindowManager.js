const electron = require('electron');
const defaults = require('./defaults');
const debounce = require('lodash.debounce');
const log = require('./log');


class WindowManager {
    logDebug(method) {
        const bounds = this.browserWindow.getBounds();
        log.debug(`${method.padEnd(40)}\t
            ${JSON.stringify(WindowManager.getDisplayForBounds(bounds).id).padEnd(30)}\t
            ${JSON.stringify(bounds).padEnd(200)}\t
            ${JSON.stringify(this.isMiniControlViewActive).padEnd(5)}\t
            ${JSON.stringify(this.boundsByScreenSetup)}`);
    }

    constructor(browserWindow) {
        this.browserWindow = browserWindow;
        this.boundsByScreenSetup = {};
        this.isMiniControlViewActive = false;

        const debouncedUpdateBounds = debounce(() => this.updateBounds(), 250);

        browserWindow.on('move', debouncedUpdateBounds);
        browserWindow.on('resize', debouncedUpdateBounds);
        electron.screen.on("display-added", () => this.restorePosition());
        electron.screen.on("display-metrics-changed", () => this.ensureWindowIsInScreenBounds());
        electron.screen.on("display-removed", () => this.restorePosition());

        this.updateBounds();
        log.debug(`WM SCREENS ${JSON.stringify(electron.screen.getAllDisplays())}`);
    }


    static getDisplayForBounds(bounds) {
        // use midpoint
        const x = bounds.x + parseInt(bounds.width / 2);
        const y = bounds.y + parseInt(bounds.height / 2);
        // x, y should be ints #windows-bug
        return electron.screen.getDisplayNearestPoint({ x, y });
    }


    static getScreenSetupHash() {
        const displayIds = electron.screen.getAllDisplays().map(disp => disp.id);
        displayIds.sort();
        return displayIds.reduce((acc, cur) => {
            return acc + cur.toString();
        }, "");
    }


    ensureWindowIsInScreenBounds() {
        this.logDebug('WM::ensureWindowIsInScreenBounds start');
        const win = this.browserWindow.getBounds();
        const screen = WindowManager.getDisplayForBounds(win).bounds;
        // left + top check should have priority before right + bottom
        if (win.x + win.width > screen.x + screen.width) // right
            win.x = screen.x + screen.width - win.width;
        if (win.y + win.height > screen.y + screen.height) // bottom
            win.y = screen.y + screen.height - win.height;
        if (win.x < screen.x) // left
            win.x = screen.x;
        if (win.y < screen.y) // top
            win.y = screen.y;

        // ensure window fits screen size
        if (win.width > screen.width)
            win.width = screen.width;
        if (win.height > screen.height)
            win.height = screen.height;

        this.browserWindow.setBounds(win);
        this.logDebug('WM::ensureWindowIsInScreenBounds end');
    }


    restorePosition() {
        log.debug(`WM SCREENS ${JSON.stringify(electron.screen.getAllDisplays())}`);
        this.logDebug('WM::restorePosition start');
        const screenHash = WindowManager.getScreenSetupHash();
        const boundsSS = this.boundsByScreenSetup[screenHash];
        if (!boundsSS) 
            return this.updateBounds();
        const view = this.isMiniControlViewActive ? 'miniControlView' : 'normalView';
        const bounds = boundsSS[view];
        if (bounds) {
            this.browserWindow.setBounds(bounds);
        } else { 
            // ensure proper window-size to fix OS' window-bounds-cache 
            // restoring wrong bounds after screen-setup-change if setup was already
            // used before but in other mode
            // e.g. cur screensetup was used with normalView before and is now entered in minicontrolView
            // or cur screensetup was used with minicontrolview before is now entered in normalview

            let width = defaults.windowSize[view].width;
            let height = defaults.windowSize[view].height;
            // find existing valid setup for view
            const validSetupHash = Object.keys(this.boundsByScreenSetup).find((key) => this.boundsByScreenSetup[key][view]);
            if (validSetupHash) {
                width = this.boundsByScreenSetup[validSetupHash][view].width;
                height = this.boundsByScreenSetup[validSetupHash][view].height;
            }
            this.browserWindow.setSize(width, height);
        }
        this.logDebug('WM::restorePosition end');
    }


    setAlwaysOnTop(alwaysOnTop) {
        this.logDebug('WM::setAlwaysOnTop start');
        if (alwaysOnTop) {
            if (electron.app.dock) // macOS
                electron.app.dock.hide();
            this.browserWindow.setAlwaysOnTop(true, 'floating');
            this.browserWindow.setVisibleOnAllWorkspaces(true);
            this.browserWindow.setFullScreenable(false);
            if (electron.app.dock) // macOS
                electron.app.dock.show();
        } else {
            this.browserWindow.setAlwaysOnTop(false, 'normal');
            this.browserWindow.setVisibleOnAllWorkspaces(false);
            this.browserWindow.setFullScreenable(true);
        }
        this.logDebug('WM::setAlwaysOnTop end');
    }


    setMiniControlViewActive(active) {
        this.logDebug('WM::setMiniControlViewActive start');
        if (active === this.isMiniControlViewActive)
            return; // no change => do nothing
        this.isMiniControlViewActive = active;

        let curBounds = this.browserWindow.getBounds();
        let nextBounds = null;
        let newMinimumSize = null;
        
        if (active) { // init mini-control-view
            this.browserWindow.setOpacity(.85);
            newMinimumSize = { 
                width: defaults.windowSize.miniControlView.minWidth, 
                height: defaults.windowSize.miniControlView.minHeight, 
            };
            nextBounds = { 
                x: curBounds.x, 
                y: curBounds.y, 
                width: defaults.windowSize.miniControlView.width, 
                height: defaults.windowSize.miniControlView.height, 
            };
            const miniControlViewBounds = this.boundsByScreenSetup[WindowManager.getScreenSetupHash()].miniControlView;
            if (miniControlViewBounds)
                nextBounds = miniControlViewBounds;
        } else { // return to normal/full - view
            this.browserWindow.setOpacity(1);
            newMinimumSize = { 
                width: defaults.windowSize.normalView.minWidth, 
                height: defaults.windowSize.normalView.minHeight, 
            };
            nextBounds = { 
                x: curBounds.x, 
                y: curBounds.y, 
                width: defaults.windowSize.normalView.width, 
                height: defaults.windowSize.normalView.height, 
            };
            const normalViewBounds = this.boundsByScreenSetup[WindowManager.getScreenSetupHash()].normalView;
            if (normalViewBounds)
                nextBounds = normalViewBounds;
        }

        const curScreen = WindowManager.getDisplayForBounds(curBounds);
        const nextScreen = WindowManager.getDisplayForBounds(nextBounds);
        // check if nextScreen is curScreen, if it differs
        // use current position and scale (bounds-)rect at midpoint
        if (curScreen.id !== nextScreen.id) {
            // x, y should be ints #windows-bug
            const moveDiffX = parseInt((nextBounds.width - curBounds.width) / 2);
            const moveDiffY = parseInt((nextBounds.height - curBounds.height) / 2);
            nextBounds.x = curBounds.x - moveDiffX;
            nextBounds.y = curBounds.y - moveDiffY;
        }

        this.browserWindow.setMinimumSize(newMinimumSize.width, newMinimumSize.height);
        this.browserWindow.setBounds(nextBounds);
        this.logDebug('WM::setMiniControlViewActive end');

        //this.ensureWindowIsInScreenBounds(); // called anyway by updateBounds() after move/resize event
    }


    updateBounds() {
        this.logDebug('WM::updateBounds start');
        const screenHash = WindowManager.getScreenSetupHash();
        const curBounds = this.browserWindow.getBounds();
        if (!this.boundsByScreenSetup[screenHash])
            this.boundsByScreenSetup[screenHash] = {};
        if (this.isMiniControlViewActive)
            this.boundsByScreenSetup[screenHash].miniControlView = curBounds;
        else
            this.boundsByScreenSetup[screenHash].normalView = curBounds;
        this.ensureWindowIsInScreenBounds();
        this.logDebug('WM::updateBounds end');
    }
}

module.exports = WindowManager;