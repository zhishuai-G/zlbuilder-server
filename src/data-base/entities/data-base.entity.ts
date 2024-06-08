import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';  
 
@Entity('data_base')  
export class DataBase {
  @PrimaryGeneratedColumn()  
  id: number;  
 
  @Column({ length: 255, unique: true })  // 确保表名唯一
  table_name: string;  

  @Column({ length: 255, unique: true }) // 确保表编码唯一
  table_code: string;  
 
  @CreateDateColumn()  
  created_at: Date;  
 
  @Column({ type: 'text', nullable: true })  
  table_description: string;
}
