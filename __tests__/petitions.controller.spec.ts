import { Test, TestingModule } from '@nestjs/testing';
import { PetitionsController } from '../src/petitions/petitions.controller';
import { PetitionsService } from '../src/petitions/petitions.service';
import { TokenService } from '../src/petitions/util/token.service';
import { PrismaService } from '../src/prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

import { ValidationDataService } from '../src/petitions/util/validation.data.service';
import mockJwtService from './util/token.service.spect';
import * as data from './data/petition.data.fake.json';
import * as dataMock from './data/petition.data.mock.fake.json';
describe('PetitionsController', () => {
  let controller: PetitionsController;
  let service: PetitionsService;
  let tokenService: TokenService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const tokenServiceSpy = {
      generateToken: jest.fn().mockReturnValue(dataMock.data_token_generate),
      verifyToken: jest.fn().mockReturnValue(dataMock.data_token_verify),
    };
    const petitionServiceSpy = {
      createData: jest.fn().mockResolvedValue({}),
      create: jest.fn().mockReturnValue(dataMock.data_create),
      searchToken: jest.fn().mockReturnValue(dataMock.data_search_token),
    };

    const prismaServiceSpy = {
      create: jest.fn().mockResolvedValue({}),
      findUnique: jest.fn().mockResolvedValue({}),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetitionsController],
      providers: [
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: PetitionsService, useValue: petitionServiceSpy },
        { provide: PrismaClient, useValue: prismaServiceSpy },
      ],
      imports: [
      ]
    }

    ).compile();
    controller = module.get<PetitionsController>(PetitionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('Generar  token ', async () => {
    const response = await controller.create(data.dataOk.card, data.dataOk.header);
    expect.assertions(1);
    expect(response).toMatchObject({
      token: expect.any(String)
    });
  });

  test('Verificar token ', async () => {
    const tokenVerify = await controller.searchToken(data.dataOk.token);
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

