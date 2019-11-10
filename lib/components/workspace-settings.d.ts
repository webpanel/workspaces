import * as React from 'react';
import { IMembershipListRole } from 'webpanel-membershiplist';
import { DataSource } from 'webpanel-data';
interface IWorkspaceSettingsProps {
    dataSource: DataSource;
    workspaceID: string;
    roles?: IMembershipListRole[];
}
export declare class WorkspaceSettings extends React.Component<IWorkspaceSettingsProps> {
    render(): JSX.Element;
}
export {};
