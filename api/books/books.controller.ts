import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The book has been successfully created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  async create(@Body() createBookDto: CreateBookDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Book created successfully',
      data: await this.booksService.create(createBookDto),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all books with filter and pagination' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Books retrieved successfully.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiQuery({ name: 'topicName', required: false, type: String, description: 'Filter by topic name' })
  @ApiQuery({ name: 'author', required: false, type: String, description: 'Filter by author name' })
  @ApiQuery({ name: 'title', required: false, type: String, description: 'Filter by book title' })
  async findAll(@Query() query: PaginationQueryDto) {
    const { page = 1, limit = 10, ...filters } = query;
    return {
      statusCode: HttpStatus.OK,
      message: 'Books retrieved successfully',
      data: await this.booksService.findAll({ page, limit, filters }),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific book by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Book retrieved successfully.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Book not found.' })
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.booksService.findOne(id),
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific book by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The book has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Book not found.' })
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Book updated successfully',
      data: await this.booksService.update(id, updateBookDto),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific book by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The book has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Book not found.' })
  async remove(@Param('id') id: string) {
    await this.booksService.remove(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
