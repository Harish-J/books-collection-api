import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Topic } from './interfaces/topic.interface';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicsService {
  constructor(@InjectModel('Topic') private readonly topicModel: Model<Topic>) {}

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const createdTopic = new this.topicModel(createTopicDto);
    return createdTopic.save();
  }

  async findAll(options: { page: number; limit: number; filters: any }): Promise<{ topics: Topic[]; total: number }> {
    const { page, limit, filters } = options;
    const offset = (page - 1) * limit;
    const queryConditions: any = {};

    // Apply topic name filter if provided
    if (filters.topicName) {
      queryConditions.name = { $regex: filters.topicName, $options: 'i' }; // Case-insensitive regex
    }

    const topics = await this.topicModel.find(queryConditions)
      .skip(offset)
      .limit(limit)
      .exec();

    const total = await this.topicModel.countDocuments().exec();

    return { topics, total };
  }

  async findOne(id: string): Promise<Topic> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid topic ID: ${id}`);
    }
    const topic = await this.topicModel.findById(id).exec();
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return topic;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid topic ID: ${id}`);
    }

    const updatedTopic = await this.topicModel.findByIdAndUpdate(id, updateTopicDto, { new: true }).exec();
    if (!updatedTopic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return updatedTopic;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid topic ID: ${id}`);
    }

    const result = await this.topicModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
  }
}
