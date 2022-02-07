import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Cart from './cart.entity';

@Entity('cart_products')
export default class CartProduct {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column("json")
    product!: Object;

    @ManyToOne(() => Cart, cart => cart.products, { onDelete: 'CASCADE', cascade: true})
    cart!: Cart;

}
