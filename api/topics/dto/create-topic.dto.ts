import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicDto {
  @ApiProperty({ description: 'Name of the topic', example: 'Programming' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the topic', example: 'All about programming', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
