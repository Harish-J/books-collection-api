import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from '../api/books/books.module';
import { TopicsModule } from '../api/topics/topics.module';
import { ThirdPartyModule } from './../third-party/third-party.module';
// New database configuration
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    BooksModule,
    TopicsModule,
    ThirdPartyModule,
  ],
})
export class AppModule {}
