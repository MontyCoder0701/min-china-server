import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Blog } from './blog.entity';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), AuthModule],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule { }
