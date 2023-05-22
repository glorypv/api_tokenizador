import { Module } from '@nestjs/common';
import { PetitionsService } from './petitions.service';
import { PetitionsController } from './petitions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './util/token.service';

@Module({
  controllers: [PetitionsController],
  providers: [PetitionsService,TokenService],
  imports:[
    JwtModule.register({
      secret: process.env.TOKEN,
      signOptions: { expiresIn: '15m' }, // e.g. 30s, 7d, 24h
    }),
    PrismaModule
    ]
})
export class PetitionsModule {}
