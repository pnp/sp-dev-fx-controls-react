import * as React from 'react';
import { ISecurityTrimmedControlProps, ISecurityTrimmedControlState } from '.';
export declare class SecurityTrimmedControl extends React.Component<ISecurityTrimmedControlProps, ISecurityTrimmedControlState> {
    constructor(props: React.PropsWithChildren<ISecurityTrimmedControlProps>);
    /**
     * componentDidMount lifecycle method
     */
    componentDidMount(): void;
    /**
     * componentDidUpdate lifecycle method
     */
    componentDidUpdate(prevProps: ISecurityTrimmedControlProps, prevState: ISecurityTrimmedControlState): void;
    /**
     * Check if the user has the permissions to render the element
     */
    private checkPermissions;
    /**
     * Check the user its permissions on the remote site
     */
    private checkRemoteSitePermissions;
    /**
     * Check the user its permissions on the remote list or library
     */
    private checkRemoteListOrLibPermissions;
    /**
     * Check permissions on item level
     */
    private checkRemoteListItem;
    /**
     * Check permissions on folder
     */
    private checkRemoteFolder;
    /**
     * Check the permissions
     *
     * @param apiUrl
     */
    private checkRemotePermissions;
    /**
     * Default React render method
     */
    render(): React.ReactElement<ISecurityTrimmedControlProps>;
}
//# sourceMappingURL=SecurityTrimmedControl.d.ts.map