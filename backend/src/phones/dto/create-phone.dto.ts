import { ApiProperty } from "@nestjs/swagger";

export class CreatePhoneDto {
    @ApiProperty({
        example: ['022-26-9000', '068002300-CUG UNITE'],
        description: 'Array of phone numbers'
    })
    readonly phones: string[];
    readonly personId: number;
}
// export class CreatePhoneDto{
//     @ApiProperty({example : '022-22-6556', description : 'номер телефона'})
//     phone_number : string;
//     // readonly personId : number;
// }