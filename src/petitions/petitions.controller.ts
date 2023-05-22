import { Controller, Get, Post, Body, Param, Headers ,HttpException, HttpStatus} from '@nestjs/common';
import { PetitionsService } from './petitions.service';
import { CreatePetitionDto } from './dto/create-petition.dto';
import { ValidationDataService } from './util/validation.data.service';


@Controller('petitions')
export class PetitionsController {
  constructor(private readonly petitionsService: PetitionsService) {}

 
  @Post()
  create(@Body() createPetitionDto: CreatePetitionDto, @Headers('authorization') authorizationHeader: string) {
   const validationService=new ValidationDataService().validateHeader(authorizationHeader);
   if( typeof validationService === 'string')
      throw new HttpException(validationService,HttpStatus.BAD_REQUEST)
    
    return this.petitionsService.create(createPetitionDto);
  }

  @Get()
  searchToken( @Headers('authorization') authorizationHeader: string) {

    if(!authorizationHeader)
    throw new HttpException('Missing authorization header' ,HttpStatus.BAD_REQUEST)
    if (authorizationHeader.length != 16)
    throw new HttpException('Missing authorization header' ,HttpStatus.BAD_REQUEST)


    return this.petitionsService.searchToken(authorizationHeader);
  }

  
}
