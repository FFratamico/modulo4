import { Role } from "src/config/enum/role.enum";
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 50, nullable: false})
  name: string;

  @Column({unique: true, length: 50, nullable: false})
  email: string;

  @Column({length: 100, nullable: false})
  password: string;

  @Column('int', {nullable: true})
  phone: number;

  @Column({length: 50, nullable: true})
  country: string;

  @Column('text', {nullable: true})
  address: string;

  @Column({length: 50, nullable: true})
  city: string;

  @Column('int')
  age: number;

  @Column({type: 'enum', enum: Role, default:Role.User})
  administrator: Role

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
