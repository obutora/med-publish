import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  Post,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { medicine } from '@prisma/client';
import MedicineModel from './medicine_entity';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  //isAllContainsがtrueの場合は、nameとgeneral_nameの両方を検索する
  @Get('name/:name/:isAllContains')
  async getMedicineByName(
    @Param('name') name: string,
    @Param('isAllContains', ParseBoolPipe) isAllContains: boolean,
  ): Promise<medicine[]> {
    return await this.medicineService.getMedicineByName(name, isAllContains);
  }

  @Get('all')
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
  async updateAll(@Body() post: { postData: string }) {
    const data = JSON.parse(post.postData) as MedicineModel[];
    return await this.medicineService.updateAll(data);
    // await this.medicineService.deleteAll();
    // return await this.medicineService.getAll();
  }

  // @Delete('med')
  // async deleteAll(): Promise<string> {
  //   await this.medicineService.deleteAll();
  //   return 'deleted';
  // }
}
