import { Entity } from 'webpanel-admin';
export var getWorkspace = function (api) {
    return new Entity({
        name: 'Workspace',
        dataSource: api
    }).inputField('name');
};
//# sourceMappingURL=workspace.js.map