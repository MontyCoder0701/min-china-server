export class CreateBlogDto {
  title: string;
  content: string;
  isDraft: boolean;
}

export class UpdateBlogDto {
  title: string;
  content: string;
  isDraft: boolean;
}
