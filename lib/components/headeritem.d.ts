import * as React from "react";
import { IWorkspace } from "../session";
import { DataSource } from "webpanel-data";
import { IMembershipListRole } from "webpanel-membershiplist";
interface IWorkspaceMenuItemProps {
    dataSource: DataSource;
    memberID: string;
    onChange?: (selectedWorkspace: IWorkspace) => void;
    roles?: IMembershipListRole[];
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
