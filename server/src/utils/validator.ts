import joi from "joi";

const validator = <T>(schema: joi.ObjectSchema<T>) => {
    return <T>(payload: T) => schema.validate(payload, { abortEarly: false });
};

export default validator;