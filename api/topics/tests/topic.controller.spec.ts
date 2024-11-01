import { Test, TestingModule } from '@nestjs/testing';
import { TopicsController } from '../topics.controller';
import { TopicsService } from '../topics.service';
import { CreateTopicDto } from '../dto/create-topic.dto';
import { UpdateTopicDto } from '../dto/update-topic.dto';
import { HttpStatus } from '@nestjs/common';

describe('TopicsController', () => {
  let controller: TopicsController;
  let service: TopicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicsController],
      providers: [
        {
          provide: TopicsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TopicsController>(TopicsController);
    service = module.get<TopicsService>(TopicsService);
  });

  it('should create a topic', async () => {
    const createTopicDto: CreateTopicDto = { name: 'Test Topic' };
    const createdTopic = { ...createTopicDto, _id: '1' };

    jest.spyOn(service, 'create').mockResolvedValue(createdTopic as any);

    expect(await controller.create(createTopicDto)).toEqual({
      statusCode: HttpStatus.CREATED,
      message: 'Topic created successfully',
      data: createdTopic,
    });
  });

  it('should return all topics', async () => {
    const topics = [{ name: 'Topic 1', _id: '1' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(topics as any);

    expect(await controller.findAll()).toEqual({
      statusCode: HttpStatus.OK,
      data: topics,
    });
  });

  it('should return a specific topic by ID', async () => {
    const topic = { name: 'Test Topic', _id: '1' };
    jest.spyOn(service, 'findOne').mockResolvedValue(topic as any);

    expect(await controller.findOne('1')).toEqual({
      statusCode: HttpStatus.OK,
      data: topic,
    });
  });

  it('should update a topic by ID', async () => {
    const updateTopicDto: UpdateTopicDto = { name: 'Updated Topic' };
    const updatedTopic = { name: 'Updated Topic', _id: '1' };
    jest.spyOn(service, 'update').mockResolvedValue(updatedTopic as any);

    expect(await controller.update('1', updateTopicDto)).toEqual({
      statusCode: HttpStatus.OK,
      message: 'Topic updated successfully',
      data: updatedTopic,
    });
  });

  it('should delete a topic by ID', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove('1')).toEqual({
      statusCode: HttpStatus.OK,
      message: 'Topic deleted successfully',
    });
  });
});
