import { getActiveEventId, getActiveEventName } from '../reducers/events';

import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import React from 'react';
import { config } from '../config';
import { connect } from 'react-redux';
import { pathJoin } from '../utils';
import styled from 'styled-components';

const CenteredContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const QRCodeWrapper = styled.div` 
    width: 100%;
    max-width: 75vh;
`;


const QRCodeWrapperInner = styled.div`
    width: 100%;
    padding-top: 100%;
    position: relative;

    & > svg {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
`;

/**
 * @callback ActiveEventQrCodeModal~onCloseCallback
 * @param {Event} e 
 */

/**
 * Displays a modal showing a qr code with direct join link to the active event.
 * 
 * __Exported component is connected to redux-store. Some props are injected by HOC.__
 * @param {object} props
 * @param {string} props.activeEventId id of event (injected by redux)
 * @param {string} props.activeEventName name/title of event (injected by redux)
 * @param {ActiveEventQrCodeModal~onCloseCallback} props.onClose callback if user clicked on close
 * @param {object} [props.trigger] trigger component
 */
class ActiveEventQrCodeModal extends React.Component {
    static get propTypes() {
        return {
            activeEventId: PropTypes.string.isRequired,
            activeEventName: PropTypes.string.isRequired,
            onClose: PropTypes.func.isRequired,
            trigger: PropTypes.object,
        };
    };

    static get defaultProps() {
        return {
        };
    };
    

    render() {
        const {activeEventId, activeEventName, onClose, trigger} = this.props;
        const joinUrl = pathJoin(config.TABLE_BASE_URL, activeEventId);

        return (
            <Modal 
                trigger={trigger}
                open={!trigger}
                closeIcon
                closeOnDocumentClick={true}
                onClose={onClose}
            >
                <Modal.Header>
                    {activeEventName}
                </Modal.Header>
                <Modal.Content>
                    <CenteredContent>
                        <QRCodeWrapper>
                            <QRCodeWrapperInner>
                                <QRCode
                                    renderAs="svg"
                                    value={joinUrl}
                                    onClick={this._handleQrCodeZoomCloseClick}
                                />
                            </QRCodeWrapperInner>
                        </QRCodeWrapper>
                    </CenteredContent>
                </Modal.Content>
                {/* <Modal.Actions>
                    <Button
                        content="Schließen"
                        onClick={this._handleCloseClick}
                    />
                </Modal.Actions> */}
            </Modal>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        activeEventId: getActiveEventId(state.events),
        activeEventName: getActiveEventName(state.events),
    }
};


const ConnectedActiveEventQrCodeModal = connect(mapStateToProps)(ActiveEventQrCodeModal);
export { ConnectedActiveEventQrCodeModal as ActiveEventQrCodeModal };
