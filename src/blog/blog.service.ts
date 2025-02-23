import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) { }

  findAll(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  findOne(id: number): Promise<Blog | null> {
    return this.blogRepository.findOne({ where: { id } });
  }

  async create(title: string, content: string): Promise<Blog> {
    const blog = this.blogRepository.create({ title, content });
    return await this.blogRepository.save(blog);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.blogRepository.delete(id);
    return result.affected > 0;
  }
}
