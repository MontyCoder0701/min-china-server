import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Get()
  getAll(
    @Query('page') page = '1',
    @Query('limit') limit = '3',
  ) {
    return this.blogService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.blogService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: { title: string; content: string }) {
    return this.blogService.create(body.title, body.content);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: number) {
    return this.blogService.delete(id);
  }
}
