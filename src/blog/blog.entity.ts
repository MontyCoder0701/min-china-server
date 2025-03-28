import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column("text")
  content: string;

  @Column({ default: false })
  isDraft: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
