import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DeleteResult,
  ILike,
  LessThan,
  MoreThan,
  Repository,
  UpdateResult,
} from "typeorm";

import { CreateBlogDto, UpdateBlogDto } from "./blog.dto";
import { Blog } from "./blog.entity";

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async findAll(
    page: number,
    limit: number,
    query?: string,
  ): Promise<{
    blogs: Blog[];
    totalPages: number;
    currentPage: number;
  }> {
    const where = query?.trim()
      ? [
          { title: ILike(`%${query.trim()}%`) },
          { content: ILike(`%${query.trim()}%`) },
        ]
      : undefined;

    const [blogs, total] = await this.blogRepository.findAndCount({
      where,
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: "DESC" },
    });

    return {
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async findOne(id: number): Promise<Blog> {
    return await this.blogRepository.findOne({ where: { id } });
  }

  async findAdjacent(id: number): Promise<{
    prev: Blog | null;
    next: Blog | null;
  }> {
    const current = await this.blogRepository.findOne({ where: { id } });
    if (!current) {
      return { prev: null, next: null };
    }

    const prev = await this.blogRepository.findOne({
      where: { id: LessThan(id) },
      order: { createdAt: "DESC" },
    });

    const next = await this.blogRepository.findOne({
      where: { id: MoreThan(id) },
      order: { createdAt: "ASC" },
    });

    return { prev, next };
  }

  async createOne(dto: CreateBlogDto): Promise<Blog> {
    const blog = this.blogRepository.create(dto);
    return await this.blogRepository.save(blog);
  }

  async updateOne(id: number, dto: UpdateBlogDto): Promise<UpdateResult> {
    return await this.blogRepository.update(id, dto);
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    return await this.blogRepository.delete(id);
  }
}
