import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../books.controller';
import { BooksService } from '../books.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { HttpStatus } from '@nestjs/common';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            search: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should create a book', async () => {
    const createBookDto: CreateBookDto = { title: 'NestJS Guide', author: 'John Doe', isbn: '123-456' };
    const createdBook = { ...createBookDto, _id: '1', topics: [] };

    jest.spyOn(service, 'create').mockResolvedValue(createdBook as any);

    expect(await controller.create(createBookDto)).toEqual({
      statusCode: HttpStatus.CREATED,
      message: 'Book created successfully',
      data: createdBook,
    });
  });

  it('should return all books', async () => {
    const books = [{ title: 'Book 1', author: 'Author 1', isbn: '123', _id: '1' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(books as any);

    expect(await controller.findAll({})).toEqual({
      statusCode: HttpStatus.OK,
      data: books,
    });
  });

  it('should search for books', async () => {
    const query = { title: 'NestJS' };
    const searchResults = [{ title: 'NestJS Guide', author: 'John Doe', isbn: '123-456', _id: '1' }];
    jest.spyOn(service, 'search').mockResolvedValue(searchResults as any);

    expect(await controller.findAll(query)).toEqual({
      statusCode: HttpStatus.OK,
      message: 'Search results retrieved successfully',
      data: searchResults,
    });
  });

  it('should return a specific book by ID', async () => {
    const book = { title: 'NestJS Guide', author: 'John Doe', isbn: '123-456', _id: '1' };
    jest.spyOn(service, 'findOne').mockResolvedValue(book as any);

    expect(await controller.findOne('1')).toEqual({
      statusCode: HttpStatus.OK,
      data: book,
    });
  });

  it('should update a book by ID', async () => {
    const updateBookDto: UpdateBookDto = { title: 'Updated Title' };
    const updatedBook = { title: 'Updated Title', author: 'John Doe', isbn: '123-456', _id: '1' };
    jest.spyOn(service, 'update').mockResolvedValue(updatedBook as any);

    expect(await controller.update('1', updateBookDto)).toEqual({
      statusCode: HttpStatus.OK,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  });

  it('should delete a book by ID', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove('1')).toEqual({
      statusCode: HttpStatus.OK,
      message: 'Book deleted successfully',
    });
  });
});
