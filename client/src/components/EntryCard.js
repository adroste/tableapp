import { Button, Card, Dimmer, Icon, Image, Label, Loader } from 'semantic-ui-react';

import { Content } from '../components/Content';
import PropTypes from 'prop-types';
import React from 'react';
import { SortedUserRolesByPriority } from '../containers/SortedUserRolesByPriority';
import { Thumbnails } from '../containers/Thumbnails';
import { UpDownVote } from '../components/UpDownVote';
import styled from 'styled-components';

const CustomCard = styled(Card)`
    &&& {
        margin: .5em 1px;
        width: calc(100% - 2px); /* margin left 1px + margin right 1px */
    }
`;


const CardContentSubControls = styled(Card.Content).attrs({
    extra: true
})`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;


const ControlItem = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: ${props => props.left ? "flex-start" : (props.right ? "flex-end" : "center")};
`;


const CardMetaFlexAligned = styled(Card.Meta)`
    display: flex;
    align-items: center;
`;


const FlexStretch = styled.div`
    flex: 1;
    display:flex;
    align-items:center;
    flex-wrap: wrap;
    overflow: hidden;
`;


const ControlIconButton = styled(Button).attrs({
    basic: true,
    size: "small"
})`
    &&&&&&&& {
        white-space: nowrap;
        padding-left: 3px;
        padding-right: 3px;
        box-shadow: none !important;
    }

    &&&&:active {
        background: none !important;
    }
`;


export class EntryCard extends React.PureComponent {
    /**
     * @property {object} [entry] entry object (injected by redux via id)
     * @todo
     */
    static get propTypes() {
        return {
            entry: PropTypes.shape({
                authorId: PropTypes.string,
                commentAttendingUserIds: PropTypes.arrayOf(PropTypes.string),
                commentCount: PropTypes.number.isRequired,
                content: PropTypes.string,
                imageIds: PropTypes.arrayOf(PropTypes.string),
                isDeleted: PropTypes.bool,
                isLiveAnswered: PropTypes.bool,
                score: PropTypes.number.isRequired,
                timestamp: PropTypes.number,
                vote: PropTypes.number,
            }),
            onCommentClick: PropTypes.func.isRequired,
            onContentClick: PropTypes.func.isRequired,
            onMoreClick: PropTypes.func.isRequired,
            onVoteChange: PropTypes.func.isRequired,
        };
    };

    static get defaultProps() {
        return {};
    };


    render() {
        // render loader with wireframe if entry is empty
        if (!this.props.entry)
            return (
                <Dimmer.Dimmable as={CustomCard} fluid dimmed>
                    <Dimmer inverted active>
                        <Loader inverted />
                    </Dimmer>
                    <Card.Content>
                        <Image src='/assets/img/paragraph-wireframe.png' />
                    </Card.Content>
                </Dimmer.Dimmable>
            );

        const { onContentClick, onCommentClick, onMoreClick, onVoteChange } = this.props;

        const { authorId, commentAttendingUserIds, commentCount, content, 
            imageIds, isDeleted, isLiveAnswered, score, timestamp, vote } = this.props.entry;

        return (
            <CustomCard 
                fluid
            >
                <Card.Content
                    onClick={onContentClick}
                >
                    <Card.Description>
                        <Content
                            authorId={authorId}
                            content={content}
                            isDeleted={isDeleted}
                            timestamp={timestamp}
                        />
                        <Thumbnails imageIds={imageIds}/>
                    </Card.Description>
                    <CardMetaFlexAligned>
                            <span>
                                <Icon name="comments"/>
                                <span>{commentCount}</span>
                            </span>
                            <FlexStretch>
                                <SortedUserRolesByPriority
                                    userIds={commentAttendingUserIds}
                                />
                            </FlexStretch>
                            {isLiveAnswered &&
                                <Label 
                                    color="blue"
                                    basic
                                >
                                    In Veranstaltung beantwortet
                                </Label>
                            }
                    </CardMetaFlexAligned>
                </Card.Content>
                <CardContentSubControls>
                    <ControlItem>
                        <UpDownVote
                            disabled={isDeleted}
                            onVoteChange={onVoteChange}
                            score={score}
                            vote={vote}
                        />
                    </ControlItem>
                    <ControlItem>
                        <ControlIconButton 
                            icon='ellipsis horizontal' 
                            onClick={onMoreClick}                            
                        />
                    </ControlItem>
                    <ControlItem>
                        <ControlIconButton 
                            icon='comment'
                            content='Kommentieren'
                            disabled={isDeleted}
                            onClick={onCommentClick}                                                  
                        />
                    </ControlItem>
                </CardContentSubControls>
            </CustomCard>
        );
    }
}
