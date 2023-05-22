export class ValidationDataService {

    validateHeader(header: string) :string{
        const longitud = 24;
        const patron = /^[a-zA-Z0-9]+$/;

        if(!header)
        return 'Missing authorization header' 
        if (header.length != longitud)
            return 'The header length is wrong' 
            
        if (header.substring(0, 8) != process.env.HEADER_PREFIX)
            return 'The header prefix is wrong' 

        if (!patron.test(header.substring(8, 24)))
            return 'The header alfanumeric is wrong' 
    }


}