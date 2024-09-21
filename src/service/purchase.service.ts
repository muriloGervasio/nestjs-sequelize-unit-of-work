import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './create-purchase.dto';
import { PurchaseModel } from '../entities/purchase.model';
import { UnitOfWork } from '../repositories/unit-of-work.repository';

@Injectable()
export class PurchaseService {
  constructor(private readonly uom: UnitOfWork) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    await this.uom.startTransaction();

    try {
      const product = await this.uom.productRepository.findOne(
        createPurchaseDto.productId,
      );
      if (product.stock < createPurchaseDto.quantity) {
        throw new Error('Insufficient stock');
      }
      product.stock -= createPurchaseDto.quantity;
      await this.uom.productRepository.update(product.id, product);

      const purchase = new PurchaseModel();

      purchase.productId = product.id;
      purchase.quantity = createPurchaseDto.quantity;

      return this.uom.purchaseRepository.create(purchase);
    } catch (error) {
      await this.uom.rollback();
      throw error;
    }
  }
}
