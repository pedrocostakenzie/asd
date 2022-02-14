import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("product")
export default class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column("decimal", { scale: 2, precision: 5 })
  price!: number;
}
