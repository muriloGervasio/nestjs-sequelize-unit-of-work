import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './db/sequelize.provider';
import { ProductRepository } from './repositories/product.repository';
import { ProductModel } from './entities/product.model';
import { PurchaseRepository } from './repositories/purchase.repository';
import { PurchaseModel } from './entities/purchase.model';
import { UnitOfWork } from './repositories/unit-of-work.repository';
import { PurchaseService } from './service/purchase.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    ...databaseProviders,
    {
      provide: ProductRepository,
      useFactory: (uom: UnitOfWork) => new ProductRepository(uom, ProductModel),
      inject: [UnitOfWork],
    },
    {
      provide: PurchaseRepository,
      useFactory: (uom: UnitOfWork) =>
        new PurchaseRepository(uom, PurchaseModel),
      inject: [UnitOfWork],
    },
    UnitOfWork,
    PurchaseService,
  ],
})
export class AppModule {}
