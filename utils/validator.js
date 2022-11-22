"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator = (schema) => {
    return (payload) => schema.validate(payload, { abortEarly: false });
};
exports.default = validator;
