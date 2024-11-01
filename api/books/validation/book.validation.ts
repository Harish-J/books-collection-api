import * as Joi from '@hapi/joi';

export const CreateBookSchema = Joi.object({
  title: Joi.string().required().label('Title'),
  author: Joi.string().required().label('Author'),
  publishedDate: Joi.date().optional().label('Published Date'),
  isbn: Joi.string().required().label('ISBN'),
  topics: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).optional().label('Topics'),
});

export const UpdateBookSchema = Joi.object({
  title: Joi.string().optional().label('Title'),
  author: Joi.string().optional().label('Author'),
  publishedDate: Joi.date().optional().label('Published Date'),
  isbn: Joi.string().optional().label('ISBN'),
  topics: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).optional().label('Topics'),
});

export const bookFilterParams = Joi.object({
  limit: Joi.number().optional().label('The limit for Pagination'),
  offset: Joi.number().optional().label('The offset for pagination'),
  search: Joi.number().optional().label('Search Book my Author, Title'),
});
