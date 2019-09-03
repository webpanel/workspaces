var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { Alert, Modal, Spin } from 'antd';
import { WorkspaceSession } from '../session';
import { AuthSession } from 'webpanel-auth';
import { Button } from 'antd';
import { WorkspaceMenu } from '../menu';
import { WorkspacesLayer } from './workspaceslayer';
var WorkspacePicker = /** @class */ (function (_super) {
    __extends(WorkspacePicker, _super);
    function WorkspacePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.session = WorkspaceSession.shared();
        _this.session.onCurrentWorkspaceChange = function () {
            _this.forceUpdate();
        };
        return _this;
    }
    WorkspacePicker.prototype.getCurrentWorkspace = function () {
        return;
    };
    WorkspacePicker.prototype.render = function () {
        var _this = this;
        return (React.createElement(WorkspacesLayer, { render: function (_a) {
                var error = _a.error, loading = _a.loading, workspaces = _a.workspaces;
                if (error) {
                    return _this.errorModal(error.message);
                }
                if (loading) {
                    return (React.createElement(Spin, { spinning: loading, style: {
                            width: '100%',
                            height: '100%',
                            marginTop: '30px'
                        } }));
                }
                var currentWorkspace = _this.session.getCurrentWorkspace();
                if (currentWorkspace &&
                    workspaces.map(function (w) { return w.id; }).indexOf(currentWorkspace.id) === -1) {
                    _this.session.clearCurrentWorkspace();
                }
                if (workspaces.length === 0) {
                    return _this.errorModal("You don't have access to any workspace :(");
                    // return workspace.getCreateView(
                    //   {
                    //     wrapperType: "modal",
                    //     modal: {
                    //       closable: false,
                    //       visible: true,
                    //       title: "Create new workspace"
                    //     }
                    //   },
                    //   { onSave: () => refetch() }
                    // );
                }
                var selectedWorkspace = currentWorkspace;
                if (!selectedWorkspace && workspaces.length === 1) {
                    selectedWorkspace = workspaces[0];
                    if (selectedWorkspace) {
                        _this.session.setCurrentWorkspace(selectedWorkspace);
                    }
                }
                if (!selectedWorkspace) {
                    return (React.createElement(Modal, { title: "Select workspace", visible: true, footer: null, closable: false },
                        React.createElement(WorkspaceMenu, { workspaces: workspaces, onSelect: function (w) {
                                _this.session.setCurrentWorkspace(w);
                            } })));
                }
                return (React.createElement("div", { key: "workspace_" + selectedWorkspace.id }, _this.props.render({
                    selectedWorkspace: selectedWorkspace,
                    workspaces: workspaces
                })));
            } }));
    };
    WorkspacePicker.prototype.errorModal = function (message) {
        return (React.createElement(Modal, { visible: true, closable: false, footer: React.createElement(Button, { type: "primary", onClick: function () { return AuthSession.current().logout(); } }, "Logout") },
            React.createElement(Alert, { type: "error", message: message })));
    };
    return WorkspacePicker;
}(React.Component));
export { WorkspacePicker };
//# sourceMappingURL=picker.js.map