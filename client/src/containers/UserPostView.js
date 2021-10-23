import { NavBar } from '../containers/NavBar';
import PropTypes from 'prop-types';
import React from 'react';
import { UserPostForm } from '../containers/UserPostForm';

export class UserPostView extends React.Component {
    /**
     * @property {String} [match.params.commentId] id of comment to reply to (injected by react-router)
     * @property {String} [match.params.entryId] id of entry to reply to (injected by react-router)
     */
    static get propTypes() {
        return {
            // from withRouter HOC
            match: PropTypes.shape({
                    params: PropTypes.shape({
                        commentId: PropTypes.string,
                        entryId: PropTypes.string,
                    }).isRequired,
                }).isRequired,
            location: PropTypes.object.isRequired,
            history: PropTypes.object.isRequired,
        };
    };


    static get defaultProps() {
        return {};
    };


    _handleSubmit = () => {
        this.props.history.goBack();
    };


    render() {
        const {commentId, entryId} = this.props.match.params;
        
        return (
            <div>
                <NavBar
                    hasGoBack
                    hideNavigation
                    mainContent={commentId && entryId ? "Neuer Kommentar" : "Neuer Eintrag"}
                />
                <UserPostForm
                    onSubmit={this._handleSubmit}
                    replyCommentId={commentId}
                    replyEntryId={entryId}
                />
            </div>
        );
    }
}
