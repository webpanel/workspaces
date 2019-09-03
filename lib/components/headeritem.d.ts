import * as React from 'react';
import { IWorkspace } from '../session';
interface IWorkspaceMenuItemProps {
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
