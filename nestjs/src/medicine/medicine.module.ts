import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';

@Module({
  controllers: [MedicineController],
  providers: [MedicineService, PrismaService],
  exports: [MedicineService],
})
export class MedicineModule {}
