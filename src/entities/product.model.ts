import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { PurchaseModel } from './purchase.model';

@Table
export class ProductModel extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  price: number;

  @Column
  stock: number;

  @HasMany(() => PurchaseModel)
  purchases: PurchaseModel[];
}
