import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicineService } from './medicine/medicine.service';
import { MedicineController } from './medicine/medicine.controller';
import { MedicineModule } from './medicine/medicine.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [MedicineModule],
  controllers: [AppController, MedicineController],
  providers: [AppService, MedicineService, PrismaService],
})
export class AppModule {}
