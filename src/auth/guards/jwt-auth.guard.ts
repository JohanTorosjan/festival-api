import { UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { AuthGuard } from "@nestjs/passport";
import { JsonWebTokenError } from "jsonwebtoken";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, benevole: any, info: any, context: any, status: any) {
        if (info instanceof JsonWebTokenError) {
            throw new UnauthorizedException('Invalid JWT');
        }
        return super.handleRequest(err, benevole, info, context, status);
    }
}