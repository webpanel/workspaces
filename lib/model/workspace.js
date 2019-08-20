import { Entity } from 'webpanel-admin';
import { api } from './api';
export var workspace = new Entity({
    name: 'Workspace',
    dataSource: api
}).inputField('name');
//# sourceMappingURL=workspace.js.map