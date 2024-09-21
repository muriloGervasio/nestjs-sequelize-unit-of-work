import { Body, Controller, Post } from '@nestjs/common';
import { PurchaseService } from './service/purchase.service';
import { CreatePurchaseDto } from './service/create-purchase.dto';
import { PurchaseModel } from './entities/purchase.model';

@Controller()
export class AppController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async create(@Body() dto: CreatePurchaseDto): Promise<PurchaseModel> {
    return this.purchaseService.create(dto);
  }
}
