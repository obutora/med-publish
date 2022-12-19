import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { medicine } from '@prisma/client';
import MedicineModel from './medicine_entity';

@Injectable()
export class MedicineService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<medicine[]> {
    return await this.prisma.medicine.findMany();
  }

  async getMedicineByName(name: string): Promise<medicine[]> {
    return await this.prisma.medicine.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async createMedicine(data: MedicineModel): Promise<medicine> {
    return await this.prisma.medicine.create({
      data,
    });
  }

  async updateAll(data: MedicineModel[]): Promise<string> {
    if (data[0]) {
      await this.deleteAll();

      data.forEach(async (med) => {
        await this.createMedicine(med);
      });

      return 'updated';
    } else {
      throw new BadRequestException();
    }
  }

  async deleteAll() {
    return await this.prisma.medicine.deleteMany();
  }
}
