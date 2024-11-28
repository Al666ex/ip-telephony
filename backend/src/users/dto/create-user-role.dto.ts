import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRoleDto{
    @ApiProperty({example : 'user', description : 'user'})
    readonly login : string;

    @ApiProperty({example : '12345', description :'password'})
    readonly password : string;

    @ApiProperty({example : 'USER', description: 'role value'})
    readonly roleValue : string;
}