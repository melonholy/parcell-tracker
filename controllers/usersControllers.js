const services = require("../services/usersServices");
let HttpStatus = require("http-status-codes");

const registerController = async (req, res, next) => {

    const response = await services.register(req.body);
    if (response) {
        res.json(response);
    } else {
        let err = new Error();
        err.message = { email: "Email already exist" };
        err.statusCode = HttpStatus.BAD_REQUEST;
        next(err);
    }
};

const loginController = async (req, res, next) => {
    const response = await services.login(req.body);
    if (response.success) {
        res.json(response);
    } else {
        let err = new Error();
        response.email
            ? (err.message = { email: response.email })
            : (err.message = { password: response.password });
        err.statusCode = HttpStatus.BAD_REQUEST;
        next(err);
    }
};
const searchCurrentUserController = async (req, res, next) => {
    const response = await services.searchCurrentUser(req.params);
    if (response) {
        res.json(response);
    } else {
        let err = new Error();
        err.statusCode = HttpStatus.BAD_REQUEST;
        next(err);
    }
};

const addParcellController = async (req, res, next) => {
    const response = await services.addParcell(req.body);
    if (response) {
        res.json(response);
    } else {
        let err = new Error();
        err.statusCode = HttpStatus.BAD_REQUEST;
        next(err);
    }
};

const deleteParcellController = async (req, res, next) => {
    const response = await services.deleteParcell(req.body);
    if (response) {
        res.json(response);
    } else {
        let err = new Error();
        err.statusCode = HttpStatus.BAD_REQUEST;
        next(err);
    }
};

const searchParcellsFromUserController = async (req, res, next) => {
    const response = await services.searchParcellsFromUser(req.params);
    if (response) {
        res.json(response);
    } else {
        let err = new Error();
        err.statusCode = HttpStatus.BAD_REQUEST;
        next(err);
    }
};
const checkStatusController = async (req, res, next) => {
    const response = await services.checkStatus();
    if (response) {
        res.json(response);
    } else {
        let err = new Error();
        err.statusCode = HttpStatus.BAD_REQUEST;
        next(err);
    }
};

module.exports = {
    registerController,
    loginController,
    searchCurrentUserController,
    addParcellController,
    searchParcellsFromUserController,
    deleteParcellController,
    checkStatusController
};