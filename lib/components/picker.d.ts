import * as React from 'react';
import { IWorkspace } from '../session';
import { DataSource } from 'webpanel-data';
interface IWorkspacePickerRenderProps {
    workspaces: IWorkspace[];
    selectedWorkspace: IWorkspace;
}
interface IWorkspacePickerProps {
    dataSource: DataSource;
    render: (props: IWorkspacePickerRenderProps) => React.ReactNode;
}
export declare class WorkspacePicker extends React.Component<IWorkspacePickerProps> {
    private session;
    constructor(props: IWorkspacePickerProps);
    getCurrentWorkspace(): IWorkspace | undefined;
    render(): JSX.Element;
    private errorModal;
}
export {};
