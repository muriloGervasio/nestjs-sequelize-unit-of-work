import { Sequelize } from 'sequelize-typescript';
import { PurchaseModel } from '../entities/purchase.model';
import { ProductModel } from '../entities/product.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
      });
      sequelize.addModels([PurchaseModel, ProductModel]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
