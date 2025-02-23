import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async create(title: string, content: string) {
    const blog = this.blogRepository.create({ title, content });
    return this.blogRepository.save(blog);
  }

  async delete(id: number) {
    return this.blogRepository.delete(id);
  }
}
