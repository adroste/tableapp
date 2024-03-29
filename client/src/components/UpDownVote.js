import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

// "&&&&..." is a required hack to bump specificity 
// in order to override semantic-uis !important rules, dev will not fix this (e.g. gh-#1591)
// TODO fix onclick design: colored has no bg, uncolored has grey bg (maybe make both grey bg)
const ButtonVote = styled(Button).attrs({
    basic: true
})`
    &&&&&&&& {
        margin: 0 !important;
        box-shadow: none !important;
        ${props => props.count && `
            padding: 0;
            opacity: 1 !important;
        `}
    }

    &&&&:active {
        background: none !important;
    }

    &&&&>i.icon {
        opacity: .8;
    }
`;


const Count = styled.span`
    position: relative;
    width: 20px;
    padding: 0;
    
    &:before {
        content: attr(data-number);
        position: absolute;
        font-size: 1rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(-50%) translateX(10px);;
    }
`;


export class UpDownVote extends React.Component {
    /**
     * @property {string} [className] className
     * @property {function(vote: number)} onVoteChange vote changed callback (0: no vote, 1: up, -1: down)
     * @property {number} score score/points to display
     * @property {number} [vote=0] user-vote as number (0: no vote, >0: up, <0: down)
     */
    static get propTypes() {
        return {
            className: PropTypes.string,
            disabled: PropTypes.bool,
            onVoteChange: PropTypes.func.isRequired,
            score: PropTypes.number.isRequired,
            vote: PropTypes.number,
        };
    };
    
    static get defaultProps() {
        return {
            vote: 0
        };
    };


    _handleVoteUpClick = (e) => {
        if (this.props.disabled) return;
        this.props.onVoteChange(this.props.vote > 0 ? 0 : 1);
    };


    _handleVoteDownClick = (e) => {
        if (this.props.disabled) return;
        this.props.onVoteChange(this.props.vote < 0 ? 0 : -1);
    };


    render() {
        const { disabled, score, vote } = this.props;

        return (
            <Button.Group className={this.props.className} size="small">
                <ButtonVote 
                    icon="arrow up" 
                    color={vote > 0 ? "blue" : null}
                    disabled={disabled}
                    onClick={this._handleVoteUpClick}
                />
                <Count
                    data-number={score}
                    style={{color: vote > 0 ? "#2185d0" : (vote < 0 ? "#db2828" : null)}}
                />
                <ButtonVote 
                    icon="arrow down" 
                    color={vote < 0 ? "red" : null}
                    disabled={disabled}
                    onClick={this._handleVoteDownClick}
                />
            </Button.Group>                      
        );
    }
}