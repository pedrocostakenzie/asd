import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import User from "./user.entity";
import CartProduct from "./cartProduct.entity"

@Entity("cart")
export default class Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE', cascade: true})
  owner!: User;

  @OneToMany(() => CartProduct, cartProduct => cartProduct.cart)
  products!: CartProduct[];

  @Column({ default: 0 })
  total!: number;
}
