import bcrypt from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, JoinColumn } from 'typeorm';
import Cart from './cart.entity';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ select: false })
    password!: string;

    @Column()
    name!: string;

    @Column()
    isAdm!: boolean;

    @OneToMany(() => Cart, cart => cart.owner)
    cart!: Cart[];

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}
