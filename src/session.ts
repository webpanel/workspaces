export interface IWorkspace {
  id: string;
  name: string;
}

export const getCurrentWorkspaceID = (): string => {
  const w = WorkspaceSession.shared().getCurrentWorkspace();
  return (w && w.id) || '';
};

let sharedWorkspaceSession: WorkspaceSession | undefined;
const selectedWorkspaceStorageKey = 'selectedWorkspace';

export class WorkspaceSession {
  public static shared(): WorkspaceSession {
    if (!sharedWorkspaceSession) {
      sharedWorkspaceSession = new WorkspaceSession();
    }
    return sharedWorkspaceSession;
  }

  public onCurrentWorkspaceChange?: (workspace: IWorkspace | null) => void;

  public getCurrentWorkspace(): IWorkspace | undefined {
    const data = localStorage.getItem(selectedWorkspaceStorageKey);
    if (!data) {
      return undefined;
    }
    return JSON.parse(data);
  }

  public setCurrentWorkspace(workspace: IWorkspace) {
    localStorage.setItem(
      selectedWorkspaceStorageKey,
      JSON.stringify(workspace)
    );
    if (this.onCurrentWorkspaceChange) {
      this.onCurrentWorkspaceChange(workspace);
    }
  }

  public clearCurrentWorkspace() {
    localStorage.removeItem(selectedWorkspaceStorageKey);
    if (this.onCurrentWorkspaceChange) {
      this.onCurrentWorkspaceChange(null);
    }
  }
}
