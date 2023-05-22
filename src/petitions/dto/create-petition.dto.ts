import {IsNotEmpty, IsInt, Min, Max, Length, IsEmail,ValidationArguments, ValidationOptions, registerDecorator} from 'class-validator';

export class CreatePetitionDto {

    @IsNotEmpty()
    @IsValidateCardNumber({ message: 'The card number is not valid.' })
    card_number: number

    @IsNotEmpty()
    @IsInt({ message: 'The cvv must be an number.' })
    @Min(100, { message: 'The length of the cvv must be greater than 3 digits.' })
    @Max(9999, { message: 'The length of the cvv must be less than 4 digits.' })
    cvv: number

    @IsNotEmpty()
    @IsValidExperitationMonth( { message: 'The Expiration month is wrong' })
    expiration_month: string

    @IsNotEmpty()
    @IsValidExperitationYear({ message: 'The Expiration year cannot be greater than 5 years.' })
    @Length(4, 4, { message: 'The Expiration year length is wrong' })
    expiration_year: string

    @IsNotEmpty()
    @IsEmail({}, { message: 'The email format is invalid.' })
    @IsValidEmail({ message: 'The email domain is invalid. Must be one of the following: ${allowedDomains}.' })
    @Length(5, 100, { message: 'The email length is wrong' })
    email: string

    token?: string
    signedToken?: string

}



export function IsValidEmail(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidEmail',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com|yahoo\.es)$/i;
                    return typeof value === 'string' && emailRegex.test(value);


                },
            },
        });
    };
}

export function IsValidateCardNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidateCardNumber',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {

                    if(!+value || typeof value === 'string')
                        return typeof value === 'number' && false;
                    
                    if(value.toString().length<13 || value.toString().length>16)
                    return typeof value === 'number' && false;

                    let sum = 0;
                    let shouldDouble = false;
                    for (let i = value.toString().length - 1; i >= 0; i--) {
                        let digit = parseInt(value.toString().charAt(i));
                        if (shouldDouble) {
                            digit *= 2;
                            if (digit > 9) {
                                digit -= 9;
                            }
                        }
                        sum += digit;
                        shouldDouble = !shouldDouble;
                    }
                    value = +value;
                    return typeof value === 'number' && sum % 10 === 0;
                },
            },
        });
    };
}


export function IsValidExperitationYear(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidExperitationYear',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const year = +(value);
                    const currentYear = new Date().getFullYear();
                    return typeof value === 'string' && (year >= currentYear && year <= currentYear + 5);


                },
            },
        });
    };
}


export function IsValidExperitationMonth(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidExperitationMonth',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const month = +(value);
                    return typeof value === 'string' && (month >= 1 && month <= 12);
                },
            },
        });
    };
}
