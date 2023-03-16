import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "1e973ee0e16f7eef4f921d50dc61d70b2efefc19"
        });
    }

    async validate(payload) {
        console.log(payload);
        const user = {
            user_id: payload.user_id,
            email: payload.email
        }
        return user;
    }
}