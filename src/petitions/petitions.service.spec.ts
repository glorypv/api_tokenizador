import { Test, TestingModule } from '@nestjs/testing';
import { PetitionsService } from './petitions.service';
import { TokenService } from './util/token.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

describe('PetitionsService', () => {
  let service: PetitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetitionsService,TokenService,PrismaService],
      imports:[
        JwtModule.register({
          secret: process.env.TOKEN,
          signOptions: { expiresIn: '15m' }, // e.g. 30s, 7d, 24h
        })
      ]
    }).compile();

    service = module.get<PetitionsService>(PetitionsService);
  });

  it('should be defined2', () => {
    expect(service).toBeDefined();
  });
});
