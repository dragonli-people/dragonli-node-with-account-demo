const {AppWithExpress} = require('dragonli-node-service-core');
// const {AppInitMysqlHandler} = require('dragonli-node-general-service-core')
const AppConfig = require('./appconfig/AppConfig');
const {HttpPortConfig} = require('dragonli-node-general-service-core');
const RouterConf = require('./project-configs/RouterConfig');
const TaskConfig = require('./project-configs/TaskConfig');

// process.env.HTTP_PORT = process.env.HTTP_PORT || 3002;
HttpPortConfig.portConfigPath = 'service.node-service.http-port';
process.env.ENV_SERVICE_CONFIG_URL = process.env.ENV_SERVICE_CONFIG_URL || 'http://192.168.7.189:8888/service-config/dev';

const config = new AppConfig();
config.setViewFolder('views');
config.addRoutesConfig(RouterConf);
config.addTaskConfig(TaskConfig);

// config.addAppInitHandlers([
//     new AppInitMysqlHandler('db1Handler','data-source-configs.db1.data-config.jdbc-url'
//         ,'data-source-configs.db1.data-config.username','data-source-configs.db1.data-config.password'),
//     new AppInitMysqlHandler('db2Handler','data-source-configs.db2.data-config.jdbc-url'
//         ,'data-source-configs.db2.data-config.username','data-source-configs.db2.data-config.password'),
// ]);
// config.addControllerIocKeys(['db1Handler','db2Handler']);

//you can rewrite these two items below
// config.setControllerResultAdvice([new GeneralResultFormatAdvice()]);
// config.setControllerErrorAdvice(new GeneralErrorAdvice( 'err.ejs'));

(new AppWithExpress()).start(config);
