import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { PurchaseRepository } from './purchase.repository';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

@Injectable({ scope: Scope.REQUEST })
export class UnitOfWork {
  transaction?: Transaction;

  constructor(
    @Inject(forwardRef(() => ProductRepository))
    public readonly productRepository: ProductRepository,
    @Inject(forwardRef(() => PurchaseRepository))
    public readonly purchaseRepository: PurchaseRepository,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
  ) {}

  async startTransaction() {
    this.transaction = await this.sequelize.transaction();
  }

  async commit() {
    await this.transaction.commit();
  }

  async rollback() {
    await this.transaction.rollback();
  }
}
