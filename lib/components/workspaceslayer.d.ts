import * as React from "react";
import { DataSource } from "webpanel-data";
import { IWorkspace } from "../session";
interface IWorkspacesLayerRenderProps {
    workspaces: IWorkspace[];
    error?: Error;
    loading: boolean;
}
interface IWorkspacesLayerProps {
    dataSource: DataSource;
    memberID: string;
    render: (props: IWorkspacesLayerRenderProps) => JSX.Element;
}
export declare class WorkspacesLayer extends React.Component<IWorkspacesLayerProps> {
    render(): JSX.Element;
}
export {};
