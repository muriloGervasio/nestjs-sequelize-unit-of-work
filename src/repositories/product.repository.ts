import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ProductModel } from '../entities/product.model';
import { UnitOfWork } from './unit-of-work.repository';

@Injectable()
export class ProductRepository {
  constructor(
    @Inject(forwardRef(() => UnitOfWork))
    private readonly unitOfWork: UnitOfWork,
    private readonly productModel: typeof ProductModel,
  ) {}

  async create(product: ProductModel): Promise<ProductModel> {
    return this.productModel.create({
      product,
      transaction: this.unitOfWork.transaction,
    });
  }

  async findAll(): Promise<ProductModel[]> {
    return this.productModel.findAll({
      transaction: this.unitOfWork.transaction,
    });
  }

  async findOne(id: number): Promise<ProductModel> {
    return this.productModel.findByPk(id, {
      transaction: this.unitOfWork.transaction,
    });
  }

  async update(id: number, product: ProductModel) {
    return this.productModel.update(product, {
      where: { id },
      transaction: this.unitOfWork.transaction,
    });
  }

  async remove(id: number): Promise<number> {
    return this.productModel.destroy({
      where: { id },
      transaction: this.unitOfWork.transaction,
    });
  }
}
