import { Entity } from 'webpanel-admin';
import { api } from './api';

export const workspace = new Entity({
  name: 'Workspace',
  dataSource: api
}).inputField('name');
