'use strict';

const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();
const response = require('../common/response');
const { validateEditTask } = require('../validation/validateOutputTask');
const validateInput = require('../validation/validateInput');
var User = require('../model/appUserModel.js');

var todoList = require('../controller/appController.js');
//module.exports = function (app) {
// var todoList = require('../controller/appController.js');

// app.route('/tasks')
//     .get(todoList.list_all_tasks)
//     .post(todoList.create_a_task);


// app.route('/tasks/:taskId')
//     .get(todoList.read_a_task)
//     .put(todoList.update_a_task)
//     .delete(todoList.delete_a_task);


//};
router.post('/tasks/setTaskNew', async (req, res) => {
    try {
        const {
            task, status
        } = req.body;
        const result = await todoList.create_a_task(task, status);
        response.apiSuccess(res, result);
    } catch (error) {
        response.apiError(res, error);
    }
})
router.post('/tasks/getTaskById/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const result = await todoList.read_a_task(taskId);
        //set redis

        response.apiSuccess(res, result);
    } catch (error) {
        response.apiError(res, error);
    }
})

router.post('/tasks/updateTask/:taskId',
    //validateEditTask,
    async (req, res) => {
        try {
            const {
                task
            } = req.body;
            const taskId = req.params.taskId;
            const result = await todoList.update_a_task(taskId, task);
            response.apiUpdateSuccess(res, result);
        } catch (error) {
            response.apiError(res, error);
        }
    }
);

router.post('/tasks/getDeleteTaskById/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const result = await todoList.delete_a_task(taskId);
        response.apiDeleteSuccess(res, result);
    } catch (error) {
        response.apiError(res, error);
    }
})

router.post('/user/register', async (req, res) => {
    try {
        const {
            email, password
        } = req.body;
        const checkEmail = await User.checkEmail(email);
        if (checkEmail.length !== 0) {
            response.registerError(res,error);
        }
        const salt = await bcrypt.genSalt(10);
        const passwordBcrypt = await bcrypt.hash(password, salt);
        const result = await todoList.registerUser(email, passwordBcrypt);
        response.apiRegisterSuccess(res, result);
        
    } catch (error) {
        response.apiError(res, error);
    }
})

router.post('/user/login', async (req, res) => {
    try {
        const {
            email, password
        } = req.body;
        const checkEmail = await User.checkEmail(email);
        if (checkEmail.length === 0) {
            response.loginError(res, error);
        }
        const passwordData = await User.findPasswordByEmail(email);
        const validPassword = await bcrypt.compare(password,passwordData[0].password);
        
        if(validPassword){
            return response.loginSuccess(res,validPassword);
           // response.loginNotPass(res,error);
        }
        response.loginNotPass(res,error);
        //response.loginSuccess(res,result);
    } catch (error) {
        response.apiError(res, error);
    }
});

module.exports = router;