import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpStatus, BadRequestException } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { CreateTopicSchema, UpdateTopicSchema } from './validation/topic.validation';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import * as Joi from '@hapi/joi';

@ApiTags('topics')
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  private validateSchema(schema: Joi.ObjectSchema, data: any): void {
    const { error } = schema.validate(data);
    if (error) {
      throw new BadRequestException(`Validation failed: ${error.details.map((x) => x.message).join(', ')}`);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new topic' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The topic has been successfully created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  async create(@Body() createTopicDto: CreateTopicDto) {
    this.validateSchema(CreateTopicSchema, createTopicDto);
    const createdTopic = await this.topicsService.create(createTopicDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Topic created successfully',
      data: createdTopic,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all topics with pagination and filter by topic name' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of topics retrieved successfully.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiQuery({ name: 'topicName', required: false, type: String, description: 'Filter by topic name' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query('topicName') topicName?: string) {
    const filters = topicName ? { topicName } : {};
    const { topics, total } = await this.topicsService.findAll({ page, limit, filters });
    return {
      statusCode: HttpStatus.OK,
      message : "Topics retrieved successfully",
      total,
      data: topics,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific topic by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Topic retrieved successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Topic not found.' })
  async findOne(@Param('id') id: string) {
    const topic = await this.topicsService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      data: topic,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific topic by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The topic has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Topic not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  async update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    this.validateSchema(UpdateTopicSchema, updateTopicDto);
    const updatedTopic = await this.topicsService.update(id, updateTopicDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Topic updated successfully',
      data: updatedTopic,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific topic by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The topic has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Topic not found.' })
  async remove(@Param('id') id: string) {
    await this.topicsService.remove(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
