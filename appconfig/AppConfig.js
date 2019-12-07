// const {AppConfig,AppInitRedisHandler,AppInitMysqlHandler} = require('dragonli-node-general-service-core');
// const EvnServerConfig = require('../appconfighandlers/EvnServerConfig');
// const AppInitInvokerServiceHandler = require('../servicesupport/AppInitInvokerServiceHandler');
// const AppInitRegistServiceHandler = require('../moduleservices/AppInitRegistServiceHandler');
// const AuthService = require('../moduleservices/AuthService');
// const DbService = require('../moduleservices/DbService');
// const OtherService = require('../moduleservices/OtherService');
// const WebSocketService = require('../moduleservices/WebSocketService');
// const ZookeeperService = require('../moduleservices/ZookeeperService');
// const AuthReadFilter = require('../filters/AuthReadFilter');
// const RoleFilter = require('../filters/RoleFilter');
// const AuthWriteFilter = require('../filters/AuthWriteHandler');
// const GeneralErrorAdvice = require('../advices/GeneralErrorAdvice');
// const GeneralResultFormatAdvice = require('../advices/GeneralResultFormatAdvice');

const {AppConfig} = require('dragonli-node-with-user-account-service-core');

module.exports = class extends AppConfig {
    constructor(){
        super();
        // service.module.user.admin-name
        // service.module.user.admin-general-reflex-id
    }
}