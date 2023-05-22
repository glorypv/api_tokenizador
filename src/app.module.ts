import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PetitionsModule } from './petitions/petitions.module';

@Module({
  imports: [PrismaModule, PetitionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
