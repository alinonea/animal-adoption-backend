import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt:JwtService, private config: ConfigService){}

    async login(dto: AuthDto){
        // find user by email
        const user = await this.prisma.user.findFirst({
            where: {
                email: dto.email,
            }
        })

        //throw exception if user does not exist
        if (!user) throw new ForbiddenException('Credentials incorrect: email')

        //compare passwords
        const pwMatches = user.password === dto.password

        //throw exception if password not correct
        if (!pwMatches) throw new ForbiddenException('Credentials incorrect: password') 

      
        return {
            user_name: user.name,
            access_token: await this.signToken(user.id, user.email)
        }
    }

    async signToken(userId: number, email: string): Promise<string>{
        const payload = {
            sub: userId,
            email: email
        }

        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '30m',
            secret: secret
        })

        return token;    
    }
}
