import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const validatedTopics = createBookDto.topics?.map((topicId) => {
      if (!Types.ObjectId.isValid(topicId)) {
        throw new BadRequestException(`Invalid topic ID: ${topicId}`);
      }
      return new Types.ObjectId(topicId);
    });

    const createdBook = new this.bookModel({
      ...createBookDto,
      topics: validatedTopics,
    });
    return createdBook.save();
  }

  async findAll(options: { page: number; limit: number; filters: Record<string, any> }): Promise<{ data: Book[]; total: number }> {
    const { page = 1, limit = 10, filters } = options;
    const offset = (page - 1) * limit;
    const queryConditions: Record<string, any> = {};
  
    // Apply filters dynamically for non-topic fields
    for (const [key, value] of Object.entries(filters)) {
      if (key !== 'topicName' && value) {
        queryConditions[key] = { $regex: value, $options: 'i' }; // Case-insensitive regex search
      }
    }
  
    // Calculate the total count before applying pagination
    const total = await this.bookModel.countDocuments(queryConditions).exec();
  
    // Build the query with population and topic name filter
    const data = await this.bookModel.find(queryConditions)
      .skip(offset)
      .limit(limit)
      .populate({
        path: 'topics',
        match: filters.topicName ? { name: { $regex: filters.topicName, $options: 'i' } } : {}, // Apply topic filter
      })
      .exec();
  
    // Filter out books where the `topics` array is empty if filtering by topic name
    const filteredData = filters.topicName ? data.filter(book => book.topics && book.topics.length > 0) : data;
  
    return { data: filteredData, total };
  }  

  async findOne(id: string): Promise<Book> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid book ID: ${id}`);
    }
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const validatedTopics = updateBookDto.topics?.map((topicId) => {
      if (!Types.ObjectId.isValid(topicId)) {
        throw new BadRequestException(`Invalid topic ID: ${topicId}`);
      }
      return new Types.ObjectId(topicId);
    });

    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid book ID: ${id}`);
    }

    const updatedBook = await this.bookModel.findByIdAndUpdate(
      id,
      { ...updateBookDto, topics: validatedTopics },
      { new: true }
    ).exec();

    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return updatedBook;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid book ID: ${id}`);
    }

    const result = await this.bookModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  async search(query: any): Promise<Book[]> {
    const searchConditions = {};

    if (query.title) {
      searchConditions['title'] = { $regex: query.title, $options: 'i' };
    }
    if (query.author) {
      searchConditions['author'] = { $regex: query.author, $options: 'i' };
    }
    if (query.isbn) {
      searchConditions['isbn'] = { $regex: query.isbn, $options: 'i' };
    }

    return this.bookModel.find(searchConditions).exec();
  }
}
