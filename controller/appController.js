'use strict';

var Task = require('../model/appModel.js');
var User = require('../model/appUserModel.js');
const response = require('../common/response')
exports.list_all_tasks = function (req, res) {
    Task.getAllTask(async function (err, task) {
        console.log('controller');
        if (err)
            res.send(err);

        console.log('1')
        const a = await mapperTask(res, task, err);
        return res.send(a);
    });
};
async function mapperTask(res, data, err) {
    await a()
    try {
        return data;
    } catch (err) {
        throw err;
    }

}

const a = async () => {
    return new Promise((resolve, reject) => {
        resolve(2)
    })
}
exports.create_a_task = async (task,status) => {
    try {
        return await Task.createTask(task,status);
    } catch (error) {
        throw new Error(error)
    }
};


exports.read_a_task = async (taskId) => {
    try {
        return await Task.getTaskById(taskId);
    } catch (error) {
        throw new Error(error)
    }

};


exports.update_a_task = async (taskId, task) => {
    try {
        return await Task.updateById(taskId, task);

    } catch (error) {
        throw new Error(error)
    }
};


exports.delete_a_task = async (taskId) => {
    try {
        return await Task.remove(taskId);
    } catch (error) {
        throw new Error(error)
    }
};
exports.registerUser = async(email,password) => {
    try {
        return await User.register(email,password)
    } catch (error) {
        throw new Error(error)
    }
}

exports.loginUser = async(email,password) => {
    try {
        return await User.login(email,password)
    } catch (error) {
        throw new Error(error)
    }
}


