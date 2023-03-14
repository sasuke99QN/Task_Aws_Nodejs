'use strict';

var sql = require('./dbMySQL.js');
const client = require('../redis');


var Task = function (task) {
    console.log(task);
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
}


Task.getAllTask = async () => {
    const result = await sql.promise().query("Select*from tasks");
    if (!result) throw new Error('Query failed');
    return result;

};

Task.createTask = async (task, status) => {
    const result = await sql.promise().query("INSERT INTO tasks (task,status) VALUES (?,?)", [`${task}`, `${status}`]);
    if (!result) throw new Error('Query failed');
    await client.set('1', JSON.stringify(result[0])); //lay 1 array 1 convert sang json
    const rsRedis = JSON.parse(await client.get('1')); // convert json ve array
    return rsRedis;

};
Task.getTaskById = async (taskId) => {
    const result = await sql.promise().query("Select task from tasks where id = ? ", taskId);
    if (!result) throw new Error('Query failed');
    await client.set('1', JSON.stringify(result[0])); //lay 1 array 1 convert sang json
    const rsRedis = JSON.parse(await client.get('1')); // convert json ve array
    return rsRedis;
};

Task.updateById = async (taskId, task) => {
    const result = await sql.promise().query("UPDATE tasks SET task = ? WHERE id = ?", [`${task}`, taskId]);
    if (!result) throw new Error('Query failed')
    await client.set('1', JSON.stringify(result[0])); //lay 1 array 1 convert sang json
    const rsRedis = JSON.parse(await client.get('1')); // convert json ve array
    return rsRedis;
    //return result;
};
Task.remove = async (taskId) => {
    const result = await sql.promise().query("DELETE FROM tasks WHERE id = ?", taskId);
    if (!result) throw new Error('Query failed')
    return result
};
module.exports = Task;