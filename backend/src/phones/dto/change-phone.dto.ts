import { ApiProperty } from "@nestjs/swagger";
export class ChangePhoneDto{
    @ApiProperty({example : '022-22-6556', description : 'current номер телефона'})
    old_phone_number : string;
    @ApiProperty({example : '022-22-2222', description : 'new номер телефона'})
    new_phone_number : string;
}