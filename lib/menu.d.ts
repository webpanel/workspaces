import * as React from 'react';
import { IWorkspace } from './session';
interface IWorkspaceMenu {
    workspaces: IWorkspace[];
    onSelect: (workspace: IWorkspace) => void;
}
export declare class WorkspaceMenu extends React.Component<IWorkspaceMenu> {
    render(): JSX.Element;
}
export {};
