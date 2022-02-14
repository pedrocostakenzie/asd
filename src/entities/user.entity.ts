import bcrypt from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Cart from "./cart.entity";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  name!: string;

  @Column({ select: false })
  isAdm!: boolean;

  @ManyToMany((type) => Cart)
  @JoinTable()
  carts!: Cart[];

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
