const express = require('express')
const RES = require('../libs/tools/res')
const Models = require('../models')
const UTIL = require('../libs/util')

const router = express.Router()

/**
 * @api { get } /api/test 获取用户列表（分页）
 * @apiName 用户列表
 * @apiGroup 用户管理
 * @apiVersion 0.1.0
 * @apiParam {String} [Page=1]页码 默认
 * @apiParam {String} [PageSize=10] 每页数量
 * @apiSuccessExample {json} 成功应答:
 *    HTTP/1.1 200 OK
 *     {
 *       "page": 1,
 *       "pageSize": 10,
 *        "count": 12,
 *       "totalPage": 1,
 *       "List": [{
 *           "id": 1,
 *           "name": '测试',
 *           "age": 18
 *        }]
 *     }
 */
router.get('/test', async function (req, res) {
    try {
        const page = req.query.Page ? Number(req.query.Page) : 1
        const pageSize = req.query.PageSize ? Number(req.query.PageSize) : 10

        const total = await Models.User.count()
        const list = await Models.User.findAll({ limit: pageSize, offset: (page - 1) * pageSize, order: [['id', 'asc']] })

        res.send({
            page,
            pageSize,
            list,
            total,
            totalPage: UTIL.calcMaxPage(total, pageSize)
        })
    } catch (e) {
        RES.Error(res, e)
    }
})

/**
 * @api { post } /api/test 编辑用户
 * @apiName 编辑用户
 * @apiGroup 用户管理
 * @apiVersion 0.1.0
 * @apiParam { Number } [id] 用户id
 * @apiParam { String } name 用户name
 * @apiParam { Number } age 用户age
 * @apiSuccessExample {json} 成功应答:
 *    HTTP/1.1 200 OK
 *     {
 *       "msg": '新增成功 | 修改成功',
 *       "error": false
 *     }
 */
router.post('/test', async function (req, res) {
    try {
        if (!('name' in req.body) || !('age' in req.body)) return RES.Error(res, 'name,age等参数必填')

        const id = Number(req.body.id)
        const name = req.body.name
        const age = Number(req.body.age)

        if (id) {
            const userInfo = await Models.User.findByPk(id)
            if (!userInfo) return RES.Error(res, '未找到该用户')

            userInfo.name = name
            userInfo.age = age
            await userInfo.save()
            RES.OK(res, '修改成功')
        } else {
            await Models.User.create({ id, name, age })
            RES.OK(res, '新增成功')
        }
    } catch (e) {
        RES.Error(res, e)
    }
})
module.exports = router

/**
 * @api { delete } /api/test 删除用户
 * @apiName 删除用户
 * @apiGroup 用户管理
 * @apiVersion 0.1.0
 * @apiParam { Number } id 用户id
 * @apiSuccessExample {json} 成功应答:
 *    HTTP/1.1 200 OK
 *     {
 *       "msg": '删除成功',
 *       "error": false
 *     }
 */
router.delete('/test', async function (req, res) {
    try {
        const id = Number(req.query.id)
        if (!id || isNaN(id)) return RES.Error(res, 'id必传且为数字')

        const userInfo = await Models.User.findByPk(id)
        if (!userInfo) return RES.Error(res, '该用户不存在')

        await userInfo.destroy()
        RES.OK(res, '删除成功')
    } catch (e) {
        RES.Error(res, e)
    }
})
module.exports = router
