import { DataSource, ResponseDataTransformer } from 'webpanel-data';
import { AuthSession } from 'webpanel-auth';
import { GraphQLORMConnector as Connector } from 'graphql-orm-connetor';
var connector = new Connector({
    responseDataTransformer: new ResponseDataTransformer()
});
export var api = new DataSource('api', connector, 'URL');
export var isNovacloudUser = function () {
    var payload = AuthSession.current().getTokenPayload();
    return ((payload &&
        payload.user &&
        payload.user.email &&
        payload.user.email.indexOf('@novacloud.cz') !== -1) ||
        false);
};
//# sourceMappingURL=api.js.map