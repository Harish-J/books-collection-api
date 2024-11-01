import { Test, TestingModule } from '@nestjs/testing';
import { TopicsService } from '../topics.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Topic } from '../interfaces/topic.interface';
import { CreateTopicDto } from '../dto/create-topic.dto';
import { UpdateTopicDto } from '../dto/update-topic.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TopicsService', () => {
  let service: TopicsService;
  let model: Model<Topic>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TopicsService,
        {
          provide: getModelToken('Topic'),
          useValue: {
            create: jest.fn(),
            find: jest.fn().mockReturnThis(),
            findById: jest.fn().mockReturnThis(),
            findByIdAndUpdate: jest.fn().mockReturnThis(),
            findByIdAndDelete: jest.fn().mockReturnThis(),
            countDocuments: jest.fn(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TopicsService>(TopicsService);
    model = module.get<Model<Topic>>(getModelToken('Topic'));
  });

  it('should create a topic', async () => {
    const createTopicDto: CreateTopicDto = { name: 'New Topic' };
    const createdTopic = { ...createTopicDto, _id: '1', name: 'New Topic' };
    jest.spyOn(model, 'create').mockResolvedValueOnce(createdTopic as any);

    const result = await service.create(createTopicDto);
    expect(result).toHaveProperty('name', 'New Topic');
    expect(model.create).toHaveBeenCalledWith(createTopicDto);
  });
  
  it('should handle an error during topic creation', async () => {
    const createTopicDto: CreateTopicDto = { name: 'New Topic' };
    jest.spyOn(model, 'create').mockRejectedValueOnce(new Error('Creation error'));

    await expect(service.create(createTopicDto)).rejects.toThrow(BadRequestException);
  });

  it('should return all topics with pagination and filter by topic name', async () => {
    const options = { page: 1, limit: 10, filters: { topicName: 'Science' } };
    const mockTopics: Topic[] = [{ _id: new Types.ObjectId(), name: 'Science' }];

    jest.spyOn(model, 'find').mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(mockTopics),
    } as any);

    jest.spyOn(model, 'countDocuments').mockResolvedValueOnce(1);

    const result = await service.findAll(options);
    expect(result.topics).toHaveLength(1);
    expect(result.topics[0].name).toBe('Science');
    expect(result.total).toBe(1);
    expect(model.find).toHaveBeenCalledWith({ name: { $regex: 'Science', $options: 'i' } });
  });

  it('should handle an empty topic list', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce([]),
    } as any);

    jest.spyOn(model, 'countDocuments').mockResolvedValueOnce(0);

    const options = { page: 1, limit: 10, filters: {} };
    const result = await service.findAll(options);

    expect(result.topics).toHaveLength(0);
    expect(result.total).toBe(0);
  });

  it('should handle an error during topic retrieval in findAll', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockRejectedValueOnce(new Error('Find error')),
    } as any);

    const options = { page: 1, limit: 10, filters: {} };

    await expect(service.findAll(options)).rejects.toThrow(BadRequestException);
  });

  it('should find a topic by ID', async () => {
    const topicId = new Types.ObjectId().toHexString();
    
    // Create a mock topic object that matches the expected type
    const mockTopic: Partial<Topic> = { _id: new Types.ObjectId(), name: 'Topic Name' };

    jest.spyOn(model, 'findById').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(mockTopic as Topic),
    } as any);

    const result = await service.findOne(topicId);
    expect(result).toHaveProperty('name', 'Topic Name');
    expect(model.findById).toHaveBeenCalledWith(topicId);
  });

  it('should throw NotFoundException if topic not found', async () => {
    const topicId = new Types.ObjectId().toHexString();
    jest.spyOn(model, 'findById').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(service.findOne(topicId)).rejects.toThrow(NotFoundException);
  });

  it('should throw BadRequestException for invalid topic ID in findOne', async () => {
    await expect(service.findOne('invalidId')).rejects.toThrow(BadRequestException);
  });

  it('should update a topic by ID', async () => {
    const topicId = new Types.ObjectId().toHexString();
    const updateTopicDto: UpdateTopicDto = { name: 'Updated Topic' };

    const mockUpdatedTopic: Partial<Topic> = { _id: topicId, ...updateTopicDto };

    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(mockUpdatedTopic as Topic),
    } as any);

    const result = await service.update(topicId, updateTopicDto);
    expect(result).toHaveProperty('name', 'Updated Topic');
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(topicId, updateTopicDto, { new: true });
  });

  it('should throw NotFoundException when updating a non-existent topic', async () => {
    const topicId = new Types.ObjectId().toHexString();
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(service.update(topicId, { name: 'Non-existent' })).rejects.toThrow(NotFoundException);
  });

  it('should throw BadRequestException for invalid topic ID in update', async () => {
    const updateTopicDto: UpdateTopicDto = { name: 'Updated Topic' };

    await expect(service.update('invalidId', updateTopicDto)).rejects.toThrow(BadRequestException);
  });

  it('should delete a topic by ID', async () => {
    const topicId = new Types.ObjectId().toHexString();
    const mockDeletedTopic: Partial<Topic> = { _id: topicId, name: 'Deleted Topic' };

    jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(mockDeletedTopic as Topic),
    } as any);

    await expect(service.remove(topicId)).resolves.toBeUndefined();
    expect(model.findByIdAndDelete).toHaveBeenCalledWith(topicId);
  });

  it('should throw NotFoundException when deleting a non-existent topic', async () => {
    const topicId = new Types.ObjectId().toHexString();
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(service.remove(topicId)).rejects.toThrow(NotFoundException);
  });

  it('should throw BadRequestException for invalid topic ID in remove', async () => {
    await expect(service.remove('invalidId')).rejects.toThrow(BadRequestException);
  });
});
