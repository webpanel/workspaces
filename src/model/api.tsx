import { DataSource, ResponseDataTransformer } from 'webpanel-data';

import { GraphQLORMConnector as Connector } from 'graphql-orm-connetor';

const connector = new Connector({
  responseDataTransformer: new ResponseDataTransformer()
});

export const api = new DataSource('api', connector, 'URL');
