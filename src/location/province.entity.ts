import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { District } from './district.entity';

@Entity()
export class Province {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID will be automatically generated

  @Column()
  nameEn: string;

  @Column()
  nameLa: string;

  @OneToMany(() => District, (district) => district.province, { cascade: true })
  districts: District[];
}
