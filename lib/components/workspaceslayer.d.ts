import * as React from 'react';
import { IWorkspace } from '../session';
interface IWorkspacesLayerRenderProps {
    workspaces: IWorkspace[];
    error?: Error;
    loading: boolean;
}
interface IWorkspacesLayerProps {
    render: (props: IWorkspacesLayerRenderProps) => JSX.Element;
}
export declare class WorkspacesLayer extends React.Component<IWorkspacesLayerProps> {
    constructor(props: IWorkspacesLayerProps);
    getCurrentWorkspace(): IWorkspace | undefined;
    render(): JSX.Element;
}
export {};
