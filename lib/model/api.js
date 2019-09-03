import { DataSource, ResponseDataTransformer } from 'webpanel-data';
import { GraphQLORMConnector as Connector } from 'graphql-orm-connetor';
import { ENV } from '../env';
var connector = new Connector({
    responseDataTransformer: new ResponseDataTransformer()
});
export var api = new DataSource('api', connector, ENV.REACT_APP_API_URL);
//# sourceMappingURL=api.js.map