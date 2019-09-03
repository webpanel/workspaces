import { DataSource, ResponseDataTransformer } from 'webpanel-data';

import { GraphQLORMConnector as Connector } from 'graphql-orm-connetor';
import { ENV } from '../env';

const connector = new Connector({
  responseDataTransformer: new ResponseDataTransformer()
});

export const api = new DataSource('api', connector, ENV.REACT_APP_API_URL);
