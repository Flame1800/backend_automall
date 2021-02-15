`use strict`

module.exports = (app) => {
    const userController = require('../Controller/UserController')
    const autoController = require('../Controller/AutoController')
    const markController = require('../Controller/MarkController')

    app.route('/user/auth').post(userController.sendCode)
    app.route('/user/login').post(userController.login)
    app.route('/user/:id').get(userController.find)
    app.route('/user/:id').put(userController.update)

    app.route('/user/:id/auto').post(autoController.add)
    app.route('/auto/:id').put(autoController.update)

    app.route('/autolist').get(markController.index)

}