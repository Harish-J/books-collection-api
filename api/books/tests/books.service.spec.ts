import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from '../books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book } from '../interfaces/book.interface';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<Book>>(getModelToken('Book'));
  });

  it('should create a book', async () => {
    const createBookDto: CreateBookDto = {
      title: 'NestJS Book',
      author: 'John Doe',
      isbn: '123-456-789',
      topics: ['60d21b4667d0d8992e610c85'],
    };

    jest.spyOn(model, 'create').mockResolvedValueOnce(createBookDto as any);
    const result = await service.create(createBookDto);
    expect(result).toHaveProperty('title', 'NestJS Book');
    expect(result).toHaveProperty('author', 'John Doe');
    expect(result).toHaveProperty('isbn', '123-456-789');
  });

  it('should throw a BadRequestException for invalid book ID on findOne', async () => {
    await expect(service.findOne('invalidId')).rejects.toThrow(BadRequestException);
  });

  it('should find a book by ID', async () => {
    const bookId = new Types.ObjectId().toHexString();
    jest.spyOn(model, 'findById').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue({ _id: bookId, title: 'NestJS Book' }),
    } as any);

    const result = await service.findOne(bookId);
    expect(result).toHaveProperty('title', 'NestJS Book');
  });

  it('should update a book by ID', async () => {
    const bookId = new Types.ObjectId().toHexString();
    const updateBookDto: UpdateBookDto = { title: 'Updated Title' };

    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue({ _id: bookId, ...updateBookDto }),
    } as any);

    const result = await service.update(bookId, updateBookDto);
    expect(result).toHaveProperty('title', 'Updated Title');
  });

  it('should throw NotFoundException when updating a non-existent book', async () => {
    const bookId = new Types.ObjectId().toHexString();
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(service.update(bookId, { title: 'Non-existent' })).rejects.toThrow(NotFoundException);
  });

  it('should delete a book by ID', async () => {
    const bookId = new Types.ObjectId().toHexString();
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue({ _id: bookId, title: 'Deleted Book' }),
    } as any);

    await expect(service.remove(bookId)).resolves.toBeUndefined();
  });

  it('should throw NotFoundException when deleting a non-existent book', async () => {
    const bookId = new Types.ObjectId().toHexString();
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(service.remove(bookId)).rejects.toThrow(NotFoundException);
  });
});
