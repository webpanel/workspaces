var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import { ResourceCollectionLayer } from 'webpanel-data';
import { Query } from 'react-apollo';
import { AuthSession } from 'webpanel-auth';
import gql from 'graphql-tag';
var MEBMERSHIPS_QUERY = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query($memberID: ID!) {\n    memberships(memberID: $memberID, entity: \"Workspace\") {\n      entityID\n    }\n  }\n"], ["\n  query($memberID: ID!) {\n    memberships(memberID: $memberID, entity: \"Workspace\") {\n      entityID\n    }\n  }\n"])));
var WorkspacesLayer = /** @class */ (function (_super) {
    __extends(WorkspacesLayer, _super);
    function WorkspacesLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkspacesLayer.prototype.render = function () {
        var _this = this;
        var dataSource = this.props.dataSource;
        var token = AuthSession.current().getTokenPayload();
        var variables = { memberID: token && token.sub };
        return (React.createElement(Query, { query: MEBMERSHIPS_QUERY, variables: variables, children: function (_a) {
                var data = _a.data, loading = _a.loading, refetch = _a.refetch, error = _a.error;
                if (loading) {
                    return _this.props.render({ error: error, loading: loading, workspaces: [] });
                }
                if (error) {
                    return _this.props.render({ error: error, loading: false, workspaces: [] });
                }
                var workspacesIDs = (data.memberships || []).map(function (x) { return x.entityID; });
                return (React.createElement(ResourceCollectionLayer, { dataSource: dataSource, name: "Workspace", fields: ['id', 'name'], initialFilters: { id_in: workspacesIDs }, render: function (_a) {
                        var error = _a.error, data = _a.data, loading = _a.loading;
                        if (loading) {
                            return _this.props.render({ loading: loading, workspaces: [] });
                        }
                        if (error) {
                            return _this.props.render({
                                error: error,
                                loading: false,
                                workspaces: []
                            });
                        }
                        var workspaces = data || [];
                        if ((workspaces || []).length === 0) {
                            return _this.props.render({
                                error: new Error("You don't have access to any workspace :("),
                                loading: false,
                                workspaces: []
                            });
                        }
                        return _this.props.render({
                            workspaces: workspaces,
                            loading: false
                        });
                    } }));
            } }));
    };
    return WorkspacesLayer;
}(React.Component));
export { WorkspacesLayer };
var templateObject_1;
//# sourceMappingURL=workspaceslayer.js.map