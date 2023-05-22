import { Test, TestingModule } from '@nestjs/testing';
import * as data from '../__tests__/data/petition.data.fake.json';

import { validate } from 'class-validator';
import { CreatePetitionDto } from '../src/petitions/dto/create-petition.dto';
import { PrismaService } from '../src/prisma/prisma.service';

describe('PetitionsController', () => {

  test('Validar numero de tajeta a traves algoritmo de LUHN', async () => {
    const card = data.dataError.card_alg;

    const createPetitionDto = new CreatePetitionDto();
    createPetitionDto.card_number = card.card_number;
    createPetitionDto.cvv = card.cvv;
    createPetitionDto.expiration_month = card.expiration_month;
    createPetitionDto.expiration_year = card.expiration_year;
    createPetitionDto.email = card.email;

    const errors = await validate(createPetitionDto);
    expect(errors.length).toBeGreaterThan(0);

    const cardNumberError = errors.find((error) => error.property === 'card_number');
    expect(cardNumberError).toBeDefined();
    expect(cardNumberError.constraints).toHaveProperty('isValidateCardNumber');


  });

  test('Validar longitud de CVV', async () => {
    const card = data.dataError.cvv_len;

    const createPetitionDto = new CreatePetitionDto();
    createPetitionDto.card_number = card.card_number;
    createPetitionDto.cvv = card.cvv;
    createPetitionDto.expiration_month = card.expiration_month;
    createPetitionDto.expiration_year = card.expiration_year;
    createPetitionDto.email = card.email;

    const errors = await validate(createPetitionDto);
    expect(errors.length).toBeGreaterThan(0)

    const cvvMinError = errors.find((error) => error.property === 'cvv');
    expect(cvvMinError).toBeDefined();
    expect(cvvMinError.constraints).toHaveProperty('min');

  });

  test('Garantizar email válido', async () => {
    const card = data.dataError.email_bad;
    const createPetitionDto = new CreatePetitionDto();
    createPetitionDto.card_number = card.card_number;
    createPetitionDto.cvv = card.cvv;
    createPetitionDto.expiration_month = card.expiration_month;
    createPetitionDto.expiration_year = card.expiration_year;
    createPetitionDto.email = card.email;

    const errors = await validate(createPetitionDto);
    expect(errors.length).toBeGreaterThan(0)

    const cvvMinError = errors.find((error) => error.property === 'email');
    expect(cvvMinError).toBeDefined();
    expect(cvvMinError.constraints).toHaveProperty('isEmail');

  });

  test('Garantizar dominio email  ', async () => {
    const card = data.dataError.email_dom;
    const createPetitionDto = new CreatePetitionDto();
    createPetitionDto.card_number = card.card_number;
    createPetitionDto.cvv = card.cvv;
    createPetitionDto.expiration_month = card.expiration_month;
    createPetitionDto.expiration_year = card.expiration_year;
    createPetitionDto.email = card.email;

    const errors = await validate(createPetitionDto);
    expect(errors.length).toBeGreaterThan(0)

    const cvvMinError = errors.find((error) => error.property === 'email');
    expect(cvvMinError).toBeDefined();
    expect(cvvMinError.constraints).toHaveProperty('isValidEmail');

  });


});
