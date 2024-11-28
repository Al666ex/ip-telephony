import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import * as bodyParser from 'body-parser';
import { SequelizeModule } from "@nestjs/sequelize";
import { PersonsModule } from './persons/persons.module';
import { ConfigModule } from "@nestjs/config";
import { Person } from "./persons/persons.model";
import { Phone } from "./phones/phones.model";
import { PhonesModule } from "./phones/phones.module";
import { UsersModule } from './users/users.module';
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-role.model";
import { PersonPhones } from "./persons/person-phone.model";
import { AuthModule } from "./auth/auth.module";
import { LoggerModule } from "./logger/logger.module";

@Module({
    controllers : [],
    providers : [],
    imports : [
        ConfigModule.forRoot({
            isGlobal : true,
            envFilePath : `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_POR),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Person,Phone,User,Role,UserRoles,PersonPhones],
            autoLoadModels :true,
            synchronize : true
          }),
        PersonsModule,
        LoggerModule,
        PhonesModule,
        UsersModule,
        RolesModule,
        AuthModule
        
    ]
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(bodyParser.text({ type: 'application/xml' }))
        .forRoutes('persons/searchip');
    }
  }

// export class AppModule{} 