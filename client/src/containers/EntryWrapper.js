import * as commentsActions from '../actions/comments';
import * as entriesActions from '../actions/entries';

import { Dimmer, Loader } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { CommentsView } from './CommentsView';
import { CommentsWrapper } from './CommentsWrapper';
import { NotFoundView } from '../components/NotFoundView';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getEntry } from '../reducers/entries';

/**
 * Main routing view, if active event is selected.
 * 
 * __Exported component is connected to router.__
 * __Exported component is connected to redux-store. Some props are injected by HOC.__
 * @param {object} props
 * @param {object} props.entriesActions object containing bound entriesActions (injected by redux)
 * @param {boolean} props.isDesktopApp indicates if app is running in electron environment (injected by redux)
 * @param {boolean} props.isSwitchActiveEventPending indicates if currently switching active event (injected by redux)
 */
class EntryWrapper extends React.Component {
    static get propTypes() {
        return {
            // from withRouter HOC
            match: PropTypes.object.isRequired,
            location: PropTypes.object.isRequired,
            history: PropTypes.object.isRequired,
        };
    };

    static get defaultProps() {
        return {};
    };


    componentDidMount() {
        this.props.entriesActions.subscribeEntries([this.props.match.params.entryId]);
        this.props.commentsActions.subscribeCommentsForEntry(this.props.match.params.entryId);
    }

    
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.entryId === this.props.match.params.entryId)
            return;
        this.props.entriesActions.unsubscribeEntries([prevProps.match.params.entryId]);
        this.props.commentsActions.unsubscribeCommentsForEntry();
        this.props.entriesActions.subscribeEntries([this.props.match.params.entryId]);
        this.props.commentsActions.subscribeCommentsForEntry(this.props.match.params.entryId);
    }

    /**
     * Lifecycle that unsubscribes entry list.
     * @function
     */
    componentWillUnmount() {
        this.props.entriesActions.unsubscribeEntries([this.props.match.params.entryId]);
        this.props.commentsActions.unsubscribeCommentsForEntry();
    }


    render() {
        const { entry } = this.props;

        if (entry === undefined)
            return (
                <Dimmer
                    active
                    page
                    inverted
                >
                    <Loader inverted/>
                </Dimmer>
            );

        if (entry === null)
            return (
                <Route path="*" component={NotFoundView} status={404}/>                    
            );

        return (
            <div>
                <Switch>
                    <Route path="/:eventId/:entryId/:commentId" component={CommentsWrapper}/>,
                    <Route path="/:eventId/:entryId" component={CommentsView}/>,
                </Switch>
            </div>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        entry: getEntry(state.entries, props.match.params.entryId),
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        commentsActions: bindActionCreators(commentsActions, dispatch),
        entriesActions: bindActionCreators(entriesActions, dispatch),
    };
}


const ConnectedEntryWrapper = withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryWrapper));
export { ConnectedEntryWrapper as EntryWrapper };