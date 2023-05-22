import { Test, TestingModule } from '@nestjs/testing';
import { PetitionsController } from '../src/petitions/petitions.controller';
import { PetitionsService } from '../src/petitions/petitions.service';
import { TokenService } from '../src/petitions/util/token.service';
import { PrismaService } from '../src/prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt';
import mockJwtService from './util/token.service.mock';
import * as data from './data/petition.data.fake.json';
import { ValidationDataService } from '../src/petitions/util/validation.data.service';

describe('PetitionsController', () => {
  let controller: PetitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetitionsController],
      providers: [PetitionsService, PrismaService,
        TokenService,
        {
          provide: JwtModule,
          useValue: mockJwtService,
        },
      ],
      imports: [
        JwtModule.register({
          secret: process.env.TOKEN,
          signOptions: { expiresIn: '15m' }, // e.g. 30s, 7d, 24h
        }),
      ]
    }).compile();


    controller = module.get<PetitionsController>(PetitionsController);
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('Generar y verificar token ', async () => {

    const response = await controller.create(data.dataOk.card, data.dataOk.header);
    const tokenVerify = await controller.searchToken(response.token);

    expect.assertions(1);
    expect(tokenVerify).toMatchObject({
      card_number: expect.any(Number),
      expiration_month: expect.any(String),
      expiration_year: expect.any(String),
      email: expect.any(String)
    });

  });

  test('Validar Header  ', async () => {
    const header = data.dataError.header_validate;
    const errors = new ValidationDataService().validateHeader(header);
    expect(errors.length).toBeGreaterThan(0)
    expect(errors).toEqual('The header length is wrong');
  });

  test('Validar si existe Header  ', async () => {
    const header = data.dataError.header_sin;
    const errors = new ValidationDataService().validateHeader(header);
    expect(errors.length).toBeGreaterThan(0)
    expect(errors).toEqual('Missing authorization header');
  });

});

