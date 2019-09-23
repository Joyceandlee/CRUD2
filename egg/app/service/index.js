const Service = require('egg').Service;

class HomeService extends Service {
    async loginPage(ctx) {
        let { name, password } = ctx;
        if (name && password) {
            let flag = await this.app.mysql.get('list', {
                name: name,
                password: password
            })
         
            if (flag) {
                return {
                    code: 1,
                    msg: '登陆成功！',
                    flag
                }
            } else {
                return {
                    code: 0,
                    msg: "登陆失败！"
                }
            }
        }
    }
    async getList() {
        let data = await this.app.mysql.select('listinfo');

        data.map((item, index) => {
            delete item.password
        })

        if (data) {
            return {
                code: 1,
                msg: "getlist success",
                data
            }
        } else {
            return {
                code: 0,
                msg: "getlist failed"
            }
        }
    }

    async addList(ctx) {
        let { name, password, birthday, city } = ctx;
        //判断是否重名
        let $flag = await this.app.mysql.get('listinfo', { name: name });

        if (!$flag) {
            let $sql = await this.app.mysql.insert('listinfo', {
                name, password, birthday, city
            })

            if ($sql) {
                return {
                    code: 1,
                    msg: '添加成功！'
                }
            } else {
                return {
                    code: 0,
                    msg: '添加失败！'
                }
            }
        } else {
            return {
                code: 0,
                msg: '用户名重复！'
            }
        }
    }


    async updateList(ctx) {
        // let {id,name,password,birthday,city}=ctx;
        let $data = await this.app.mysql.update('listinfo', ctx);

        if ($data) {
            return {
                code: 1,
                msg: "更新成功！"
            }
        } else {
            return {
                code: 0,
                msg: "更新失败！"
            }
        }

    }
    async delete(id) {
        let $sql = await this.app.mysql.delete('listinfo', { id: id });

        if ($sql.affectedRows == 1) {
   
            return {
                code: 1,
                msg: "delete success"
            }
        } else {
            return {
                code: 0,
                msg: 'delete failed'
            }
        }
    }
}

module.exports = HomeService;