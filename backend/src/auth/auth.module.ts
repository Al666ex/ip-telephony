import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports : [
    forwardRef(() => UsersModule) ,
    forwardRef(() => RolesModule),
    JwtModule.register({
      secret : process.env.PRIVATE_KEY || 'SECRET_KEY',
      signOptions : {
        expiresIn : '24h'
      }
    }),
  ],
  exports : [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
