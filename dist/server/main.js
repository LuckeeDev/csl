(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 50);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isAdmin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isPowerful; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return isVice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return isRappre; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isQp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return isBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isRappreDiClasse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return isReferente; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return authCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return profileCheck; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return notAuthCheck; });
function unauthorized(res) {
    res.status(403).end();
}
// Checks if a user is admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        unauthorized(res);
    }
};
// Checks if a user is either vice, rappre or bar
const isPowerful = (req, res, next) => {
    if (req.user && (req.user.isVice || req.user.isRappre || req.user.isBar)) {
        next();
    }
    else {
        unauthorized(res);
    }
};
// Checks if a user is Vice
const isVice = (req, res, next) => {
    if (req.user && req.user.isVice) {
        next();
    }
    else {
        unauthorized(res);
    }
};
// Checks if a user is rappre
const isRappre = (req, res, next) => {
    if (req.user && req.user.isRappre) {
        next();
    }
    else {
        unauthorized(res);
    }
};
// Checks if a user is Qp
const isQp = (req, res, next) => {
    if (req.user && req.user.isQp) {
        next();
    }
    else {
        unauthorized(res);
    }
};
// Checks if a user is the bar admin
const isBar = (req, res, next) => {
    if (req.user && req.user.isBar) {
        next();
    }
    else {
        unauthorized(res);
    }
};
// Checks if a user is a Rappre di Classe
const isRappreDiClasse = (req, res, next) => {
    if (req.user && req.user.isRappreDiClasse) {
        next();
    }
    else {
        unauthorized(res);
    }
};
// Checks if a user isReferente of the referred commissione
const isReferente = (req, res, next) => {
    const params = req.params;
    const commissione = params.id;
    if (req.user &&
        ((commissione === 'comitato' && req.user.isRappre) ||
            req.user.isReferente === commissione)) {
        next();
    }
    else {
        unauthorized(res);
    }
};
// Checks if a user is logged in and, if not, sends unauthorized response
const authCheck = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        unauthorized(res);
    }
};
// Checks if a user is logged in and, if not, sends a null response
const profileCheck = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.send(null);
    }
};
// Checks if a user is not yet logged in
const notAuthCheck = (req, res, next) => {
    if (req.user) {
        res.redirect('../dashboard');
    }
    else {
        next();
    }
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Class; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return updateTotal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getTotal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return setPaid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return verifyReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return verifyPaid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return updateSnackCreditInClass; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _controllers_order__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);



const ClassSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"]({
    id: { type: String, required: true, unique: true },
    members: { type: Array, required: true },
    membersCount: { type: Number, required: true },
    gadgetTotal: { type: Number, required: true, default: 0 },
    gadgetPaid: { type: Boolean, required: true, default: false },
    photoTotal: { type: Number, required: true, default: 0 },
    photoPaid: { type: Boolean, required: true, default: false },
}, { skipVersioning: true });
const Class = mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.model('class', ClassSchema, 'classi');
// Get all classes in the database
const getClasses = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const res = yield Class.find();
    return res;
});
// Update the gadget total
const updateTotal = (orderTotal, classTotal, category, id) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const totalToUpdate = category === 'gadgets' ? 'gadgetTotal' : 'photoTotal';
    return Class.findOneAndUpdate({ id }, { [totalToUpdate]: classTotal + orderTotal })
        .then((res) => {
        return {
            success: true,
            msg: 'Order confirmed',
        };
    })
        .catch((err) => {
        return {
            success: false,
            err,
        };
    });
});
// Get total of a specific class in a specific category
const getTotal = (classID, category) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const categoryTotal = category === 'gadgets' ? 'gadgetTotal' : 'photoTotal';
    return Class.findOne({ id: classID }).then((res) => {
        return res[categoryTotal];
    });
});
// Set category total as paid
const setPaid = (classID, category) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const categoryToUpdate = category === 'gadgets' ? 'gadgetPaid' : 'photoPaid';
    yield Class.findOneAndUpdate({ id: classID }, { [categoryToUpdate]: true }).then();
});
// Verify that all class members have confirmed their order
const verifyReady = (classID, category) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const confirmedCategory = category === 'gadgets' ? 'gadgetsConfirmed' : 'photosConfirmed';
    return yield _controllers_order__WEBPACK_IMPORTED_MODULE_2__[/* Order */ "a"].find({ classID }).then((res) => {
        const isNotConfirmed = res.find((obj) => obj[confirmedCategory] === false);
        // const result = !isNotConfirmed;
        return !isNotConfirmed;
    });
});
// Verify that the class hasn't already paid
const verifyPaid = (id, category) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const paidCategory = category === 'gadgets' ? 'gadgetPaid' : 'photoPaid';
    return yield Class.findOne({ id }).then((res) => {
        return res[paidCategory];
    });
});
const updateSnackCreditInClass = (email, snackCredit, classID) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    yield Class.findOne({ id: classID }).then((classe) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        const member = classe.members.find((x) => x.email === email);
        yield Class.updateOne({ id: classID, members: member }, {
            $set: {
                'members.$': {
                    email,
                    snackCredit,
                },
            },
        }).then();
    }));
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return saveEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return saveError; });
/* harmony import */ var winston__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var winston__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(winston__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var winston_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25);
/* harmony import */ var winston_mongodb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(winston_mongodb__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);



const eventLogger = winston__WEBPACK_IMPORTED_MODULE_0___default.a.createLogger({
    transports: [
        new winston_mongodb__WEBPACK_IMPORTED_MODULE_1__["MongoDB"]({
            level: 'info',
            db: _environments_environment__WEBPACK_IMPORTED_MODULE_2__[/* environment */ "a"].DB_URI,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            collection: 'events',
            name: 'info-transport',
            tryReconnect: true,
        }),
    ],
});
const saveEvent = (msg, metadata) => {
    eventLogger.log('info', msg, { metadata });
};
const errorLogger = winston__WEBPACK_IMPORTED_MODULE_0___default.a.createLogger({
    transports: [
        new winston_mongodb__WEBPACK_IMPORTED_MODULE_1__["MongoDB"]({
            level: 'error',
            db: _environments_environment__WEBPACK_IMPORTED_MODULE_2__[/* environment */ "a"].DB_URI,
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            collection: 'errors',
            name: 'errors-transport',
            tryReconnect: true,
        }),
    ],
});
const saveError = (msg, metadata) => {
    errorLogger.log('error', msg, { metadata });
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return removeAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return removeRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getRoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getStripeID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return updateCredit; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(stripe__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _controllers_classe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _config_winston__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);


// Stripe initialization




const stripe = new stripe__WEBPACK_IMPORTED_MODULE_3___default.a(_environments_environment__WEBPACK_IMPORTED_MODULE_2__[/* environment */ "a"].STRIPE_KEY, {
    apiVersion: '2020-08-27',
    typescript: true,
});
const UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"]({
    id: { type: String },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    classID: { type: String },
    snackCredit: { type: Number, default: 0 },
    photoURL: { type: String },
    stripeID: { type: String },
    isVice: { type: Boolean },
    isRappre: { type: Boolean },
    isQp: { type: Boolean },
    isRappreDiClasse: { type: Boolean },
    isBar: { type: Boolean },
    isAdmin: { type: Boolean },
    isReferente: { type: String },
}, { skipVersioning: true });
const User = mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.model('user', UserSchema);
// Create an account (for admin)
const createAccount = (account, user) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    try {
        yield User.findOne({ email: account.email }).then((user) => {
            if (!user) {
                return new User(account).save().then();
            }
        });
        yield _controllers_classe__WEBPACK_IMPORTED_MODULE_4__[/* Class */ "a"].findOne({ id: account.classID }).then((classe) => {
            if (classe) {
                return classe
                    .updateOne({
                    $push: {
                        members: { email: account.email, snackCredit: 0, roles: [] },
                    },
                })
                    .then();
            }
            else {
                new _controllers_classe__WEBPACK_IMPORTED_MODULE_4__[/* Class */ "a"]({
                    id: account.classID,
                    members: [{ email: account.email, snackCredit: 0, roles: [] }],
                    membersCount: 1,
                })
                    .save()
                    .then();
            }
        });
        Object(_config_winston__WEBPACK_IMPORTED_MODULE_5__[/* saveEvent */ "b"])(`Manually created an account for ${account.firstName} ${account.lastName}`, {
            category: 'accounts',
            user: user.email,
        });
        return {
            success: true,
        };
    }
    catch (err) {
        Object(_config_winston__WEBPACK_IMPORTED_MODULE_5__[/* saveError */ "a"])(`Error during the manual creation of an account for ${account.firstName} ${account.lastName}`, {
            category: 'accounts',
            user: user.email,
            err,
        });
    }
});
// Remove an account (for admin)
const removeAccount = (email) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const user = yield User.findOneAndDelete({ email }).then();
    const classe = yield _controllers_classe__WEBPACK_IMPORTED_MODULE_4__[/* Class */ "a"].findOne({ id: user.classID });
    const elementToPull = classe.members.find((x) => x.email === email);
    return _controllers_classe__WEBPACK_IMPORTED_MODULE_4__[/* Class */ "a"].findOneAndUpdate({ id: user.classID }, {
        $pull: {
            members: elementToPull,
        },
        $inc: {
            membersCount: -1,
        },
    })
        .then(() => {
        return {
            success: true,
        };
    })
        .catch((err) => {
        return {
            success: false,
            err,
        };
    });
});
// Add a role to a user
const addRole = (email, role) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    let updateQuery;
    if (role.includes('isReferente')) {
        const regExp = /\[([^)]+)\]/;
        const commissione = regExp.exec(role)[1];
        updateQuery = { isReferente: commissione };
    }
    else {
        updateQuery = { [role]: true };
    }
    try {
        const classID = yield User.findOneAndUpdate({ email }, updateQuery).then((user) => user.classID);
        return _controllers_classe__WEBPACK_IMPORTED_MODULE_4__[/* Class */ "a"].findOne({ id: classID }).then((classe) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
            const member = classe.members.find((x) => x.email === email);
            member.roles.push(role);
            try {
                yield _controllers_classe__WEBPACK_IMPORTED_MODULE_4__[/* Class */ "a"].findOneAndUpdate({ id: classID, members: { $elemMatch: { email } } }, { 'members.$': member });
                return {
                    success: true,
                };
            }
            catch (err) {
                return {
                    success: false,
                    err,
                };
            }
        }));
    }
    catch (err) {
        return {
            success: false,
            err,
        };
    }
});
// Remove a role from a user
const removeRole = (email, role) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    let updateClassQuery;
    if (role.includes('isReferente')) {
        const regExp = /\[([^)]+)\]/;
        const commissione = regExp.exec(role)[1];
        updateClassQuery = { isReferente: commissione };
    }
    else {
        updateClassQuery = { [role]: true };
    }
    const classID = yield User.findOneAndUpdate({ email: email }, { $unset: updateClassQuery }).then((user) => {
        return user.classID;
    });
    return _controllers_classe__WEBPACK_IMPORTED_MODULE_4__[/* Class */ "a"].findOne({ id: classID }).then((classe) => {
        const member = classe.members.find((x) => x.email === email);
        const i = member.roles.findIndex((x) => x === role);
        member.roles.splice(i, 1);
        return _controllers_classe__WEBPACK_IMPORTED_MODULE_4__[/* Class */ "a"].findOneAndUpdate({ id: classID, members: { $elemMatch: { email } } }, { 'members.$': member })
            .then((res) => {
            return {
                success: true,
            };
        })
            .catch((err) => {
            return {
                success: false,
                err,
            };
        });
    });
});
// Get roles of a user
const getRoles = (email) => {
    return User.findOne({ email: email }).then((user) => {
        const roles = [];
        if (user.isVice) {
            roles.push('isVice');
        }
        if (user.isRappre) {
            roles.push('isRappre');
        }
        if (user.isRappreDiClasse) {
            roles.push('isRappreDiClasse');
        }
        if (user.isQp) {
            roles.push('isQp');
        }
        return roles;
    });
};
// Get the stripe customer ID of a user
const getStripeID = (id) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const stripeID = yield User.findOne({ id }).then((user) => {
        if (user && user.isRappreDiClasse && user.stripeID) {
            return user.stripeID;
        }
        else if (user) {
            return stripe.customers
                .create({
                name: `${user.firstName} ${user.lastName}`,
                email: `${user.email}`,
                description: `Rappresentante della ${user.classID}`,
            })
                .then((customer) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
                const newID = yield User.findOneAndUpdate({ id }, { stripeID: customer.id }).then((res) => {
                    return customer.id;
                });
                return newID;
            }));
        }
    });
    return stripeID;
});
// Update credit (for bar)
const updateCredit = (email, money) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield User.findOne({ email })
        .then((user) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        const snackCredit = money + user.snackCredit;
        const classID = user.classID;
        yield Object(_controllers_classe__WEBPACK_IMPORTED_MODULE_4__[/* updateSnackCreditInClass */ "e"])(email, snackCredit, classID);
        return yield User.findOneAndUpdate({ email }, { snackCredit })
            .then((res) => {
            return {
                success: true,
            };
        })
            .catch((err) => {
            return {
                success: false,
                err,
            };
        });
    }))
        .catch((err) => {
        return {
            success: false,
            err,
        };
    });
    return result;
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);


const env = dotenv__WEBPACK_IMPORTED_MODULE_0__["config"]({
    path: Object(path__WEBPACK_IMPORTED_MODULE_1__["join"])(__dirname, 'environments', '.prod.env'),
}).parsed;
env.COOKIE_KEYS = env.COOKIE_KEYS.split(';');
const environment = Object.assign({ production: true }, env);


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export serviceAccount */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bucket; });
/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var firebase_admin__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_admin__WEBPACK_IMPORTED_MODULE_0__);

const serviceAccount = __webpack_require__(52);
// Initialize Firebase
firebase_admin__WEBPACK_IMPORTED_MODULE_0___default.a.initializeApp({
    credential: firebase_admin__WEBPACK_IMPORTED_MODULE_0___default.a.credential.cert(serviceAccount),
    storageBucket: 'cslussana.appspot.com',
});
// Export variable for Firebase bucket
const bucket = firebase_admin__WEBPACK_IMPORTED_MODULE_0___default.a.storage().bucket();


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Product; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getAllGadgets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createGadget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getAllPhotos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createPhoto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return findProduct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return deleteProduct; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fs_extra__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var sharp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20);
/* harmony import */ var sharp__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(sharp__WEBPACK_IMPORTED_MODULE_6__);







const ProductSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"]({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    fileNames: { type: Array, required: true },
    colors: { type: Array },
    sizes: { type: Array },
}, { versionKey: false });
const Product = mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.model('product', ProductSchema, 'gadgets');
// Get all gadgets in the database
const getAllGadgets = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const res = yield Product.find({ category: 'gadgets' });
    return res;
});
// Create a new gadget
const createGadget = (product) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    let { id, name, description, price, fileNames, colors, sizes } = product;
    let category = 'gadgets';
    const workingDir = Object(path__WEBPACK_IMPORTED_MODULE_3__["join"])(Object(os__WEBPACK_IMPORTED_MODULE_4__["tmpdir"])(), 'images');
    fs_extra__WEBPACK_IMPORTED_MODULE_5___default.a.ensureDir(workingDir);
    const uploadPromises = fileNames.map((tmpFileName) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        let tmpFilePath = Object(path__WEBPACK_IMPORTED_MODULE_3__["join"])(workingDir, tmpFileName);
        let pngFileName = tmpFileName.split('.').shift() + '.png';
        let pngFilePath = Object(path__WEBPACK_IMPORTED_MODULE_3__["join"])(workingDir, pngFileName);
        let newFileName = `500@${pngFileName}`;
        let newFilePath = Object(path__WEBPACK_IMPORTED_MODULE_3__["join"])(workingDir, newFileName);
        yield _config_firebase__WEBPACK_IMPORTED_MODULE_2__[/* bucket */ "a"].file(`gadgetImages/raw/${tmpFileName}`).download({
            destination: tmpFilePath,
        });
        yield sharp__WEBPACK_IMPORTED_MODULE_6___default()(tmpFilePath).toFormat('png').toFile(pngFilePath);
        yield sharp__WEBPACK_IMPORTED_MODULE_6___default()(pngFilePath)
            .resize({
            width: 500,
            height: 500,
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
            .toFile(newFilePath);
        return _config_firebase__WEBPACK_IMPORTED_MODULE_2__[/* bucket */ "a"].upload(newFilePath, {
            destination: `gadgetImages/${id}/${newFileName}`,
        });
    }));
    yield Promise.all(uploadPromises);
    fs_extra__WEBPACK_IMPORTED_MODULE_5___default.a.remove(workingDir);
    fileNames = fileNames.map((fileName) => {
        return `500@${fileName.split('.').shift()}.png`;
    });
    return new Product({
        id,
        name,
        description,
        category,
        price,
        fileNames,
        colors,
        sizes,
    })
        .save()
        .then((res) => {
        return { success: true };
    })
        .catch((err) => {
        return { err };
    });
});
// Get all photo products in the database
const getAllPhotos = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const res = yield Product.find({ category: 'photos' });
    return res;
});
// Create a new photo product
const createPhoto = (product) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    let { id, name, description, price, fileNames } = product;
    let category = 'photos';
    const workingDir = Object(path__WEBPACK_IMPORTED_MODULE_3__["join"])(Object(os__WEBPACK_IMPORTED_MODULE_4__["tmpdir"])(), 'images');
    fs_extra__WEBPACK_IMPORTED_MODULE_5___default.a.ensureDir(workingDir);
    const uploadPromises = fileNames.map((tmpFileName) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        let tmpFilePath = Object(path__WEBPACK_IMPORTED_MODULE_3__["join"])(workingDir, tmpFileName);
        let pngFileName = tmpFileName.split('.').shift() + '.png';
        let pngFilePath = Object(path__WEBPACK_IMPORTED_MODULE_3__["join"])(workingDir, pngFileName);
        let newFileName = `500@${pngFileName}`;
        let newFilePath = Object(path__WEBPACK_IMPORTED_MODULE_3__["join"])(workingDir, newFileName);
        yield _config_firebase__WEBPACK_IMPORTED_MODULE_2__[/* bucket */ "a"].file(`photoImages/raw/${tmpFileName}`).download({
            destination: tmpFilePath,
        });
        yield sharp__WEBPACK_IMPORTED_MODULE_6___default()(tmpFilePath).toFormat('png').toFile(pngFilePath);
        yield sharp__WEBPACK_IMPORTED_MODULE_6___default()(pngFilePath)
            .resize({
            width: 500,
            height: 500,
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
            .toFile(newFilePath);
        return _config_firebase__WEBPACK_IMPORTED_MODULE_2__[/* bucket */ "a"].upload(newFilePath, {
            destination: `photoImages/${id}/${newFileName}`,
        });
    }));
    yield Promise.all(uploadPromises);
    fs_extra__WEBPACK_IMPORTED_MODULE_5___default.a.remove(workingDir);
    fileNames = fileNames.map((fileName) => {
        return `500@${fileName.split('.').shift()}.png`;
    });
    return new Product({
        id,
        name,
        description,
        category,
        price,
        fileNames,
    })
        .save()
        .then((res) => {
        return { success: true };
    })
        .catch((err) => {
        return { err };
    });
});
// Get product based on product ID
const findProduct = (id) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const res = yield Product.findOne({ id });
    return res;
});
// Delete product based on product ID
const deleteProduct = (id) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Product.findOneAndDelete({ id })
        .then((res) => {
        return {
            success: true,
        };
    })
        .catch((err) => {
        return {
            success: false,
            err,
        };
    });
    return result;
});


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Snack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createSnack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return deleteSnack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return updateMaxQuantity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getSnacks; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);


const SnackSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"]({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    maxQuantity: { type: Number, required: true },
}, { versionKey: false });
const Snack = mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.model('snack', SnackSchema);
const createSnack = (snack) => {
    return new Snack(snack)
        .save()
        .then((res) => {
        return {
            success: true,
        };
    })
        .catch((err) => {
        return {
            success: false,
            err,
        };
    });
};
const deleteSnack = (id) => {
    return Snack.findOneAndDelete({ id })
        .then((res) => {
        return {
            success: true,
        };
    })
        .catch((err) => {
        return {
            success: false,
            err,
        };
    });
};
const updateMaxQuantity = (maxQuantity, id) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Snack.findOneAndUpdate({ id }, { maxQuantity })
        .then((res) => {
        return { success: true };
    })
        .catch((err) => {
        return { success: false, err };
    });
    return result;
});
const getSnacks = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Snack.find();
    return result;
});


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Order; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addToCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return confirmOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getAllOrders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return deleteFromCart; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _controllers_product__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);



const OrderSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"]({
    id: { type: String, required: true, unique: true },
    gadgets: { type: Array, required: true, default: [] },
    photos: { type: Array, required: true, default: [] },
    gadgetTotal: { type: Number, required: true, default: 0 },
    photoTotal: { type: Number, required: true, default: 0 },
    gadgetsConfirmed: { type: Boolean, required: true, default: false },
    photosConfirmed: { type: Boolean, required: true, default: false },
    classID: { type: String, required: true },
}, { skipVersioning: true });
const Order = mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.model('order', OrderSchema, 'gadget-orders');
// Create a new order
const addToCart = (product, user) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const productInDb = yield _controllers_product__WEBPACK_IMPORTED_MODULE_2__[/* Product */ "a"].findOne({ id: product.id }).then((res) => {
        return {
            price: res.price * product.quantity * 100,
            category: res.category,
        };
    });
    const categoryConfirmed = productInDb.category === 'gadgets' ? 'gadgetsConfirmed' : 'photosConfirmed';
    return Order.findOne({
        id: user.id,
    }).then((order) => {
        if (!order) {
            // Case in which an order with this ID doesn't exist
            const gadgetTotal = productInDb.category === 'gadgets' ? productInDb.price : 0;
            const photoTotal = productInDb.category === 'photos' ? productInDb.price : 0;
            const gadgets = productInDb.category === 'gadgets' ? [product] : [];
            const photos = productInDb.category === 'photos' ? [product] : [];
            return new Order({
                gadgets,
                photos,
                id: user.id,
                gadgetTotal,
                photoTotal,
                confirmed: false,
                classID: user.classID,
            })
                .save()
                .then((res) => {
                return {
                    success: true,
                };
            });
        }
        else if (order[categoryConfirmed] === true) {
            // Case in which the order for this category is already confirmed
            return {
                success: false,
                err: 'already-confirmed',
            };
        }
        else {
            // Case in which an order exists, is not confirmed but needs to be updated
            const gadgetTotal = productInDb.category === 'gadgets'
                ? order.gadgetTotal + productInDb.price
                : order.gadgetTotal;
            const photoTotal = productInDb.category === 'photos'
                ? order.photoTotal + productInDb.price
                : order.photoTotal;
            return Order.findOneAndUpdate({ id: user.id }, { $push: { [productInDb.category]: product }, gadgetTotal, photoTotal }).then((res) => {
                return {
                    success: true,
                };
            });
        }
    });
});
// Confirm an order
const confirmOrder = (id, category) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const confirmedCategory = category === 'gadgets' ? 'gadgetsConfirmed' : 'photosConfirmed';
    const confirmedTotal = category === 'gadgets' ? 'gadgetTotal' : 'photoTotal';
    return Order.findOneAndUpdate({ id }, {
        [confirmedCategory]: true,
    }).then((res) => {
        return res[confirmedTotal];
    });
});
// Get all orders of a user
const getAllOrders = (id) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    return Order.findOne({ id }).then((res) => {
        return {
            gadgets: res.gadgets,
            photos: res.photos,
            gadgetsConfirmed: res.gadgetsConfirmed,
            photosConfirmed: res.photosConfirmed,
        };
    });
});
// Delete an order
const deleteFromCart = (id, product) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const productInDb = yield _controllers_product__WEBPACK_IMPORTED_MODULE_2__[/* Product */ "a"].findOne({
        id: product.id,
    }).then((res) => {
        return res;
    });
    const category = productInDb.category;
    const singlePrice = productInDb.price;
    const categoryConfirmed = category === 'gadgets' ? 'gadgetsConfirmed' : 'photosConfirmed';
    const newTotal = yield Order.findOne({ id }).then((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        if (res[categoryConfirmed] === true) {
            return false;
        }
        const productInCart = res[category].find((obj) => obj.id == product.id &&
            obj.size == product.size &&
            obj.color == obj.color &&
            obj.quantity == product.quantity);
        const quantity = productInCart.quantity;
        const oldTotal = category === 'gadgets' ? res.gadgetTotal : res.photoTotal;
        return oldTotal - singlePrice * quantity * 100;
    }));
    if (newTotal === false) {
        return {
            success: false,
            err: 'Your order has already been confirmed',
        };
    }
    const totalToChange = category === 'gadgets' ? 'gadgetTotal' : 'photoTotal';
    const res = yield Order.findOneAndUpdate({ id }, {
        $pull: {
            [category]: {
                id: product.id,
                size: product.size,
                color: product.color,
                quantity: product.quantity,
            },
        },
        [totalToChange]: newTotal,
    })
        .then((res) => {
        return {
            success: true,
            msg: 'Order deleted',
        };
    })
        .catch((err) => {
        return {
            success: false,
            err,
        };
    });
    return res;
});


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SnackOrder */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addSnackToCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getSnacksCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return deleteSnackFromCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return confirmSnackOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return snackOrderConfig; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _controllers_snack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _controllers_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _controllers_classe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);





const SnackOrderSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"]({
    id: { type: String, required: true },
    cart: { type: Array, required: true },
    date: { type: String, required: true },
    total: { type: Number, required: true },
    confirmed: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    classID: { type: String, required: true },
}, { versionKey: false });
const SnackOrder = mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.model('snack-order', SnackOrderSchema, 'snack-orders');
const addSnackToCart = (id, user) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const today = `${day}-${month}-${year}`;
    const result = yield SnackOrder.findOne({ id: user.id, date: today }).then((order) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        if (order && order.confirmed) {
            return {
                success: false,
                code: 'order-confirmed',
            };
        }
        const snack = yield _controllers_snack__WEBPACK_IMPORTED_MODULE_2__[/* Snack */ "a"].findOneAndUpdate({ id }, { $inc: { maxQuantity: -1 } });
        if (!order) {
            const productInCart = {
                id,
                name: snack.name,
                quantity: 1,
            };
            return new SnackOrder({
                id: user.id,
                cart: [productInCart],
                date: today,
                total: snack.price,
                classID: user.classID,
                name: `${user.firstName} ${user.lastName}`,
            })
                .save()
                .then((res) => {
                return { success: true };
            })
                .catch((err) => {
                return {
                    success: false,
                    error: err,
                };
            });
        }
        else if (order) {
            let index;
            const productExists = order.cart.find((x) => x.id === id);
            if (productExists) {
                index = order.cart.findIndex((x) => x.id === id);
            }
            else {
                index = undefined;
            }
            if (typeof index !== 'undefined') {
                const quantityQuery = `cart.${index}.quantity`;
                let update = {
                    $inc: { [quantityQuery]: 1, total: snack.price },
                };
                return SnackOrder.findOneAndUpdate({ id: user.id, date: today }, update)
                    .then((res) => {
                    return { success: true };
                })
                    .catch((err) => {
                    return { success: false, err };
                });
            }
            else {
                const productInCart = {
                    id,
                    name: snack.name,
                    quantity: 1,
                };
                return SnackOrder.findOneAndUpdate({ id: user.id, date: today }, {
                    $push: { cart: productInCart },
                    $inc: { total: snack.price },
                })
                    .then((res) => {
                    return { success: true };
                })
                    .catch((err) => {
                    return { success: false, err };
                });
            }
        }
    }));
    return result;
});
const getSnacksCart = (id) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const today = `${day}-${month}-${year}`;
    const result = yield SnackOrder.findOne({ id, date: today });
    return result;
});
const deleteSnackFromCart = (id, userID) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const today = `${day}-${month}-${year}`;
    const previousOrder = yield SnackOrder.findOne({ id: userID, date: today });
    if (previousOrder.confirmed === true) {
        return {
            success: false,
            err: 'order-confirmed',
        };
    }
    const index = previousOrder.cart.findIndex((x) => x.id === id);
    const quantity = previousOrder.cart[index].quantity;
    const snack = yield _controllers_snack__WEBPACK_IMPORTED_MODULE_2__[/* Snack */ "a"].findOneAndUpdate({ id }, { $inc: { maxQuantity: quantity } });
    const price = snack.price;
    const removedTotal = -quantity * price;
    const result = yield SnackOrder.findOneAndUpdate({ id: userID, date: today }, {
        $pull: {
            cart: {
                id,
            },
        },
        $inc: {
            total: removedTotal,
        },
    }, { new: true })
        .then((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        if (res.cart.length === 0) {
            yield SnackOrder.findOneAndRemove({ id: userID, date: today });
        }
        return { success: true };
    }))
        .catch((err) => {
        return { success: false, err };
    });
    return result;
});
const confirmSnackOrder = (user) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const today = `${day}-${month}-${year}`;
    const result = yield SnackOrder.findOne({ id: user.id, date: today })
        .then((order) => {
        if (order.total > user.snackCredit) {
            return { success: false, err: 'no-credit' };
        }
        else {
            return _controllers_user__WEBPACK_IMPORTED_MODULE_3__[/* User */ "a"].findOneAndUpdate({ id: user.id }, { $inc: { snackCredit: -order.total } }, { new: true }).then((res) => {
                _controllers_classe__WEBPACK_IMPORTED_MODULE_4__[/* Class */ "a"].findOneAndUpdate({ id: user.classID, 'members.email': user.email }, { $set: { 'members.$.snackCredit': res.snackCredit } }).then();
                return SnackOrder.findOneAndUpdate({ id: user.id, date: today }, { confirmed: true })
                    .then((res) => {
                    return { success: true };
                })
                    .catch((err) => {
                    return { success: false, err };
                });
            });
        }
    })
        .catch((err) => {
        return { success: false, err };
    });
    return result;
});
const snackOrderConfig = (io) => {
    SnackOrder.watch([], {
        fullDocument: 'updateLookup',
    }).on('change', (change) => {
        if (change.operationType === 'insert' || 'replace') {
            io.to('Bar Admin').emit('Orders', {
                change: change.fullDocument,
                operationType: change.operationType,
            });
        }
        else if (change.operationType === 'delete') {
            io.to('Bar Admin').emit('Orders', {
                change: { _id: change.documentKey._id },
                operationType: change.operationType,
            });
        }
    });
    io.on('connection', (socket) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        socket.join('Bar Admin');
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const today = `${day}-${month}-${year}`;
        const orders = yield SnackOrder.find({ date: today });
        const classes = [...new Set(orders.map((order) => order.classID).sort())];
        io.to('Bar Admin').emit('Orders', {
            orders,
            classes,
        });
    }));
};


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Commissione */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getCommissioni; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCommissione; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return setPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createCommissione; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return removeCommissione; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_winston__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);



const CommissioneSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"]({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    page: { type: Object },
    image: { type: String },
}, { skipVersioning: true });
const Commissione = mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.model('commissione', CommissioneSchema, 'commissioni');
const getCommissioni = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const commissioni = yield Commissione.find();
    return {
        success: true,
        data: commissioni,
    };
});
const getCommissione = (id) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    try {
        const commissione = yield Commissione.findOne({ id });
        return {
            success: true,
            data: commissione,
        };
    }
    catch (err) {
        return {
            success: false,
            err,
        };
    }
});
const setPage = (id, page, user) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    try {
        yield Commissione.findOneAndUpdate({ id }, { page });
        Object(_config_winston__WEBPACK_IMPORTED_MODULE_2__[/* saveEvent */ "b"])(`Modificata la pagina della commissione ${id}`, {
            user: user.email,
            category: 'commissioni',
        });
        return {
            success: true,
        };
    }
    catch (err) {
        Object(_config_winston__WEBPACK_IMPORTED_MODULE_2__[/* saveError */ "a"])(`Errore durante la modifica della pagina della commissione ${id}`, {
            user: user.email,
            category: 'commissioni',
            err,
        });
        return {
            success: false,
        };
    }
});
const createCommissione = (commissione, user) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    try {
        yield new Commissione(commissione).save().then();
        const commissioni = yield Commissione.find();
        Object(_config_winston__WEBPACK_IMPORTED_MODULE_2__[/* saveEvent */ "b"])(`Created commissione "${commissione.id}"`, {
            user: user.email,
            category: 'commissioni',
        });
        return {
            success: true,
            data: commissioni,
        };
    }
    catch (err) {
        Object(_config_winston__WEBPACK_IMPORTED_MODULE_2__[/* saveError */ "a"])(`Error during the creation of commissione "${commissione.id}"`, {
            user: user.email,
            category: 'commissioni',
            err,
        });
    }
});
const removeCommissione = (id, user) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    try {
        yield Commissione.findOneAndDelete({ id });
        const commissioni = yield Commissione.find();
        Object(_config_winston__WEBPACK_IMPORTED_MODULE_2__[/* saveEvent */ "b"])(`Removed commissione "${id}"`, {
            category: 'commissioni',
            user: user.id,
        });
        return {
            success: true,
            data: commissioni,
        };
    }
    catch (err) {
        Object(_config_winston__WEBPACK_IMPORTED_MODULE_2__[/* saveError */ "a"])(`Error during the deletion of commissione "${id}"`, {
            err,
            category: 'commissioni',
            user: user.id,
        });
        return {
            success: false,
        };
    }
});


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("stripe");

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Article */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getArticles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return saveArticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changeArticlePublished; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return deleteArticle; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_winston__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);



const ArticleSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"]({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: Object, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    estimatedTime: { type: Number },
    image: { type: String },
    published: { type: Boolean, default: false, required: true },
    date: { type: Date },
}, { skipVersioning: true });
const Article = Object(mongoose__WEBPACK_IMPORTED_MODULE_1__["model"])('article', ArticleSchema);
const getArticles = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    return Article.find()
        .then((data) => {
        return {
            success: true,
            data,
        };
    })
        .catch((err) => {
        return {
            success: false,
            err,
        };
    });
});
const getArticle = (id) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    return Article.findOne({ id })
        .then((data) => {
        return {
            success: true,
            data,
        };
    })
        .catch((err) => {
        return {
            success: false,
            err,
        };
    });
});
// Save a new article
const saveArticle = (article, id) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const exists = (yield Article.findOne({ id })) ? true : false;
    const { title, category, author, estimatedTime, content, image } = article;
    if (!exists) {
        const date = new Date();
        return new Article({
            content,
            id,
            title,
            category,
            author,
            estimatedTime,
            image,
            date,
        })
            .save()
            .then((res) => {
            return {
                success: true,
                data: {
                    articleID: id,
                },
            };
        })
            .catch((err) => {
            return {
                success: false,
                err,
            };
        });
    }
    else if (exists) {
        return Article.findOneAndUpdate({ id }, { content, title, category, author, estimatedTime })
            .then((res) => {
            return {
                success: true,
                data: {
                    articleID: id,
                },
            };
        })
            .catch((err) => {
            return {
                success: false,
                err,
            };
        });
    }
});
const changeArticlePublished = (id, state, user) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    try {
        yield Article.findOneAndUpdate({ id }, { published: state });
        Object(_config_winston__WEBPACK_IMPORTED_MODULE_2__[/* saveEvent */ "b"])(`Modificato stato dell'articolo '${id}'`, {
            category: 'qp',
            user: user.email,
            newState: state,
        });
        return {
            success: true,
        };
    }
    catch (err) {
        Object(_config_winston__WEBPACK_IMPORTED_MODULE_2__[/* saveError */ "a"])(`Errore durante il tentativo di modifica dello stato dell'articolo '${id}'`, {
            category: 'qp',
            user: user.email,
            err
        });
    }
});
const deleteArticle = (id) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const res = yield Article.findOneAndDelete({ id })
        .then((res) => {
        return {
            success: true,
        };
    })
        .catch((err) => {
        return {
            success: false,
            err,
        };
    });
    return res;
});


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("sharp");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Report */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return reportBug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getReports; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return toggleSolved; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config_winston__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);




const ReportSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"]({
    id: { type: String, required: true, unique: true },
    user: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    classID: { type: String, required: true },
    date: { type: Date, required: true },
    solved: { type: Boolean, default: false },
    bug: { type: Object },
}, { skipVersioning: true });
const Report = mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.model('report', ReportSchema);
const reportBug = (user, bug) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const date = new Date();
    return new Report({
        id: Object(uuid__WEBPACK_IMPORTED_MODULE_2__["v4"])(),
        user: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        classID: user.classID,
        date,
        bug,
    })
        .save()
        .then(() => {
        return {
            success: true,
        };
    })
        .catch((err) => {
        return {
            success: false,
            err,
        };
    });
});
const getReports = () => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    return Report.find()
        .then((data) => {
        return {
            success: true,
            data,
        };
    })
        .catch((err) => {
        return {
            success: false,
            err,
        };
    });
});
const toggleSolved = (id, solved) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    try {
        yield Report.findOneAndUpdate({ id }, { solved });
        return {
            success: true,
        };
    }
    catch (err) {
        Object(_config_winston__WEBPACK_IMPORTED_MODULE_3__[/* saveError */ "a"])(`Error while toggling solved state on report ${id}`, {
            category: 'reports',
            err,
        });
        return {
            success: false,
        };
    }
});


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("winston-mongodb");

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getErrors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getEvents; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_winston__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);



const LogSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"]({
    timestamp: { type: Date, required: true },
    level: { type: String, required: true },
    message: { type: String, required: true },
    metadata: { type: Object, required: true },
}, { skipVersioning: true });
const Error = Object(mongoose__WEBPACK_IMPORTED_MODULE_1__["model"])('error', LogSchema, 'errors');
const Event = Object(mongoose__WEBPACK_IMPORTED_MODULE_1__["model"])('event', LogSchema, 'events');
const getErrors = (user) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    try {
        const errors = yield Error.find();
        return {
            success: true,
            data: errors
        };
    }
    catch (err) {
        Object(_config_winston__WEBPACK_IMPORTED_MODULE_2__[/* saveError */ "a"])("Error during errors' retrieving", {
            category: 'logs',
            user: user.email,
            err: err
        });
        return {
            success: false
        };
    }
});
const getEvents = (user) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    try {
        const events = yield Event.find();
        return {
            success: true,
            data: events
        };
    }
    catch (err) {
        Object(_config_winston__WEBPACK_IMPORTED_MODULE_2__[/* saveError */ "a"])("Error during events' retrieving", {
            category: 'logs',
            user: user.email,
            err: err
        });
        return {
            success: false
        };
    }
});


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Course */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createCourse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCourses; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_2__);



const CourseSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"]({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    notes: { type: String },
    duration: { type: Number, required: true },
    slots: { type: Array, required: true },
    owner: { type: String, required: true },
    speakers: { type: Array, required: true },
    status: { type: String, required: true, default: 'WAITING' },
});
const Course = Object(mongoose__WEBPACK_IMPORTED_MODULE_1__["model"])('course', CourseSchema);
const createCourse = (courseData, user) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const id = Object(uuid__WEBPACK_IMPORTED_MODULE_2__["v4"])();
    const owner = user.id;
    const { title, description, notes, duration, slots, speakers } = courseData;
    return new Course({
        id,
        title,
        description,
        notes,
        duration,
        slots,
        owner,
        speakers,
    })
        .save()
        .then(() => {
        return {
            success: true,
        };
    })
        .catch((err) => {
        return {
            success: false,
            err,
        };
    });
});
const getCourses = (user) => {
    return Course.find({ owner: user.id })
        .then((courses) => {
        return {
            success: true,
            data: courses,
        };
    })
        .catch((err) => {
        return {
            success: false,
            err,
        };
    });
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("express-fileupload");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("cookie-session");

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return webhookHandler; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(stripe__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _controllers_classe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);

// Stripe initialization


const stripe = new stripe__WEBPACK_IMPORTED_MODULE_2___default.a(_environments_environment__WEBPACK_IMPORTED_MODULE_1__[/* environment */ "a"].STRIPE_KEY, {
    apiVersion: '2020-08-27',
    typescript: true,
});

function webhookHandler(req, res) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, _environments_environment__WEBPACK_IMPORTED_MODULE_1__[/* environment */ "a"].WEBHOOK_SECRET);
        }
        catch (err) {
            // On error, log and return the error message
            console.log(`❌ Error message: ${err.message}`);
            res.status(400).send(`Webhook Error: ${err.message}`);
        }
        if (event && event.type == 'payment_intent.succeeded') {
            const dataObject = event.data.object;
            yield Object(_controllers_classe__WEBPACK_IMPORTED_MODULE_3__[/* setPaid */ "d"])(dataObject.metadata.Classe, dataObject.metadata.Categoria);
        }
        // Return a response to acknowledge receipt of the event
        res.json({ received: true });
    });
}


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return socketConfig; });
/* harmony import */ var _controllers_snack_order__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);

const socketConfig = (socket) => {
    Object(_controllers_snack_order__WEBPACK_IMPORTED_MODULE_0__[/* snackOrderConfig */ "e"])(socket);
};


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_authcheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _controllers_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _controllers_log__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26);
/* harmony import */ var _controllers_commissione__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);


const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();




router.get('/events', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isAdmin */ "b"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_log__WEBPACK_IMPORTED_MODULE_4__[/* getEvents */ "b"])(req.user);
    res.json(result);
}));
router.get('/errors', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isAdmin */ "b"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_log__WEBPACK_IMPORTED_MODULE_4__[/* getErrors */ "a"])(req.user);
    res.json(result);
}));
router.post('/accounts', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isAdmin */ "b"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_user__WEBPACK_IMPORTED_MODULE_3__[/* createAccount */ "c"])(req.body.account, req.user);
    res.json(result);
}));
router.delete('/accounts/:email', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isAdmin */ "b"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_user__WEBPACK_IMPORTED_MODULE_3__[/* removeAccount */ "f"])(req.params.email);
    res.json(result);
}));
router.get('/commissioni', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isAdmin */ "b"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_commissione__WEBPACK_IMPORTED_MODULE_5__[/* getCommissioni */ "c"])();
    res.json(result);
}));
router.post('/commissioni', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isAdmin */ "b"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_commissione__WEBPACK_IMPORTED_MODULE_5__[/* createCommissione */ "a"])(req.body.commissione, req.user);
    res.json(result);
}));
router.delete('/commissioni/:id', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isAdmin */ "b"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const params = req.params;
    const id = params.id;
    const result = yield Object(_controllers_commissione__WEBPACK_IMPORTED_MODULE_5__[/* removeCommissione */ "d"])(id, req.user);
    res.json(result);
}));
/* harmony default export */ __webpack_exports__["a"] = (router);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_authcheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38);
// Main imports

const router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();



router.get('/', _config_authcheck__WEBPACK_IMPORTED_MODULE_1__[/* profileCheck */ "k"], (req, res) => {
    res.json(req.user);
});
router.get('/redirect', passport__WEBPACK_IMPORTED_MODULE_2___default.a.authenticate('google', { failureRedirect: './failure' }), (req, res) => {
    const returnTo = req.session.returnTo.split('+');
    res.redirect(`/${returnTo.join('/')}`);
});
router.get('/failure', _config_authcheck__WEBPACK_IMPORTED_MODULE_1__[/* notAuthCheck */ "j"], (req, res) => {
    res.redirect('/');
});
router.get('/logout', _config_authcheck__WEBPACK_IMPORTED_MODULE_1__[/* authCheck */ "a"], (req, res) => {
    req.logout();
    res.redirect('/');
});
router.get('/:next', _config_authcheck__WEBPACK_IMPORTED_MODULE_1__[/* notAuthCheck */ "j"], _config_login__WEBPACK_IMPORTED_MODULE_3__[/* nextMiddelware */ "a"], passport__WEBPACK_IMPORTED_MODULE_2___default.a.authenticate('google', {
    scope: ['profile', 'email'],
}));
/* harmony default export */ __webpack_exports__["a"] = (router);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return nextMiddelware; });
const nextMiddelware = (req, res, next) => {
    req.session.returnTo = req.params.next;
    next();
};


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _config_csvupload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(40);
/* harmony import */ var _config_authcheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var _config_firebase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(fs_extra__WEBPACK_IMPORTED_MODULE_7__);


const router = express__WEBPACK_IMPORTED_MODULE_1___default.a.Router();






// Upload CSV file
router.post('/csv', _config_authcheck__WEBPACK_IMPORTED_MODULE_5__[/* isVice */ "i"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    if (!req.files) {
        res.json({ uploadError: true });
    }
    else {
        const files = req.files;
        const csv = files.viceCsv;
        const fileName = `${Date.now()}_${csv.name}`;
        const workingDir = Object(path__WEBPACK_IMPORTED_MODULE_2__["join"])(Object(os__WEBPACK_IMPORTED_MODULE_3__["tmpdir"])(), 'csv');
        const tmpFilePath = Object(path__WEBPACK_IMPORTED_MODULE_2__["join"])(workingDir, fileName);
        fs_extra__WEBPACK_IMPORTED_MODULE_7___default.a.ensureDir(workingDir);
        yield csv.mv(tmpFilePath);
        const csvResult = yield Object(_config_csvupload__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(tmpFilePath).then((result) => {
            return result;
        });
        yield _config_firebase__WEBPACK_IMPORTED_MODULE_6__[/* bucket */ "a"].upload(tmpFilePath, {
            destination: `csv/${fileName}`,
        });
        fs_extra__WEBPACK_IMPORTED_MODULE_7___default.a.remove(workingDir);
        res.json(csvResult);
    }
}));
/* harmony default export */ __webpack_exports__["a"] = (router);


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var csvtojson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var csvtojson__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(csvtojson__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _controllers_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _controllers_classe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);




// Function to find duplicates
const findDuplicates = (array) => {
    var object = {};
    var result = [];
    array.forEach((item) => {
        if (!object[item])
            object[item] = 0;
        object[item] += 1;
    });
    for (var prop in object) {
        if (object[prop] >= 2) {
            result.push(prop);
        }
    }
    return result;
};
// Function to upload CSV to database
/* harmony default export */ __webpack_exports__["a"] = ((filePath) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    return csvtojson__WEBPACK_IMPORTED_MODULE_1___default()({ delimiter: 'auto' })
        .fromFile(filePath)
        .then((json) => {
        const emails = [];
        for (let obj of json) {
            emails.push(obj.email);
        }
        const duplicates = findDuplicates(emails);
        if (duplicates.length > 0) {
            return { success: false, duplicates };
        }
        else {
            const classes = [];
            for (let account of json) {
                let newUser = {
                    email: account.email,
                    firstName: account.nome,
                    lastName: account.cognome,
                    classID: account.classe,
                };
                let classObj = classes.find((x) => x.classID === newUser.classID);
                if (classObj) {
                    let classIndex = classes.indexOf(classObj);
                    classes[classIndex].members.push({
                        email: newUser.email,
                        snackCredit: 0,
                        roles: [],
                    });
                }
                else {
                    classes.push({
                        classID: newUser.classID,
                        members: [{ email: newUser.email, snackCredit: 0, roles: [] }],
                    });
                }
                _controllers_user__WEBPACK_IMPORTED_MODULE_2__[/* User */ "a"].findOne({ email: newUser.email }).then((user) => {
                    if (!user) {
                        new _controllers_user__WEBPACK_IMPORTED_MODULE_2__[/* User */ "a"](newUser).save();
                    }
                });
            }
            classes.forEach((classObj) => {
                _controllers_classe__WEBPACK_IMPORTED_MODULE_3__[/* Class */ "a"].findOne({ classID: classObj.classID }).then((classDoc) => {
                    if (!classDoc) {
                        new _controllers_classe__WEBPACK_IMPORTED_MODULE_3__[/* Class */ "a"]({
                            id: classObj.classID,
                            members: classObj.members,
                            membersCount: classObj.members.length,
                            gadgetTotal: 0,
                            photoTotal: 0,
                        }).save();
                    }
                });
            });
            return { success: true };
        }
    });
}));


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("csvtojson");

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_authcheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _controllers_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _controllers_classe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);


const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();



// Get all members in classes
router.get('/', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isPowerful */ "d"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const classes = yield Object(_controllers_classe__WEBPACK_IMPORTED_MODULE_4__[/* getClasses */ "b"])();
    res.json(classes);
}));
// Add a role to a member
router.post('/addrole', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isRappre */ "f"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_user__WEBPACK_IMPORTED_MODULE_3__[/* addRole */ "b"])(req.body.email, req.body.role);
    res.json(result);
}));
// Remove a role from a member
router.post('/removerole', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isRappre */ "f"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_user__WEBPACK_IMPORTED_MODULE_3__[/* removeRole */ "g"])(req.body.email, req.body.role);
    res.json(result);
}));
// Get all roles of a specific member
router.post('/getroles', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isRappre */ "f"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const roles = yield Object(_controllers_user__WEBPACK_IMPORTED_MODULE_3__[/* getRoles */ "d"])(req.body.email);
    res.send(roles);
}));
// Update credit of a user
router.patch('/manage/credit/:email', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isBar */ "c"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_user__WEBPACK_IMPORTED_MODULE_3__[/* updateCredit */ "h"])(req.params.email, req.body.money);
    res.json(result);
}));
/* harmony default export */ __webpack_exports__["a"] = (router);


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_authcheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _controllers_article__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(fs_extra__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _config_firebase__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10);
/* harmony import */ var _config_winston__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6);


const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();







// Images
router.post('/cover', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isQp */ "e"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const cover = files.cover;
        const fileName = `${Date.now()}_${cover.name}`;
        const workingDir = Object(path__WEBPACK_IMPORTED_MODULE_6__["join"])(Object(os__WEBPACK_IMPORTED_MODULE_5__["tmpdir"])(), 'qp');
        const tmpFilePath = Object(path__WEBPACK_IMPORTED_MODULE_6__["join"])(workingDir, fileName);
        const firebasePath = `articles/covers/${fileName}`;
        yield fs_extra__WEBPACK_IMPORTED_MODULE_4___default.a.emptyDir(workingDir);
        yield cover.mv(tmpFilePath);
        yield _config_firebase__WEBPACK_IMPORTED_MODULE_7__[/* bucket */ "a"].upload(tmpFilePath, {
            destination: firebasePath,
        });
        res.json({
            success: true,
            data: fileName,
        });
    }
    catch (err) {
        Object(_config_winston__WEBPACK_IMPORTED_MODULE_8__[/* saveError */ "a"])(`Error while uploading cover to Firebase`, {
            category: 'qp',
        });
        res.json({
            success: false,
        });
    }
}));
router.post('/image', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isQp */ "e"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const files = req.files;
    const image = files.image;
    const fileName = `${Date.now()}_${image.name}`;
    const workingDir = Object(path__WEBPACK_IMPORTED_MODULE_6__["join"])(Object(os__WEBPACK_IMPORTED_MODULE_5__["tmpdir"])(), 'qp');
    const tmpFilePath = Object(path__WEBPACK_IMPORTED_MODULE_6__["join"])(workingDir, fileName);
    const firebasePath = `articles/images/${fileName}`;
    yield fs_extra__WEBPACK_IMPORTED_MODULE_4___default.a.emptyDir(workingDir);
    yield image.mv(tmpFilePath);
    yield _config_firebase__WEBPACK_IMPORTED_MODULE_7__[/* bucket */ "a"].upload(tmpFilePath, {
        destination: firebasePath,
    });
    res.json({
        success: '1',
        file: {
            url: `/api/articles/image/${fileName}`,
            firebasePath,
        },
    });
}));
router.get('/image/:fileName', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const firebasePath = `articles/images/${req.params.fileName}`;
    const workingDir = Object(path__WEBPACK_IMPORTED_MODULE_6__["join"])(Object(os__WEBPACK_IMPORTED_MODULE_5__["tmpdir"])(), 'qp');
    const tmpFilePath = Object(path__WEBPACK_IMPORTED_MODULE_6__["join"])(workingDir, req.params.fileName);
    yield fs_extra__WEBPACK_IMPORTED_MODULE_4___default.a.emptyDir(workingDir);
    yield _config_firebase__WEBPACK_IMPORTED_MODULE_7__[/* bucket */ "a"].file(firebasePath).download({
        destination: tmpFilePath,
    });
    res.sendFile(tmpFilePath);
}));
// Article operations
router.get('/', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const articles = yield Object(_controllers_article__WEBPACK_IMPORTED_MODULE_3__[/* getArticles */ "d"])();
    res.json(articles);
}));
router.get('/:id', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const article = yield Object(_controllers_article__WEBPACK_IMPORTED_MODULE_3__[/* getArticle */ "c"])(req.params.id);
    res.json(article);
}));
router.post('/:id', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isQp */ "e"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_article__WEBPACK_IMPORTED_MODULE_3__[/* saveArticle */ "e"])(req.body.article, req.params.id);
    res.json(result);
}));
router.delete('/:id', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isQp */ "e"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_article__WEBPACK_IMPORTED_MODULE_3__[/* deleteArticle */ "b"])(req.params.id);
    res.json(result);
}));
router.patch('/:id/state', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isQp */ "e"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_article__WEBPACK_IMPORTED_MODULE_3__[/* changeArticlePublished */ "a"])(req.params.id, req.body.state, req.user);
    res.json(result);
}));
/* harmony default export */ __webpack_exports__["a"] = (router);


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_authcheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _controllers_product__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);


const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();


// Get all gadgets
router.get('/gadgets', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_product__WEBPACK_IMPORTED_MODULE_3__[/* getAllGadgets */ "f"])();
    res.json(result);
}));
// Create a new gadget
router.post('/create-gadgets', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isRappre */ "f"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_product__WEBPACK_IMPORTED_MODULE_3__[/* createGadget */ "b"])(req.body);
    res.json(result);
}));
// Get all photo products
router.get('/photos', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_product__WEBPACK_IMPORTED_MODULE_3__[/* getAllPhotos */ "g"])();
    res.json(result);
}));
// Create a new photo product
router.post('/create-photos', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isRappre */ "f"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_product__WEBPACK_IMPORTED_MODULE_3__[/* createPhoto */ "c"])(req.body);
    res.json(result);
}));
// Find a product via its ID
router.post('/find', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_product__WEBPACK_IMPORTED_MODULE_3__[/* findProduct */ "e"])(req.body.id);
    res.json(result);
}));
// Delete a product
router.delete('/:id', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isRappre */ "f"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield Object(_controllers_product__WEBPACK_IMPORTED_MODULE_3__[/* deleteProduct */ "d"])(id);
    res.json(result);
}));
/* harmony default export */ __webpack_exports__["a"] = (router);


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_authcheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _controllers_order__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _controllers_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _controllers_classe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(18);
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(stripe__WEBPACK_IMPORTED_MODULE_7__);

// Main imports

const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();




// Stripe initialization


const stripe = new stripe__WEBPACK_IMPORTED_MODULE_7___default.a(_environments_environment__WEBPACK_IMPORTED_MODULE_6__[/* environment */ "a"].STRIPE_KEY, {
    apiVersion: '2020-08-27',
    typescript: true,
});
// Get all orders of a user
router.get('/', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const response = yield Object(_controllers_order__WEBPACK_IMPORTED_MODULE_3__[/* getAllOrders */ "e"])(req.user.id);
    res.json(response);
}));
// Add a product to the cart
router.post('/add', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_order__WEBPACK_IMPORTED_MODULE_3__[/* addToCart */ "b"])(req.body.product, req.user);
    res.json(result);
}));
// Confirm an order
router.post('/confirm', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const orderTotal = yield Object(_controllers_order__WEBPACK_IMPORTED_MODULE_3__[/* confirmOrder */ "c"])(req.user.id, req.body.category);
    const classTotal = yield Object(_controllers_classe__WEBPACK_IMPORTED_MODULE_5__[/* getTotal */ "c"])(req.user.classID, req.body.category);
    const result = yield Object(_controllers_classe__WEBPACK_IMPORTED_MODULE_5__[/* updateTotal */ "f"])(orderTotal, classTotal, req.body.category, req.user.classID);
    res.json(result);
}));
// Delete an order
router.post('/delete', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_order__WEBPACK_IMPORTED_MODULE_3__[/* deleteFromCart */ "d"])(req.user.id, req.body.product);
    res.json(result);
}));
// Create a payment intent
router.post('/create-payment-intent', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isRappreDiClasse */ "g"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const classID = req.user.classID;
    const amount = yield Object(_controllers_classe__WEBPACK_IMPORTED_MODULE_5__[/* getTotal */ "c"])(classID, req.body.category);
    if (amount < 1) {
        return res.json({
            success: false,
            err: 'no-orders',
        });
    }
    const stripeID = yield Object(_controllers_user__WEBPACK_IMPORTED_MODULE_4__[/* getStripeID */ "e"])(req.user.id);
    const isConfirmed = yield Object(_controllers_classe__WEBPACK_IMPORTED_MODULE_5__[/* verifyReady */ "h"])(classID, req.body.category);
    if (!isConfirmed) {
        return res.json({
            success: false,
            data: {
                isConfirmed: false,
            },
        });
    }
    const isPaid = yield Object(_controllers_classe__WEBPACK_IMPORTED_MODULE_5__[/* verifyPaid */ "g"])(classID, req.body.category);
    if (isPaid === true) {
        return res.json({
            success: false,
            data: {
                isPaid: true,
            },
        });
    }
    const paymentIntent = yield stripe.paymentIntents.create({
        amount,
        currency: 'eur',
        description: `Pagamento di ${amount / 100}€ per la classe ${classID} nella categoria ${req.body.category}`,
        receipt_email: req.user.email,
        customer: stripeID,
        metadata: {
            Classe: classID,
            Categoria: req.body.category,
        },
    });
    if (!isPaid && isConfirmed) {
        return res.json({
            success: true,
            data: {
                clientSecret: paymentIntent.client_secret,
                total: amount / 100,
                classID: classID,
            },
        });
    }
}));
/* harmony default export */ __webpack_exports__["a"] = (router);


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_authcheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _controllers_report__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);




const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();
router.get('/', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isAdmin */ "b"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_report__WEBPACK_IMPORTED_MODULE_3__[/* getReports */ "a"])();
    res.json(result);
}));
router.patch('/solved', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isAdmin */ "b"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_report__WEBPACK_IMPORTED_MODULE_3__[/* toggleSolved */ "c"])(req.body.id, req.body.solved);
    res.json(result);
}));
router.post('/bug', (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_report__WEBPACK_IMPORTED_MODULE_3__[/* reportBug */ "b"])(req.user || req.body.contactInfo, req.body.bugData);
    res.json(result);
}));
/* harmony default export */ __webpack_exports__["a"] = (router);


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_authcheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _controllers_snack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _controllers_snack_order__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);


const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();



router.get('/', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_snack__WEBPACK_IMPORTED_MODULE_3__[/* getSnacks */ "d"])();
    res.json(result);
}));
router.get('/cart', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield Object(_controllers_snack_order__WEBPACK_IMPORTED_MODULE_4__[/* getSnacksCart */ "d"])(user.id);
    res.json(result);
}));
router.post('/cart', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield Object(_controllers_snack_order__WEBPACK_IMPORTED_MODULE_4__[/* addSnackToCart */ "a"])(req.body.id, user);
    res.json(result);
}));
router.delete('/cart/:id', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield Object(_controllers_snack_order__WEBPACK_IMPORTED_MODULE_4__[/* deleteSnackFromCart */ "c"])(req.params.id, user.id);
    res.json(result);
}));
router.get('/cart/confirm', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield Object(_controllers_snack_order__WEBPACK_IMPORTED_MODULE_4__[/* confirmSnackOrder */ "b"])(user);
    res.json(result);
}));
router.post('/manage', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isBar */ "c"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_snack__WEBPACK_IMPORTED_MODULE_3__[/* createSnack */ "b"])(req.body.snack);
    res.json(result);
}));
router.delete('/manage/:id', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isBar */ "c"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_snack__WEBPACK_IMPORTED_MODULE_3__[/* deleteSnack */ "c"])(req.params.id);
    res.json(result);
}));
router.patch('/manage/:id', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isBar */ "c"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_snack__WEBPACK_IMPORTED_MODULE_3__[/* updateMaxQuantity */ "e"])(req.body.maxQuantity, req.params.id);
    res.json(result);
}));
/* harmony default export */ __webpack_exports__["a"] = (router);


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _controllers_course__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27);
/* harmony import */ var _config_authcheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);


const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();


router.get('/courses', _config_authcheck__WEBPACK_IMPORTED_MODULE_3__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_course__WEBPACK_IMPORTED_MODULE_2__[/* getCourses */ "b"])(req.user);
    res.json(result);
}));
router.post('/courses', _config_authcheck__WEBPACK_IMPORTED_MODULE_3__[/* authCheck */ "a"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const result = yield Object(_controllers_course__WEBPACK_IMPORTED_MODULE_2__[/* createCourse */ "a"])(req.body.course, req.user);
    res.json(result);
}));
/* harmony default export */ __webpack_exports__["a"] = (router);


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config_authcheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _controllers_commissione__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var _config_firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var fs_extra__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fs_extra__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_7__);


const router = Object(express__WEBPACK_IMPORTED_MODULE_1__["Router"])();






router.get('/:id', (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const params = req.params;
    const id = params.id;
    const result = yield Object(_controllers_commissione__WEBPACK_IMPORTED_MODULE_3__[/* getCommissione */ "b"])(id);
    res.json(result);
}));
router.patch('/:id', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isReferente */ "h"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const params = req.params;
    const id = params.id;
    const result = yield Object(_controllers_commissione__WEBPACK_IMPORTED_MODULE_3__[/* setPage */ "e"])(id, req.body.page, req.user);
    res.json(result);
}));
// Images
router.post('/:id/image', _config_authcheck__WEBPACK_IMPORTED_MODULE_2__[/* isReferente */ "h"], (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const files = req.files;
    const image = files.image;
    const fileName = `${Date.now()}_${image.name}`;
    const workingDir = Object(path__WEBPACK_IMPORTED_MODULE_6__["join"])(Object(os__WEBPACK_IMPORTED_MODULE_7__["tmpdir"])(), 'commissioni');
    const tmpFilePath = Object(path__WEBPACK_IMPORTED_MODULE_6__["join"])(workingDir, fileName);
    const firebasePath = `commissioni/images/${fileName}`;
    yield fs_extra__WEBPACK_IMPORTED_MODULE_5___default.a.emptyDir(workingDir);
    yield image.mv(tmpFilePath);
    yield _config_firebase__WEBPACK_IMPORTED_MODULE_4__[/* bucket */ "a"].upload(tmpFilePath, {
        destination: firebasePath,
    });
    res.json({
        success: '1',
        file: {
            url: `/api/commissioni/image/${fileName}`,
            firebasePath,
        },
    });
}));
router.get('/image/:fileName', (req, res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
    const firebasePath = `commissioni/images/${req.params.fileName}`;
    const workingDir = Object(path__WEBPACK_IMPORTED_MODULE_6__["join"])(Object(os__WEBPACK_IMPORTED_MODULE_7__["tmpdir"])(), 'commissioni');
    const tmpFilePath = Object(path__WEBPACK_IMPORTED_MODULE_6__["join"])(workingDir, req.params.fileName);
    yield fs_extra__WEBPACK_IMPORTED_MODULE_5___default.a.emptyDir(workingDir);
    yield _config_firebase__WEBPACK_IMPORTED_MODULE_4__[/* bucket */ "a"].file(firebasePath).download({
        destination: tmpFilePath,
    });
    res.sendFile(tmpFilePath);
}));
/* harmony default export */ __webpack_exports__["a"] = (router);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(51);


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var express_fileupload__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(30);
/* harmony import */ var express_fileupload__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(express_fileupload__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var cookie_session__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(31);
/* harmony import */ var cookie_session__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(cookie_session__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _config_webhook__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(32);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(33);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(34);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _config_passport__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(53);
/* harmony import */ var _config_socket__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(35);
/* harmony import */ var _routes_admin__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(36);
/* harmony import */ var _routes_auth__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(37);
/* harmony import */ var _routes_upload__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(39);
/* harmony import */ var _routes_users__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(42);
/* harmony import */ var _routes_articles__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(43);
/* harmony import */ var _routes_products__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(44);
/* harmony import */ var _routes_orders__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(45);
/* harmony import */ var _routes_reports__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(46);
/* harmony import */ var _routes_snacks__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(47);
/* harmony import */ var _routes_coge__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(48);
/* harmony import */ var _routes_commissioni__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(49);
/* harmony import */ var _config_winston__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(6);
// Main imports













// Routes












// Connect to database
mongoose__WEBPACK_IMPORTED_MODULE_4__["connect"](_environments_environment__WEBPACK_IMPORTED_MODULE_1__[/* environment */ "a"].DB_URI, {
    // Avoid deprecation warning
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
mongoose__WEBPACK_IMPORTED_MODULE_4__["connection"].on('connected', () => {
    console.log(`Connected to database: ${_environments_environment__WEBPACK_IMPORTED_MODULE_1__[/* environment */ "a"].DB_URI}`);
});
mongoose__WEBPACK_IMPORTED_MODULE_4__["connection"].on('error', (err) => {
    console.log(`Database error: ${err}`);
});
// Declare Express app
const app = express__WEBPACK_IMPORTED_MODULE_0__();
// Cookie session middleware
app.use(cookie_session__WEBPACK_IMPORTED_MODULE_7___default()({
    maxAge: 24 * 60 * 60 * 1000,
    keys: _environments_environment__WEBPACK_IMPORTED_MODULE_1__[/* environment */ "a"].COOKIE_KEYS,
}));
// CORS middleware
app.use(cors__WEBPACK_IMPORTED_MODULE_2__());
// Initialize passport
app.use(passport__WEBPACK_IMPORTED_MODULE_5__["initialize"]());
app.use(passport__WEBPACK_IMPORTED_MODULE_5__["session"]());
// Receive webhooks from Stripe
app.post('/api/webhook', express__WEBPACK_IMPORTED_MODULE_0__["raw"]({ type: 'application/json' }), _config_webhook__WEBPACK_IMPORTED_MODULE_8__[/* webhookHandler */ "a"]);
// Read JSON requests
app.use(express__WEBPACK_IMPORTED_MODULE_0__["json"]());
// Enable file upload
app.use(express_fileupload__WEBPACK_IMPORTED_MODULE_6__({
    createParentPath: true,
}));
// Routes
app.use('/api/admin', _routes_admin__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"]);
app.use('/api/auth', _routes_auth__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"]);
app.use('/api/upload', _routes_upload__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"]);
app.use('/api/users', _routes_users__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"]);
app.use('/api/articles', _routes_articles__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"]);
app.use('/api/products', _routes_products__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"]);
app.use('/api/orders', _routes_orders__WEBPACK_IMPORTED_MODULE_19__[/* default */ "a"]);
app.use('/api/reports', _routes_reports__WEBPACK_IMPORTED_MODULE_20__[/* default */ "a"]);
app.use('/api/snacks', _routes_snacks__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"]);
app.use('/api/coge', _routes_coge__WEBPACK_IMPORTED_MODULE_22__[/* default */ "a"]);
app.use('/api/commissioni', _routes_commissioni__WEBPACK_IMPORTED_MODULE_23__[/* default */ "a"]);
// Static folder
app.use('/api/assets', express__WEBPACK_IMPORTED_MODULE_0__["static"](path__WEBPACK_IMPORTED_MODULE_3__["join"](__dirname, 'assets')));
app.use(express__WEBPACK_IMPORTED_MODULE_0__["static"](path__WEBPACK_IMPORTED_MODULE_3__["join"](__dirname, 'public')));
app.use('*', (req, res) => {
    res.sendFile(path__WEBPACK_IMPORTED_MODULE_3__["join"](__dirname, 'public', 'index.html'));
});
// Start server and socket
const port = _environments_environment__WEBPACK_IMPORTED_MODULE_1__[/* environment */ "a"].PORT;
const server = http__WEBPACK_IMPORTED_MODULE_9__["createServer"](app);
const socket = socket_io__WEBPACK_IMPORTED_MODULE_10__(server, { path: '/api/socket' });
Object(_config_socket__WEBPACK_IMPORTED_MODULE_12__[/* socketConfig */ "a"])(socket);
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
process.on('unhandledRejection', (err) => {
    Object(_config_winston__WEBPACK_IMPORTED_MODULE_24__[/* saveError */ "a"])('UnhandledRejection occurred, check db for more details', {
        category: 'server',
        err,
    });
});
process.on('uncaughtException', (err) => {
    Object(_config_winston__WEBPACK_IMPORTED_MODULE_24__[/* saveError */ "a"])('UnhandledException occurred, check db for more details', {
        category: 'server',
        err,
    });
});


/***/ }),
/* 52 */
/***/ (function(module) {

module.exports = JSON.parse("{\"type\":\"service_account\",\"project_id\":\"cslussana\",\"private_key_id\":\"c2b1e7e04ed72ece0e0a2da1372e30d54507bc2c\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC74JhuFNwg7VWw\\nfKqETF0atpAoWuxbfiUE5lYWN6wWvzI9Jv1iHcGqP2U8G2U3sGZeE+nZ+24BwCNo\\n+ZmF8DdBoCLgVwMaKegDGczCcMJ5YA+P2X4TptbA5CPxVbNJUEWpiNKLCjWsi03e\\ntTST/BxLSDYgIDMjbrZwkyhFTVW8O6zwobCm20oYiUV8/PRSS8TBIhrsB2bYMQnp\\nnZBhO85sz2aRHcYoVRnJjcv3dWp9QQNhbjqjIm3O/zs6U/mmYXQx4dmEg+ezBDY1\\nYr2AYzam+srNhm2oX4sIVZUoeuppcemN7tGtExk/YPGp1t4YmJ+98fedd312Lydd\\nuXVKnZ1zAgMBAAECggEAK/batKfc+zeOncYOgPb9soqWIVtlg+N49jSQYJKWipwj\\nPXwqPxOHhjdfkTk37lgxHEK8rm3PyEkWADKoYldcFtdKUgUKjMzRpigbakTIvW5l\\nNdxHTIH2Lx0z6/2J/tXx90I1QqQY+0994We17gtI87TqNYpTbS8zMhS9j7oRHgLR\\npXcAS1OVeCJIcvPrHk36rXSoWVmeIQhA+K2Whmkzsy+mSLhZUqx9OARClrf1TYZH\\nHI/t/OUbKNMxJZKM8HXEKeX1TCJPMX0krPsSf5gDXFLik4Cp6G6t3ilH1ssXtcHU\\n8GKLMxeEX2N0diESIfDFckDf69JyM8juiTxOQHsswQKBgQD1Net5HSgpPvjA1KwP\\nwFKw9EOIliPmczX9DoZ7Ntr8CEqEZTBswHSXhJ8qHjeeXjeriB939htFXYkRKIO6\\nL0ptnyuUxeUGSr7qD0SRs9IpjWwX8KFcQ81poZSxdW/JBb/iGXv6p7KzH4jBoTAO\\nByYnAgSfHrK7PjFQRL3lh7r+1QKBgQDEJN3qlC9PIHq9ud7hU/28I67M3DL3vJx4\\nExF8ujUeTgcyKDX2RGQu3SU1GH9u0UFaeOgGKugKsqhX3JofGQf95gG7shMBqTu2\\ni+GNPYBPIXc2sht2d0HEPediB2Sg6GkR97qgLLnhiRQVbrgJClIqKTFIQhnbnwie\\nTloeK7EfJwKBgQDlNygMqRK3q6PALY1BlBg4Tb0rWp3od94J1aAkYZzGZ8GwjR59\\nKlJSqKhYKLL5GT2U3MP90VKgvtS381Vfn4FFg7qrcWmrPgfEp80DHkLgkNBweIF9\\ny+uiSGbEk/CQyw0Zf5UDM+u5wUqHJfPTyR8C68ICNCIDIhna3MdeXkiQmQKBgBf2\\nAP4VGCpsZ1IiEK4qGocPPN1d0QQekGbCvZIlFTQciBiCfQUWmb532YHA+mBJQ9iP\\niJioSSx1YsdI9bLy1d0YagHJ4TSEvfyw3d7pMnF4Px35aA1yyB/3B/sbuBlICv3c\\n63mBvTtmCYQMwIKqNhtcaN7Q5GPF68GbBLtGzx5lAoGBAJHf8C7sFm/WzBro+g4f\\n2UfboFfpPf8cSw6XPFWUc2u7ckmjdtnEh3tAnnEAruV6c96Qdlpvy3rDUydam7Bx\\nsZY3y2vsWBYOnJt/E3BCgXPQ6jsr/J247MFafsdSpRqlffIDHhwSaPOqPVLX/t+R\\nGAbkLoZ4kZRIkcrWoWozRFWK\\n-----END PRIVATE KEY-----\\n\",\"client_email\":\"firebase-adminsdk-4jxjf@cslussana.iam.gserviceaccount.com\",\"client_id\":\"105022138180348810943\",\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\",\"token_uri\":\"https://oauth2.googleapis.com/token\",\"auth_provider_x509_cert_url\":\"https://www.googleapis.com/oauth2/v1/certs\",\"client_x509_cert_url\":\"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4jxjf%40cslussana.iam.gserviceaccount.com\"}");

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _controllers_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);



const GoogleStrategy = __webpack_require__(54).OAuth2Strategy;

// Create user session
passport__WEBPACK_IMPORTED_MODULE_1___default.a.serializeUser((user, done) => {
    done(null, user.id);
});
// Decrypt session and find user
passport__WEBPACK_IMPORTED_MODULE_1___default.a.deserializeUser((id, done) => {
    _controllers_user__WEBPACK_IMPORTED_MODULE_3__[/* User */ "a"].findOne({ id: id }).then((user) => {
        done(null, user);
    });
});
// Google Login
passport__WEBPACK_IMPORTED_MODULE_1___default.a.use(new GoogleStrategy({
    clientID: _environments_environment__WEBPACK_IMPORTED_MODULE_2__[/* environment */ "a"].GOOGLE_CLIENT_ID,
    clientSecret: _environments_environment__WEBPACK_IMPORTED_MODULE_2__[/* environment */ "a"].GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/redirect',
}, (accessToken, refreshToken, profile, done) => {
    const id = profile.id;
    const photoURL = profile.photos[0].value;
    const email = profile.emails[0].value;
    _controllers_user__WEBPACK_IMPORTED_MODULE_3__[/* User */ "a"].findOne({ id }).then((user) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
        if (user) {
            yield user.updateOne({ photoURL });
            done(null, user);
        }
        else {
            _controllers_user__WEBPACK_IMPORTED_MODULE_3__[/* User */ "a"].findOne({ email }).then((user) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function* () {
                if (user) {
                    yield user.updateOne({
                        id,
                        photoURL,
                    });
                    _controllers_user__WEBPACK_IMPORTED_MODULE_3__[/* User */ "a"].findOne({ id }).then((user) => {
                        done(null, user);
                    });
                }
                else {
                    done(null, null);
                }
            }));
        }
    }));
}));


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("passport-google-oauth");

/***/ })
/******/ ])));
//# sourceMappingURL=main.js.map