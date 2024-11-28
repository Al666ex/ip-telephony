import { ApiProperty } from "@nestjs/swagger";
export class CreatePersonPhoneDto{
    @ApiProperty({example : 3, description : 'ID персоны'})
    readonly personId :number;
    @ApiProperty({example : 23, description : 'ID телефона'})
    readonly phoneId : number;
}