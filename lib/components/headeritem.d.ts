import * as React from 'react';
interface IWorkspaceMenuItemState {
    addingWorkspace: boolean;
    editingWorkspaceID: string | undefined;
}
export declare class WorkspaceHeaderItem extends React.Component<any, IWorkspaceMenuItemState> {
    state: IWorkspaceMenuItemState;
    private session;
    render(): JSX.Element;
    private editWorkspaceModal;
    private getAddingWorkspaceModal;
}
export {};
