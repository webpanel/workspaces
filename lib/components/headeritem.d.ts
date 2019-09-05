import * as React from 'react';
import { IWorkspace } from '../session';
import { DataSource } from 'webpanel-data';
interface IWorkspaceMenuItemProps {
    dataSource: DataSource;
    onChange?: (selectedWorkspace: IWorkspace) => void;
}
interface IWorkspaceMenuItemState {
    addingWorkspace: boolean;
    editingWorkspaceID: string | undefined;
}
export declare class WorkspaceHeaderItem extends React.Component<IWorkspaceMenuItemProps, IWorkspaceMenuItemState> {
    state: IWorkspaceMenuItemState;
    private session;
    render(): JSX.Element;
    private editWorkspaceModal;
    private getAddingWorkspaceModal;
}
export {};
