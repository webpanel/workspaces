export var getCurrentWorkspaceID = function () {
    var w = WorkspaceSession.shared().getCurrentWorkspace();
    return (w && w.id) || '';
};
var sharedWorkspaceSession;
var selectedWorkspaceStorageKey = 'selectedWorkspace';
var WorkspaceSession = /** @class */ (function () {
    function WorkspaceSession() {
    }
    WorkspaceSession.shared = function () {
        if (!sharedWorkspaceSession) {
            sharedWorkspaceSession = new WorkspaceSession();
        }
        return sharedWorkspaceSession;
    };
    WorkspaceSession.prototype.getCurrentWorkspace = function () {
        var data = localStorage.getItem(selectedWorkspaceStorageKey);
        if (!data) {
            return undefined;
        }
        return JSON.parse(data);
    };
    WorkspaceSession.prototype.setCurrentWorkspace = function (workspace) {
        localStorage.setItem(selectedWorkspaceStorageKey, JSON.stringify(workspace));
        if (this.onCurrentWorkspaceChange) {
            this.onCurrentWorkspaceChange(workspace);
        }
    };
    WorkspaceSession.prototype.clearCurrentWorkspace = function () {
        localStorage.removeItem(selectedWorkspaceStorageKey);
        if (this.onCurrentWorkspaceChange) {
            this.onCurrentWorkspaceChange(null);
        }
    };
    return WorkspaceSession;
}());
export { WorkspaceSession };
//# sourceMappingURL=session.js.map