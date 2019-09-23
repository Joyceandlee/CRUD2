//权限管理

module.exports = app => {
  app.config.coreMiddleware.unshift('isLogin');
};