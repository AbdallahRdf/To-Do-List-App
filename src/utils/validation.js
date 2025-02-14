import User from "../mongoose/schemas/user.js";

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
    fullName: {
        trim: true,
        notEmpty: {
            errorMessage: "Full Name must not be empty"
        },
        isString: {
            errorMessage: "Full Name must be a string"
        }
    },
    username: {
        trim: true,
        notEmpty: {
            errorMessage: "username must not be empty"
        },
        isString: {
            errorMessage: "username must be a string"
        },
        custom: {
            options: async (value) => {
                const user = await User.findOne({ username: value })
                if(user){
                    throw new Error('Username is already in use');
                }
                return true;
            }
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
            errorMessage: "Email must be a valid Email format"
        },
        custom: {
            options: async (value) => {
                const user = await User.findOne({ email: value })
                if(user){
                    throw new Error('Email address is already in use');
                }
                return true;
            }
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
    },
    confirmPassword: {
        trim: true,
        notEmpty: {
            errorMessage: "password confirmation must not be empty"
        },
        isString: {
            errorMessage: "password must be a string"
        },
        custom: {
            options: (value, { req }) => {
                if(value !== req.body.password) throw new Error('Password confirmation does not match password');
                return true;
            }
        }
    }
}

export const taskValidationSchema = {
    title: {
        trim: true,
        notEmpty: {
            errorMessage: "Title must not be empty"
        },
        isString: {
            errorMessage: "Title must be a string"
        }
    }
}

export const updateTaskValidationSchema = {
    title: {
        trim: true,
        notEmpty: {
            errorMessage: "Title must not be empty"
        },
        isString: {
            errorMessage: "Title must be a string"
        }
    },
    status: {
        trim: true,
        notEmpty: {
            errorMessage: "Status must not be empty"
        },
        isString: {
            errorMessage: "Status must be a string"
        }
    }
}

export const emailValidationSchema = {
    email: {
        trim: true,
        notEmpty: {
            errorMessage: "Email must not be empty"
        },
        isString: {
            errorMessage: "Email must be a string"
        },
        isEmail: {
            errorMessage: "Email must be a valid Email format"
        }
    }
}

export const resetPasswordValidationSchema = {
    password: {
        trim: true,
        notEmpty: {
            errorMessage: "Password must not be empty"
        },
        isString: {
            errorMessage: "Password must be a string"
        },
    },
    confirmPassword: {
        trim: true,
        notEmpty: {
            errorMessage: "Password confirmation must not be empty"
        },
        isString: {
            errorMessage: "Password confirmation must be a string"
        },
        custom: {
            options: (value, { req }) => {
                if(value !== req.body.password) throw new Error('Password confirmation does not match password');
                return true;
            }
        }
    }
}