import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorCustomizer } from './error.customizer'
const crypto = require('crypto');

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) { }
    generateToken() {
        try {
            const longitud = 16;
            const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let token = '';
            for (let i = 0; i < longitud; i++) {
                const indice = crypto.randomInt(0, caracteres.length);
                token += caracteres.charAt(indice);
            }
            let signedToken = this.jwtService.sign({ data: token });
            return {
                signedToken: signedToken,
                token: token
            }
        } catch (err) {
            console.log(err);
        }
    }

    verifyToken(signedToken: string, token: string) {
        try {
            const decoded = this.jwtService.verify(signedToken);
            if (decoded.token = token)

                return { status: true }
            return {
                status: false,
                msg: 'Error: Token is different'
            };

        } catch (err) {
            if (err.name == "TokenExpiredError") {

                return {
                    status: false,
                    msg: 'Error: Token expired'
                };
            }
            return {
                status: false,
                msg: err
            };

        }


    }

}