import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { CreateBlogDto, UpdateBlogDto } from './blog.dto';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Get()
  getAll(
    @Query('page') page = '1',
    @Query('limit') limit = '5',
    @Query('q') query?: string,
  ) {
    return this.blogService.findAll(Number(page), Number(limit), query);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.blogService.findOne(id);
  }

  @Get(':id/adj')
  getOneAdjacent(@Param('id') id: number) {
    return this.blogService.findAdjacent(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createOne(@Body() dto: CreateBlogDto) {
    return this.blogService.createOne(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateOne(@Param('id') id: number, @Body() dto: UpdateBlogDto) {
    return this.blogService.updateOne(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteOne(@Param('id') id: number) {
    return this.blogService.deleteOne(id);
  }
}
