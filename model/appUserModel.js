'use strict';

var sql = require('./dbMySQL.js')
const client = require('../redis');

var User = function(user){
    console.log(user);
    this.email = user.email;
    this.password = user.password;
}
User.checkEmail = async (email) => {
    const result = await sql.promise().query("SELECT `email` FROM `users` WHERE `email` = ?",email);
    //if (!result) throw new Error('Query failed');
    
    return result[0];
}
User.register = async (email,password) => {
    const result = await sql.promise().query("INSERT INTO users (email,password) VALUES (?,?)",[`${email}`,`${password}`] );
    if (!result) throw new Error('Query failed');
    return result;
}
//findPasswordByEmail
User.findPasswordByEmail = async (email) => {
    const result = await sql.promise().query("SELECT `password` FROM `users` WHERE `email` = ? ",email);
    if (!result) throw new Error('Query failed');
    return result[0];
}
User.login = async (email,password) => {
  
}
module.exports = User;