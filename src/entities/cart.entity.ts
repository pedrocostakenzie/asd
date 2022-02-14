import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, ManyToMany } from "typeorm";
import CartProuct from "./cartProduct.entity";
import User from "./user.entity";

@Entity("cart")
export default class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE', cascade: true, eager: true})
  owner!: User;

  @Column("decimal", { default: 0, scale: 2, precision: 5 })
  total!: number;

  @Column()
  paid!: boolean;

  @ManyToMany(type => CartProuct, {eager: true}) @JoinTable() 
  products!: CartProuct[] | any;
}
