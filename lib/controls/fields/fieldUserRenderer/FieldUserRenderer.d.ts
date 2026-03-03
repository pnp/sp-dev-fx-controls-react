import * as React from 'react';
import { IPrincipal } from '../../../common/SPEntities';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
import { IContext } from '../../../common/Interfaces';
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
export declare class FieldUserRenderer extends React.Component<IFieldUserRendererProps, IFieldUserRendererState> {
    private _loadedUserProfiles;
    private _userUrlTemplate;
    private _userImageUrl;
    constructor(props: IFieldUserRendererProps, state: IFieldUserRendererState);
    UNSAFE_componentWillReceiveProps(nextProps: IFieldUserRendererProps): void;
    render(): JSX.Element;
    /**
     * Renders compact part of user Hover Card
     * @param index user index in the list of users/groups in the People and Group field value
     * @param user IUser
     */
    private _onRenderCompactCard;
    /**
     * Renders expanded part of user Hover Card
     * @param user IUser
     */
    private _onRenderExpandedCard;
    /**
     * Merges data from IPrincipal object and IUserProfileProperties object to IUser object
     * @param principal IPrincipal
     * @param userProfileProperties IUserProfileProperties
     */
    private _getUserFromPrincipalAndProps;
    /**
     * Get the template of url for editing user profile in Delve
     */
    private _getUserUrlTemplate;
    /**
     * Requests User Profile Properties
     */
    private _requestUserProfile;
}
//# sourceMappingURL=FieldUserRenderer.d.ts.map