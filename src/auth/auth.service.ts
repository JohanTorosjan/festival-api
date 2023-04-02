import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { BenevoleService } from '../benevole/benevole.service';
import { Benevole } from '../benevole/schemas/benevole.schema';
import RefreshToken from './entities/refresh-token.token';

@Injectable()
export class AuthService {
    private refreshTokens: RefreshToken[] = [];

    constructor(private readonly benevoleService: BenevoleService) {}

    async refresh(refreshStr: string): Promise<string | undefined> {
        const refreshToken = await this.retrieveRefreshToken(refreshStr);
        if (!refreshToken) {
            return undefined;
        }
        const benevole = await this.benevoleService.findByEmail(refreshToken.benevoleEmail);
        if (!benevole) {
            return undefined;
        }
        const accessToken = {
            benevoleEmail: refreshToken.benevoleEmail,
        };
        return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: '1h' });

    }

    private retrieveRefreshToken(refreshStr: string): Promise<RefreshToken | undefined> {
        try {
            const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
            if (typeof decoded === 'string') {
                return undefined;
            }
            return Promise.resolve(
                this.refreshTokens.find((token: RefreshToken) => token.id === decoded.id),
            );
        } catch (e) {
            return undefined;
        }
    }

    async login(email: string, password: string, values: { userAgent: string, ipAddress: string}) {
        const benevole = await this.benevoleService.findByEmail(email);
        console.log(benevole);
        
        if (!benevole) {
            return undefined;
        }
        if (benevole.password !== password) {
            return undefined;
        }
        return benevole;
        // return this.newRefreshAndAccessToken(benevole, values);
    }

    private async newRefreshAndAccessToken(benevole: Benevole, values: { userAgent: string, ipAddress: string}) {
        const refreshObject = new RefreshToken({
            id: this.refreshTokens.length === 0 ? 0 : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
            ...values,
            benevoleEmail: benevole.email,
        });
        this.refreshTokens.push(refreshObject);
        return {
            refreshToken: refreshObject.sign(),
            accessToken: sign(
                {
                    benevoleEmail: benevole.email
                },
                process.env.ACCESS_SECRET,
                {
                    expiresIn: '1h',
                }
            ),
        }
    }

    async logout(refreshStr: string): Promise<void> {
        const refreshToken = await this.retrieveRefreshToken(refreshStr);
        if (!refreshToken) {
            return;
        }
        this.refreshTokens = this.refreshTokens.filter(
            (refreshToken: RefreshToken) => refreshToken.id !== refreshToken.id,
        );
    }
}
