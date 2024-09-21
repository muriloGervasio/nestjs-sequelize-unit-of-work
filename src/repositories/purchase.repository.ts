import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PurchaseModel } from '../entities/purchase.model';
import { UnitOfWork } from './unit-of-work.repository';

@Injectable()
export class PurchaseRepository {
  constructor(
    @Inject(forwardRef(() => PurchaseModel))
    private readonly unitOfWork: UnitOfWork,
    private readonly purchaseModel: typeof PurchaseModel,
  ) {}

  async create(purchase: PurchaseModel): Promise<PurchaseModel> {
    return this.purchaseModel.create(
      { purchase },
      { transaction: this.unitOfWork.transaction },
    );
  }

  async findAll(): Promise<PurchaseModel[]> {
    return this.purchaseModel.findAll({
      transaction: this.unitOfWork.transaction,
    });
  }

  async findOne(id: number): Promise<PurchaseModel> {
    return this.purchaseModel.findByPk(id, {
      transaction: this.unitOfWork.transaction,
    });
  }

  async update(id: number, purchase: PurchaseModel) {
    return this.purchaseModel.update(purchase, {
      where: { id },
      transaction: this.unitOfWork.transaction,
    });
  }

  async remove(id: number): Promise<number> {
    return this.purchaseModel.destroy({
      where: { id },
      transaction: this.unitOfWork.transaction,
    });
  }
}
