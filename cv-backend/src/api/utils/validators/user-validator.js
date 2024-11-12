import Joi from 'joi';


export const loginValidator = Joi.object({
   username: Joi.string().required(),
   password: Joi.string().required(),
})

export const accountValidator = Joi.object({
   id: Joi.number()
      .integer()
      .positive()
      .optional(),

   username: Joi.string()
      .alphanum()
      .min(3)
      .max(50)
      .required()
      .messages({
         'string.alphanum': 'Username can only contain alphanumeric characters.',
         'string.min': 'Username must be at least 3 characters long.',
         'string.max': 'Username must not exceed 50 characters.'
      }),

   name: Joi.string()
      .max(256)
      .required()
      .messages({
         'string.max': 'Name must not exceed 256 characters.',
         'any.required': 'Name is required.'
      }),

   lastname: Joi.string()
      .max(256)
      .required()
      .messages({
         'string.max': 'Last name must not exceed 256 characters.',
         'any.required': 'Last name is required.'
      }),

   email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .messages({
         'string.email': 'Invalid email format.',
         'any.required': 'Email is required.'
      }),

   room: Joi.string()
      .max(256)
      .required()
      .optional()
      .messages({
         'string.max': 'Room must not exceed 256 characters.',
         'any.required': 'Room is required.'
      }),

   password: Joi.string()
      .min(8)
      .max(256)
      .required()
      .messages({
         'string.min': 'Password must be at least 8 characters long.',
         'string.max': 'Password must not exceed 256 characters.',
         'any.required': 'Password is required.'
      }),

   createdAt: Joi.date()
      .iso()
      .optional(),

   updatedAt: Joi.date()
      .iso()
      .optional()
});

export default accountValidator;
