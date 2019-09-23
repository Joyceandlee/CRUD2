'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async login(ctx) {
    let res = await this.ctx.service.index.loginPage(ctx.request.body.data);
    delete res.flag.password;

    if (res.code === 1) {
      try {
        let token = jwt.sign({
          data: res.flag,
          iat: Date.now()
        }, this.app.config.keys)

        this.ctx.status = 200;
        this.ctx.body = {
          code: 1,
          msg: "login success",
          token
        }
      } catch (err) {
        this.ctx.status = 401;
        this.ctx.body = {
          code: 0,
          msg: 'login failed',
          err
        }
      }
    }

  }
  async getList() {
    let res = await this.ctx.service.index.getList();
    if (res.code === 1) {
      try {
        this.ctx.status = 200;
        this.ctx.body = res
      } catch (err) {
        this.ctx.status = 200;
        this.ctx.body = {
          code: 0,
          msg: 'getlist failed',
          err
        }
      }
    } else {
      this.ctx.status = 401;
      this.ctx.body = {
        code: 0,
        msg: 'getlist failed'
      }
    }
  }

  async addList(ctx) {
    let res = await this.ctx.service.index.addList(ctx.request.body)

    if (res.code === 1) {
      try {
        this.ctx.status = 200;
        this.ctx.body = res
      } catch (err) {
        this.ctx.status = 401;
        this.ctx.body = {
          code: 0,
          msg: "addlist failed",
          err
        }
      }
    } else {
      this.ctx.body = res;
    }
  }

  async updateList(ctx) {
    let res = await this.ctx.service.index.updateList(ctx.request.body);

    if (res.code === 1) {
      try {
        this.ctx.status = 200;
        this.ctx.body = res
      } catch (err) {
        this.ctx.status = 401;
        this.ctx.body = {
          code: 0,
          msg: "updateList failed",
          err
        }
      }
    } else {
      this.ctx.body = res;
    }
  }

  async delete(ctx) {
    let { id } = ctx.request.query;
 
    let res = await this.ctx.service.index.delete(id);

    if (res.code === 1) {
      try {
        this.ctx.status = 200;
        this.ctx.body = res
      } catch (err) {
        this.ctx.status = 401;
        this.ctx.body = {
          code: 0,
          msg: "delete failed",
          err
        }
      }
    } else {
      this.ctx.body = res;
    }
  }
}

module.exports = HomeController;

