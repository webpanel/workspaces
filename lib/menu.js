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
import { Menu } from 'antd';
var WorkspaceMenu = /** @class */ (function (_super) {
    __extends(WorkspaceMenu, _super);
    function WorkspaceMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkspaceMenu.prototype.render = function () {
        var _a = this.props, workspaces = _a.workspaces, onSelect = _a.onSelect;
        return (React.createElement(Menu, { onClick: function (e) {
                for (var _i = 0, workspaces_1 = workspaces; _i < workspaces_1.length; _i++) {
                    var workspace = workspaces_1[_i];
                    if (workspace.id === e.key) {
                        onSelect(workspace);
                        break;
                    }
                }
            } }, workspaces.map(function (w) {
            return React.createElement(Menu.Item, { key: w.id }, w.name);
        })));
    };
    return WorkspaceMenu;
}(React.Component));
export { WorkspaceMenu };
//# sourceMappingURL=menu.js.map