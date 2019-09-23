'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/login',controller.home.login);
  router.get('/getlist',controller.home.getList);
  router.put('/addlist',controller.home.addList);
  router.patch('/update',controller.home.updateList);
  router.delete('/delete',controller.home.delete);
};
