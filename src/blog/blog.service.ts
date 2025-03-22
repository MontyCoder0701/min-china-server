import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, LessThan, MoreThan, Repository } from 'typeorm';

import { CreateBlogDto } from './blog.dto';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) { }

  async findAll(page: number, limit: number): Promise<{ blogs: Blog[]; totalPages: number; currentPage: number; }> {
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

  async findOne(id: number): Promise<Blog> {
    return this.blogRepository.findOne({ where: { id } });
  }

  async findAdjacent(id: number): Promise<{ prev: Blog | null; next: Blog | null }> {
    const current = await this.blogRepository.findOne({ where: { id } });
    if (!current) {
      return { prev: null, next: null };
    }

    const prev = await this.blogRepository.findOne({
      where: { id: LessThan(id) },
      order: { createdAt: 'DESC' },
    });

    const next = await this.blogRepository.findOne({
      where: { id: MoreThan(id) },
      order: { createdAt: 'ASC' },
    });

    return { prev, next };
  }

  async createOne(dto: CreateBlogDto): Promise<Blog> {
    const blog = this.blogRepository.create(dto);
    return this.blogRepository.save(blog);
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    return this.blogRepository.delete(id);
  }
}
