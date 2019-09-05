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
import { Card, Col, Row } from 'antd';
import { MembershipList } from 'webpanel-membershiplist';
import { getWorkspace } from '../model/workspace';
var WorkspaceSettings = /** @class */ (function (_super) {
    __extends(WorkspaceSettings, _super);
    function WorkspaceSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkspaceSettings.prototype.render = function () {
        var _a = this.props, workspaceID = _a.workspaceID, dataSource = _a.dataSource;
        var workspace = getWorkspace(dataSource);
        return (React.createElement(Row, { gutter: 8 },
            React.createElement(Col, { span: 12 }, workspace.getEditView(workspaceID)),
            React.createElement(Col, { span: 12 },
                React.createElement(Card, { title: "Members" },
                    React.createElement(MembershipList, { entity: "Workspace", entityID: workspaceID })))));
    };
    return WorkspaceSettings;
}(React.Component));
export { WorkspaceSettings };
//# sourceMappingURL=workspace-settings.js.map