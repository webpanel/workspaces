import { DataSource, ResponseDataTransformer } from 'webpanel-data';
import { GraphQLORMConnector as Connector } from 'graphql-orm-connetor';
var connector = new Connector({
    responseDataTransformer: new ResponseDataTransformer()
});
export var api = new DataSource('api', connector, 'URL');
//# sourceMappingURL=api.js.map