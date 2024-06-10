import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';  
 
@Entity('data_base')  
export class DataBase {
  @PrimaryGeneratedColumn()  
  id: number;  
 
  @Column({ length: 255, unique: true })  // 确保表名唯一（前端UI界面展示的表名称）
  table_name: string;  

  @Column({ length: 255, unique: true }) // 确保表编码唯一（后端数据库中的表名称）
  table_code: string;  
 
  @CreateDateColumn()  
  created_at: Date;  
 
  @Column({ type: 'text', nullable: true })  
  table_description: string;

  @Column('json', { nullable: false })
  columns: any
}
