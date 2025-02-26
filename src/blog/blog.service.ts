import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBlogDto } from './blog.dto';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async findAll(page: number, limit: number) {
    const [blogs, total] = await this.blogRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: 'DESC' },
    });

    return {
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async findOne(id: number) {
    return this.blogRepository.findOne({ where: { id } });
  }

  async createOne(dto: CreateBlogDto) {
    const blog = this.blogRepository.create(dto);
    return this.blogRepository.save(blog);
  }

  async deleteOne(id: number) {
    return this.blogRepository.delete(id);
  }
}
