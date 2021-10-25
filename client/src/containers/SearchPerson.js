import { Icon, Message, Search } from 'semantic-ui-react';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { getUserDict } from '../reducers/eventInfo';

class SearchPerson extends React.Component {
    static get propTypes() {
        return {
            onResultSelect: PropTypes.func.isRequired,
        };
    };

    static get defaultProps() {
        return {};
    };


    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            results: [],
            value: '',
        };
    }


    _handleResultSelect = (e, { result }) => {
        this.setState({
            value: '',
        });
        if (this.props.onResultSelect)
            this.props.onResultSelect(e, result.id);
    };


    _handleSearchChange = (e, { value }) => {
        this.setState({
            isLoading: true,
            value,
        });
        this._performSearch(value);
    };


    _performSearch = debounce((value) => {
        let results = [];
        if (value) {
            const { userDict } = this.props;
            results = Object.keys(userDict).reduce((acc, userId) => {
                const curUser = userDict[userId];
                if (curUser.name.indexOf(value) !== -1 || curUser.email.indexOf(value) !== -1)
                    acc.push({
                        id: userId,
                        title: curUser.name,
                        description: curUser.email,
                    });
                return acc;
            }, []);
        }

        this.setState({
            isLoading: false,
            results,
        });
    }, 300);


    render() {
        const { className } = this.props;
        const { isLoading, results, value } = this.state;

        return (
            <>
                <Search
                    className={className}
                    loading={isLoading}
                    onResultSelect={this._handleResultSelect}
                    onSearchChange={this._handleSearchChange}
                    results={results}
                    value={value}
                    placeholder="Person suchen..."
                    fluid
                />
                <Message 
                    info 
                    size="tiny"
                >
                    <Icon name="info" size="small"/>
                    Es können nur Personen gesucht werden, die der Veranstaltung bereits beigetreten sind.
                </Message>
            </>
        );
    }
}


const mapStateToProps = (state, props) => {
    return {
        userDict: getUserDict(state.eventInfo),
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
    };
}


const ConnectedSearchPerson = connect(mapStateToProps, mapDispatchToProps)(SearchPerson);
export { ConnectedSearchPerson as SearchPerson };