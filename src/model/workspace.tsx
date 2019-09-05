import { DataSource } from 'webpanel-data';
import { Entity } from 'webpanel-admin';

export const getWorkspace = (api: DataSource): Entity<any> => {
  return new Entity({
    name: 'Workspace',
    dataSource: api
  }).inputField('name');
};
