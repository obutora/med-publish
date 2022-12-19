import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { medicine } from '@prisma/client';
import MedicineModel from './medicine_entity';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Get('med')
  async getAll(): Promise<medicine[]> {
    return await this.medicineService.getAll();
  }

  @Post('med')
  async create(): Promise<MedicineModel> {
    return await this.medicineService.createMedicine({
      name: 'test medicine1',
      amount: 10,
      unit: '錠',
      unit_price: 10,
      category: 'test Category',
      general_name: 'general name',
      isGeneric: true,
      //   id: 0,
    });
  }

  @Post('updateAll')
  async updateAll(@Body() postData: { postData: MedicineModel[] }) {
    await this.medicineService.updateAll(postData.postData);
    // await this.medicineService.deleteAll();
    // return await this.medicineService.getAll();
  }

  @Delete('med')
  async deleteAll(): Promise<string> {
    await this.medicineService.deleteAll();
    return 'deleted';
  }
}
