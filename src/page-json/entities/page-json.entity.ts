import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('pages')
@Unique(['pageId'])
export class PageJson {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  pageId: string;

  @Column({ length: 255 })
  pageName: string

  @Column('json', { nullable: false })
  pageJson: any
}
