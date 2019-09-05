import * as React from 'react';
import { DataSource } from 'webpanel-data';
interface IWorkspaceDetailProps {
    dataSource: DataSource;
    workspaceID: string;
}
export declare class WorkspaceSettings extends React.Component<IWorkspaceDetailProps> {
    render(): JSX.Element;
}
export {};
