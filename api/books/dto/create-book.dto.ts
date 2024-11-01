import { IsString, IsISO8601, IsOptional, IsArray, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'Title of the book', example: 'NestJS Guide' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Author of the book', example: 'John Doe' })
  @IsString()
  author: string;

  @ApiProperty({ description: 'Publication date of the book', example: '2023-01-01', required: false })
  @IsOptional()
  @IsISO8601()
  publishedDate?: Date;

  @ApiProperty({ description: 'ISBN of the book, must be unique', example: '123-456-789' })
  @IsString()
  isbn: string;

  @ApiProperty({ description: 'List of topic IDs associated with the book', type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  topics?: string[];
}
