import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example : 'login', description : 'login '})
    readonly login : string;

    @ApiProperty({example : '12345', description :'password'})
    readonly password : string;
}