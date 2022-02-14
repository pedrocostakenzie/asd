import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import  Product  from "./product.entity";
import  Cart  from "./cart.entity";

@Entity("cart_product")
export default class CartProuct {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("int")
  quantity!: number | any;

  @Column()
  productId!: string

  @Column()
  cartId!: string
}
