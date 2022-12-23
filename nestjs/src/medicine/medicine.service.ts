import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { medicine, searchLog } from '@prisma/client';
import MedicineModel from './medicine_entity';

@Injectable()
export class MedicineService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<medicine[]> {
    return await this.prisma.medicine.findMany();
  }

  async getLog(): Promise<searchLog[]> {
    return await this.prisma.searchLog.findMany();
  }

  async getMedicineByName(
    name: string,
    isAllContains: boolean,
  ): Promise<medicine[]> {
    console.log('name', name);
    console.log('isAllContains: ', isAllContains);

    // 検索ワードのログを保存
    await this.prisma.searchLog.create({
      data: {
        keyword: name,
        isAllContains: isAllContains,
      },
    });

    if (isAllContains) {
      return await this.prisma.medicine.findMany({
        where: {
          OR: [
            {
              name: {
                contains: name,
              },
            },
            {
              general_name: {
                contains: name,
              },
            },
          ],
        },
      });
    } else {
      return await this.prisma.medicine.findMany({
        where: {
          name: {
            contains: name,
          },
        },
      });
    }
  }

  async createMedicine(data: MedicineModel): Promise<medicine> {
    return await this.prisma.medicine.create({
      data,
    });
  }

  // NOTE: 一括更新の際に、既存のデータを削除してから新しいデータを追加する
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
