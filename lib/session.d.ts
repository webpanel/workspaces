export interface IWorkspace {
    id: string;
    name: string;
}
export declare const getCurrentWorkspaceID: () => string;
export declare class WorkspaceSession {
    static shared(): WorkspaceSession;
    onCurrentWorkspaceChange?: (workspace: IWorkspace | null) => void;
    getCurrentWorkspace(): IWorkspace | undefined;
    setCurrentWorkspace(workspace: IWorkspace): void;
    clearCurrentWorkspace(): void;
}
