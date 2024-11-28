import { ApiProperty } from "@nestjs/swagger";

export class ResetUserPassword{
    @ApiProperty({example : '1', description : 'Unique user identifier'})
    readonly userId : number;
    
    @ApiProperty({example : '12345', description :'password'})
    readonly password : string;
}