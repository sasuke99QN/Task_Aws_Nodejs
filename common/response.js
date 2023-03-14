const apiSuccess = (res, data) => {
    return res.send({
        code: 200,
        message: 'success',
        data: data
    });
};

const apiError = (res, error) => {
    return res.send({
        error: {
            code: res.code,
            message: res.message,
            error: error
        }
    });
};

const apiUpdateSuccess = () => {
    return res.send({
        code: 200,
        message: 'update success',
        data: data
    });
}
const apiDeleteSuccess = (res, data) => {
    return res.send({
        code: 200,
        message: 'delete success',
        data: data
    });
}
const apiRegisterSuccess = (res, data) => {
    return res.send({
        code: 200,
        message: 'register success',
        data: data
    });
}
const registerError = (res, error) => {
    return res.send({
        error: {
            code: res.code,
            message: "Email da ton tai",
            error: error
        }
    });
};
const loginError = (res, error) => {
    return res.send({
        error: {
            code: res.code,
            message: "Not find account, You can register",
            error: error
        }
    });
};
const loginNotPass = (res, error) => {
    return res.send({
        error: {
            code: res.code,
            message: "Pass fail",
            error: error
        }
    });
};

const loginSuccess = (res,data) => {
    return res.send({
        code: 200,
        message: 'Login success',
        data: data
    });
}

module.exports = {
    apiError,
    apiSuccess,
    apiUpdateSuccess,
    apiDeleteSuccess,
    apiRegisterSuccess,
    registerError,
    loginError,
    loginNotPass,
    loginSuccess
};