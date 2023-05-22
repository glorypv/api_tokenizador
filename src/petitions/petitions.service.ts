import { Injectable, Param  ,HttpException, HttpStatus} from '@nestjs/common';
import { CreatePetitionDto } from './dto/create-petition.dto';
import { ResponsePetitionDto } from './dto/response-petition.dto';
import { PrismaService } from '../../src/prisma/prisma.service';
import { TokenService } from './util/token.service';

@Injectable()
export class PetitionsService {
  constructor(private prisma: PrismaService, private token: TokenService) { }

  async create(createPetitionDto: CreatePetitionDto) {

    let token = this.token.generateToken();

    await this.prisma.petition.create({
      data: {
        card_number: createPetitionDto.card_number,
        cvv: createPetitionDto.cvv,
        expiration_month: createPetitionDto.expiration_month,
        expiration_year: createPetitionDto.expiration_year,
        email: createPetitionDto.email,
        token: token.token,
        signedToken: token.signedToken
      },
    });

    return { 'token': token.token };
  }




  async searchToken(@Param('token') token: string) {

    let response = await this.prisma.petition.findUnique({
      where: {
        token: token
      }
    })
    
    if (response) {
      let responseToken = this.token.verifyToken(response.signedToken, token);
      if (responseToken.status) {
  
        return { card_number: Number(response.card_number),
          expiration_month: response.expiration_month,
          expiration_year: response.expiration_year,
          email: response.email} ;
      }
     throw new HttpException(responseToken.msg ,HttpStatus.BAD_REQUEST)
    }
     throw new HttpException('Token does not exist' ,HttpStatus.BAD_REQUEST)

  }

}
