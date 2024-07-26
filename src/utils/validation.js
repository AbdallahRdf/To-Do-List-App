export const loginValidationSchema = {
    username: {
        trim: true,
        notEmpty: {
            errorMessage: "username must not be empty"
        },
        isString: {
            errorMessage: "username must be a string"
        }
    },
    password: {
        trim: true,
        notEmpty: {
            errorMessage: "password must not be empty"
        },
        isString: {
            errorMessage: "password must be a string"
        }
    }
}

export const signupValidationSchema = {
    username: {
        trim: true,
        notEmpty: {
            errorMessage: "username must not be empty"
        },
        isString: {
            errorMessage: "username must be a string"
        }
    },
    email: {
        trim: true,
        notEmpty: {
            errorMessage: "Email must not be empty"
        },
        isString: {
            errorMessage: "Email must be a string"
        },
        isEmail: {
            errorMessage: "Must be an Email"
        }
    },
    password: {
        trim: true,
        notEmpty: {
            errorMessage: "password must not be empty"
        },
        isString: {
            errorMessage: "password must be a string"
        }
    }
}

export const taskValidationSchema = {
    title: {
        trim: true,
        notEmpty: {
            errorMessage: "title must not be empty"
        },
        isString: {
            errorMessage: "title must be a string"
        }
    },
    description: {
        trim: true,
        notEmpty: {
            errorMessage: "description must not be empty"
        },
        isString: {
            errorMessage: "description must be a string"
        },
        optional: true
    },
    dueDate: {
        trim: true,
        notEmpty: {
            errorMessage: "Due date must not be empty"
        },
        isString: {
            errorMessage: "Due date must be a string"
        },
        isDate: {
            errorMessage: "Due date must be a date"
        },
        optional: true
    },
    status: {
        trim: true,
        notEmpty: {
            errorMessage: "Status must not be empty"
        },
        isString: {
            errorMessage: "Status must be string"
        },
        optional: true
    }
}