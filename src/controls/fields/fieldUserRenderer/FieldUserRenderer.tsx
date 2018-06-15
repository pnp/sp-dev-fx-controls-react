import { override } from '@microsoft/decorators';
import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import * as _ from '@microsoft/sp-lodash-subset';
import { HoverCard, IExpandingCardProps, DirectionalHint, Persona, IconButton, Button, ButtonType, PersonaSize, Spinner, SpinnerSize, Link, Icon } from 'office-ui-fabric-react';

import { IPrincipal, IUserProfileProperties, IODataKeyValuePair } from '../../../common/SPEntities';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';

import styles from './FieldUserRenderer.module.scss';
import { IContext } from '../../../common/Interfaces';
import { GeneralHelper } from '../../../common/utilities/GeneralHelper';
import { SPHttpClient } from '@microsoft/sp-http';
import FieldUserHoverCard, { IFieldUserHoverCardProps } from './FieldUserHoverCard';
import * as appInsights from '../../../common/appInsights';

import * as strings from 'ControlStrings';
import { SPHelper } from '../../../common/utilities';

export interface IFieldUserRendererProps extends IFieldRendererProps {
    /**
     * users to be displayed
     */
    users?: IPrincipal[];
    /**
     * Customizer context
     */
    context: IContext;
}

/**
 * Internal interface to work with user profile
 */
export interface IFieldUser {
    /**
     * display  name
     */
    displayName?: string;
    /**
     * job title
     */
    jobTitle?: string;
    /**
     * department
     */
    department?: string;
    /**
     * user id
     */
    id?: string;
    /**
     * avatar url
     */
    imageUrl?: string;
    /**
     * email
     */
    email?: string;
    /**
     * skype for business username
     */
    sip?: string;
    /**
     * true if the user is current user
     */
    currentUser?: boolean;
    /**
     * work phone
     */
    workPhone?: string;
    /**
     * cell phone
     */
    cellPhone?: string;
    /**
     * url to edit user profile in Delve
     */
    userUrl?: string;
}

export interface IFieldUserRendererState {
    users?: IFieldUser[];
}

/**
 * Field User Renderer.
 * Used for:
 *   - People and Groups
 */
export class FieldUserRenderer extends React.Component<IFieldUserRendererProps, IFieldUserRendererState> {

    // cached user profiles
    private _loadedUserProfiles: { [id: string]: IUserProfileProperties } = {};
    private _userUrlTemplate: string;
    private _userImageUrl: string;


    public constructor(props: IFieldUserRendererProps, state: IFieldUserRendererState) {
        super(props, state);

        appInsights.track('FieldUserRenderer', {});

        this._userImageUrl = `${GeneralHelper.trimSlash(props.context.pageContext.web.absoluteUrl)}/_layouts/15/userphoto.aspx?size=L&accountname={0}`;

        const users: IFieldUser[] = this.props.users ? this.props.users.map(user => {
            return this._getUserFromPrincipalAndProps(user, {});
        }) : [];

        this.state = {
            users: users
        };
    }

    @override
    public render(): JSX.Element {
        const userEls: JSX.Element[] = this.state.users.map((user, index) => {
            const expandingCardProps: IExpandingCardProps = {
                onRenderCompactCard: (user.email ? this._onRenderCompactCard.bind(this, index) : null),
                onRenderExpandedCard: (user.email ? this._onRenderExpandedCard.bind(this) : null),
                renderData: user,
                directionalHint: DirectionalHint.bottomLeftEdge,
                gapSpace: 1,
                expandedCardHeight: 150
            };
            const hoverCardProps: IFieldUserHoverCardProps = {
                expandingCardProps: expandingCardProps,
                displayName: user.displayName,
                cssProps: this.props.cssProps
            };
            return <FieldUserHoverCard {...hoverCardProps} />;
        });
        return <div style={this.props.cssProps} className={css(this.props.className)}>{userEls}</div>;
    }

    /**
     * Renders compact part of user Hover Card
     * @param index user index in the list of users/groups in the People and Group field value
     * @param user IUser
     */
    private _onRenderCompactCard(index: number, user: IFieldUser): JSX.Element {
        this._requestUserProfile(user, index);
        const sip: string = user.sip || user.email;
        let actionsEl: JSX.Element;
        if (user.currentUser) {
            actionsEl = <div className={styles.actions}>
                <Button buttonType={ButtonType.command} iconProps={{ iconName: 'Edit' }} href={user.userUrl} target={'_blank'}>{strings.UpdateProfile}</Button>
            </div>;
        }
        else {
            actionsEl = <div className={styles.actions}>
                <IconButton iconProps={{ iconName: 'Mail' }} title={strings.SendEmailTo.replace('{0}', user.email)} href={`mailto:${user.email}`} />
                <IconButton iconProps={{ iconName: 'Chat' }} title={strings.StartChatWith.replace('{0}', sip)} href={`sip:${sip}`} className={styles.chat} />
            </div>;
        }

        return <div className={styles.main}>
            <Persona
                imageUrl={user.imageUrl}
                primaryText={user.displayName}
                secondaryText={user.department}
                tertiaryText={user.jobTitle}
                size={PersonaSize.large} />
            {actionsEl}
        </div>;
    }

    /**
     * Renders expanded part of user Hover Card
     * @param user IUser
     */
    private _onRenderExpandedCard(user: IFieldUser): JSX.Element {
        if (this._loadedUserProfiles[user.id]) {
            return <ul className={styles.sections}>
                <li className={styles.section}>
                    <div className={styles.header}>{strings.Contact} <Icon iconName="ChevronRight" className={styles.chevron} /></div>
                    <div className={styles.contactItem}>
                        <Icon iconName={'Mail'} />
                        <Link className={styles.content} title={user.email} href={`mailto:${user.email}`} target={'_self'}>{user.email}</Link>
                    </div>
                    {user.workPhone &&
                        <div className={styles.contactItem}>
                            <Icon iconName={'Phone'} />
                            <Link className={styles.content} title={user.workPhone} href={`tel:${user.workPhone}`} target={'_self'}>{user.workPhone}</Link>
                        </div>
                    }
                    {user.cellPhone &&
                        <div className={styles.contactItem}>
                            <Icon iconName={'Phone'} />
                            <Link className={styles.content} title={user.cellPhone} href={`tel:${user.cellPhone}`} target={'_self'}>{user.cellPhone}</Link>
                        </div>
                    }
                </li>
            </ul>;
        }
        else {
            return <Spinner size={SpinnerSize.large} />;
        }
    }

    /**
     * Merges data from IPrincipal object and IUserProfileProperties object to IUser object
     * @param principal IPrincipal
     * @param userProfileProperties IUserProfileProperties
     */
    private _getUserFromPrincipalAndProps(principal: IPrincipal, userProfileProperties: IUserProfileProperties): IFieldUser {
        let imageUrl: string = userProfileProperties.pictureUrl || principal.picture;
        const mthumbStr = 'MThumb.jpg';
        if (imageUrl && imageUrl.indexOf(mthumbStr) === imageUrl.length - mthumbStr.length) {
            imageUrl = '';
        }
        return {
            displayName: userProfileProperties.displayName || principal.title,
            jobTitle: userProfileProperties.jobTitle || principal.jobTitle,
            department: userProfileProperties.department || principal.department,
            id: principal.id,
            imageUrl: imageUrl ? this._userImageUrl.replace('{0}', principal.email) : imageUrl,
            email: userProfileProperties.email || principal.email,
            sip: userProfileProperties.sip || principal.sip,
            workPhone: userProfileProperties.workPhone,
            cellPhone: userProfileProperties.cellPhone,
            userUrl: this._getUserUrlTemplate().replace('{0}', principal.email), //userProfileProperties.userUrl
            currentUser: principal.id == this.props.context.pageContext.legacyPageContext.userId
        };
    }

    /**
     * Get the template of url for editing user profile in Delve
     */
    private _getUserUrlTemplate(): string {
        if (!this._userUrlTemplate) {
            this._userUrlTemplate = `${location.protocol}//${location.hostname.split('.sharepoint.com')[0]}-my.sharepoint.com/person.aspx?user={0}&v=editprofile`;
        }

        return this._userUrlTemplate;
    }

    /**
     * Requests User Profile Properties
     */
    private async _requestUserProfile(user: IFieldUser, index: number): Promise<void> {
        if (this._loadedUserProfiles[user.id]) {
            return; // we've already have the profile info
        }

        const context: IContext = this.props.context;

        const siteUser = await SPHelper.getUserById(parseInt(user.id), context);

        const value = await SPHelper.getUserProperties(siteUser.LoginName, context);

        const mthumbStr = 'MThumb.jpg';
        const userProfileProps: IUserProfileProperties = {
            displayName: value.DisplayName,
            email: value.Email,
            jobTitle: value.Title,
            userUrl: value.UserUrl,
            pictureUrl: value.PictureUrl && value.PictureUrl.toString().indexOf(mthumbStr) === value.PictureUrl.toString().length - mthumbStr.length ? '' : value.PictureUrl //this._userImageUrl.replace('{0}', user.email)
        };

        const props: IODataKeyValuePair[] = value.UserProfileProperties as IODataKeyValuePair[];
        let foundPropsCount: number = 0;
        for (let i = 0, len = props.length; i < len; i++) {
            const prop: IODataKeyValuePair = props[i];
            switch (prop.Key) {
                case 'WorkPhone':
                    userProfileProps.workPhone = prop.Value;
                    foundPropsCount++;
                    break;
                case 'Department':
                    userProfileProps.department = prop.Value;
                    foundPropsCount++;
                    break;
                case 'SPS-SipAddress':
                    userProfileProps.sip = prop.Value;
                    foundPropsCount++;
                    break;
                case 'CellPhone':
                    userProfileProps.cellPhone = prop.Value;
                    foundPropsCount++;
                    break;
            }

            if (foundPropsCount === 4) {
                break;
            }
        }

        this._loadedUserProfiles[user.id] = userProfileProps;
        this.setState((prevState: IFieldUserRendererState, componentProps: IFieldUserRendererProps) => {
            const newUsers = _.clone<IFieldUser[]>(prevState.users);
            newUsers[index] = this._getUserFromPrincipalAndProps(this.props.users[index], userProfileProps);

            return { users: newUsers };

        });
    }
}
