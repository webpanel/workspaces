export var ENV = window.ENV || process.env;
var keysOfENV = ['REACT_APP_API_URL'];
for (var _i = 0, keysOfENV_1 = keysOfENV; _i < keysOfENV_1.length; _i++) {
    var k = keysOfENV_1[_i];
    if (!ENV[k]) {
        throw new Error(k + " is not specified");
    }
}
//# sourceMappingURL=env.js.map