import * as Joi from '@hapi/joi';

export const CreateTopicSchema = Joi.object({
  name: Joi.string().required().label('Name'),
  description: Joi.string().optional().label('Description'),
});

export const UpdateTopicSchema = Joi.object({
  name: Joi.string().optional().label('Name'),
  description: Joi.string().optional().label('Description'),
});
