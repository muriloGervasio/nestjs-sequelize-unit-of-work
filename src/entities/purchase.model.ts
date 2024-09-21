import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProductModel } from './product.model';

@Table
export class PurchaseModel extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  quantity: number;

  @Column
  date: Date;

  @ForeignKey(() => ProductModel)
  @Column
  productId: number;

  @BelongsTo(() => ProductModel)
  product: ProductModel;
}
