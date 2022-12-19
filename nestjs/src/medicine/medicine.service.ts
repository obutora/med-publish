import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { medicine } from '@prisma/client';
import MedicineModel from './medicine_entity';

@Injectable()
export class MedicineService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<medicine[]> {
    return await this.prisma.medicine.findMany();
  }

  async createMedicine(data: MedicineModel): Promise<medicine> {
    return await this.prisma.medicine.create({
      data,
    });
  }

  async updateAll(data: MedicineModel[]) {
    console.log(data);
  }

  async deleteAll() {
    return await this.prisma.medicine.deleteMany();
  }
}
