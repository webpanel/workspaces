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
import { Dropdown, Icon, Menu, Modal } from 'antd';
import { WorkspaceSession } from './session';
import { WorkspaceSettings } from './workspace-settings';
import { workspace } from './model/workspace';
var WorkspaceHeaderItem = /** @class */ (function (_super) {
    __extends(WorkspaceHeaderItem, _super);
    function WorkspaceHeaderItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            addingWorkspace: false,
            editingWorkspaceID: undefined
        };
        _this.session = WorkspaceSession.shared();
        return _this;
        // private addWorkspace() {
        //   this.setState({ addingWorkspace: true });
        //   // const modal = workspace.getCreateView(
        //   //   {
        //   //     initialValues: { name: 'blah' }
        //   //   },
        //   //   (id: string) => {
        //   //     global.console.log('created!', id);
        //   //   }
        //   // );
        //   // return modal;
        //   // message.warning('Not implemented', 3);
        // }
    }
    WorkspaceHeaderItem.prototype.render = function () {
        var _this = this;
        var _a = this.props, workspaces = _a.workspaces, selectedWorkspace = _a.selectedWorkspace;
        var menu = (React.createElement(Menu, { onClick: function (e) {
                window.history.pushState(null, 'aa', '/');
                if (e.key === 'settings') {
                    var currentWorkspace = _this.session.getCurrentWorkspace();
                    _this.setState({
                        editingWorkspaceID: currentWorkspace && currentWorkspace.id
                    });
                    return;
                }
                for (var _i = 0, workspaces_1 = workspaces; _i < workspaces_1.length; _i++) {
                    var w = workspaces_1[_i];
                    if (w.id === e.key) {
                        _this.session.setCurrentWorkspace(w);
                        break;
                    }
                }
            } },
            workspaces.map(function (w) {
                return (React.createElement(Menu.Item, { key: w.id },
                    React.createElement(Icon, { type: "check", style: {
                            visibility: w.id !== selectedWorkspace.id ? 'hidden' : undefined
                        } }),
                    w.name));
            }),
            React.createElement(Menu.Divider, null),
            React.createElement(Menu.Item, { key: "settings" },
                React.createElement(Icon, { type: "setting" }),
                "Settings")));
        return (React.createElement(React.Fragment, null,
            this.state.editingWorkspaceID &&
                this.editWorkspaceModal(this.state.editingWorkspaceID),
            this.getAddingWorkspaceModal(),
            React.createElement(Dropdown, { overlay: menu },
                React.createElement("span", { className: "antd-header-content-item" },
                    React.createElement(Icon, { type: "folder", style: { padding: '0 8px 0 0' } }),
                    selectedWorkspace.name))));
    };
    WorkspaceHeaderItem.prototype.editWorkspaceModal = function (id) {
        var _this = this;
        return (React.createElement(Modal, { visible: true, title: "Workspace settings", width: "80%", onCancel: function () { return _this.setState({ editingWorkspaceID: undefined }); }, footer: null },
            React.createElement(WorkspaceSettings, { workspaceID: id })));
    };
    WorkspaceHeaderItem.prototype.getAddingWorkspaceModal = function () {
        var _this = this;
        return workspace.getCreateView({
            // initialValues: { name: 'blah' },
            wrapperType: 'modal',
            modal: {
                title: 'Add workspace',
                visible: this.state.addingWorkspace
            }
        }, {
            onSave: function (id) {
                _this.setState({ addingWorkspace: false });
            },
            onCancel: function () {
                _this.setState({ addingWorkspace: false });
            }
        });
    };
    return WorkspaceHeaderItem;
}(React.Component));
export { WorkspaceHeaderItem };
//# sourceMappingURL=headeritem.js.map