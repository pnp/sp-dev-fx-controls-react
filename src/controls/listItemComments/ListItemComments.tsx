import { PrimaryButton, Persona, TextField, PersonaSize, ActionButton, Dialog, DialogFooter, DefaultButton, DialogType } from 'office-ui-fabric-react';
import styles from './ListItemComments.module.scss';
import * as React from "react";
import * as telemetry from '../../common/telemetry';
import SPservice from "../../services/SPService";
import { IListItemCommentsProps } from './IListItemCommentsProps';
import { IListItemCommentsState } from './IListItemCommentsState';
import TimeAgo from 'timeago-react';

export class ListItemComments extends React.Component<IListItemCommentsProps, IListItemCommentsState>{
    private _spservice: SPservice;

    constructor(props: IListItemCommentsProps) {
        super(props);
        telemetry.track('ListItemComments', {});
        this.state = {
            comments: [],
            itemFetchError: false,
            commentText: "",
            hideDeleteDialog: true
        };
        this._spservice = new SPservice(this.props.context);
        this.loadComments(this.props.listId, this.props.itemID);
    }

    public componentWillReceiveProps(nextProps: IListItemCommentsProps) {
        let listID: string = this.props.listId;
        let itemID: number = this.props.itemID;
        let flag: boolean = false;
        if (this.props.listId !== nextProps.listId) {
            listID = nextProps.listId;
            flag = true;
        }
        if (this.props.itemID !== nextProps.itemID) {
            itemID = nextProps.itemID;
            flag = true;
        }
        if (flag) {
            this.loadComments(listID, itemID);
        }
    }

    public loadComments = (listID: string, itemID: number) => {
        try {
            this._spservice.getListItemComments(listID, itemID).then((itemComments) => {
                console.log(itemComments);
                this.setState({ comments: itemComments, itemFetchError: false });
            }).catch((err) => {
                this.setState({ itemFetchError: true, comments: [] });
                console.log(err);
            });
        } catch (error) {
            this.setState({ itemFetchError: true, comments: [] });
            console.log(error);
        }
    }

    public addCommentClick = () => {
        try {
            this._spservice.addListItemComments(this.props.listId, this.props.itemID, this.state.commentText)
                .then((addedComment) => {
                    let comments = this.state.comments;
                    comments.unshift(addedComment);
                    this.setState({ commentText: "", comments: comments });
                    console.log(addedComment);
                }).catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }

    private toggleHideDeleteDialog = () => {
        this.setState({ hideDeleteDialog: !this.state.hideDeleteDialog });
    }

    private deleteDialog = () => {
        try {
            this._spservice.deleteListItemComments(this.props.listId, this.props.itemID,
                this.state.deleteCommentID, this.props.webUrl).then((deletedComment) => {
                    let comments = this.state.comments;
                    let index = comments.findIndex((t) => t.id === `${this.state.deleteCommentID}`);
                    if (index > -1) {
                        comments.splice(index, 1);
                    }
                    this.setState({
                        hideDeleteDialog: true,
                        comments: comments
                    });
                }).catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }

    private likeUnlikeComment = (commentId: number, actionType: string) => {
        try {
            this._spservice.likeUnlikeListItemComments(this.props.listId, this.props.itemID,
                commentId, actionType, this.props.webUrl).then((likeUnlikedComment) => {
                    let comments = this.state.comments;
                    let index = comments.findIndex((t) => t.id == `${commentId}`);
                    if (index > -1) {
                        comments[index].isLikedByUser = !comments[index].isLikedByUser;
                    }
                    this.setState({ comments: comments });
                }).catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    }

    public render(): React.ReactElement<IListItemCommentsProps> {
        return (
            <div className={`${this.props.className} ${styles.listItemComments}`}>
                {
                    !this.state.itemFetchError &&
                    <div style={{ display: "flex" }}>
                        <Persona
                            styles={{ root: { margin: "1.5em 10px 1em" } }}
                            imageUrl={`/_layouts/15/userphoto.aspx?size=S&accountname=${this.props.context.pageContext.user.email}`}
                            size={PersonaSize.size32}
                            hidePersonaDetails={true}
                            imageAlt="Current User"
                        />
                        <TextField className={styles.textField} styles={{
                            fieldGroup: { minHeight: 30 },
                            root: { width: "80%" }
                        }}
                            placeholder={`Add a comment.`}
                            onChange={(ev, newVal) => { this.setState({ commentText: newVal }); }}
                            value={this.state.commentText} multiline rows={1} />
                        <PrimaryButton styles={{ root: { margin: "1.5em 10px 1em" } }}
                            text={this.props.replyButtonText ? this.props.replyButtonText : 'Post'}
                            onClick={this.addCommentClick} />
                    </div>
                }
                {this.state.comments.map((comment) =>
                    <div style={{ display: "flex", marginTop: 10 }}>
                        <Persona
                            imageUrl={`/_layouts/15/userphoto.aspx?size=S&accountname=${comment.author.email}`}
                            size={PersonaSize.size32}
                            hidePersonaDetails={true}
                            imageAlt="comment user"
                            styles={{ root: { margin: "0 10px" } }}
                        />
                        <div className={styles.comment}>
                            <div className={`content`}>
                                <div className={styles.author}>{comment.author.name}</div>
                                <div className={styles.metadata}>
                                    <div><TimeAgo
                                        datetime={comment.createdDate}></TimeAgo></div>
                                </div>
                                <div className={styles.text} dangerouslySetInnerHTML={{ __html: comment.text }} ></div>
                                <ActionButton
                                    iconProps={{ iconName: comment.isLikedByUser ? 'LikeSolid' : 'Like' }}
                                    onClick={() =>
                                        this.likeUnlikeComment(parseInt(comment.id),
                                            comment.isLikedByUser ? 'unlike' : 'like')}>
                                    {comment.isLikedByUser ? 'Unlike' : 'Like'}
                                </ActionButton>
                                {comment.author.email === this.props.context.pageContext.user.email &&
                                    <ActionButton
                                        iconProps={{ iconName: 'Delete' }}
                                        onClick={() => {
                                            this.setState({
                                                hideDeleteDialog: false,
                                                deleteCommentID: parseInt(comment.id)
                                            });
                                        }}>
                                        {'Delete'}
                                    </ActionButton>}
                            </div>
                        </div>
                    </div>
                )}
                <Dialog
                    hidden={this.state.hideDeleteDialog}
                    onDismiss={this.toggleHideDeleteDialog}
                    dialogContentProps={{
                        type: DialogType.close,
                        title: 'Delete Confirmation',
                        closeButtonAriaLabel: 'Close',
                        subText: 'Are you sure you want to delete this comment?',
                    }}
                >
                    <DialogFooter>
                        <PrimaryButton onClick={this.deleteDialog} text="OK" />
                        <DefaultButton onClick={this.toggleHideDeleteDialog} text="No" />
                    </DialogFooter>
                </Dialog>
            </div>
        );
    }

}