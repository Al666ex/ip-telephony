import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonDto {
    @ApiProperty({ example: 'Djokovic', description: 'last name' })
    readonly last_name: string;

    @ApiProperty({ example: 'Novak', description: 'first name' })
    readonly first_name: string;

    @ApiProperty({ example: 'Срджан', description: 'patronymic' })
    readonly patronymic: string;

    @ApiProperty({
        example: ['022-26-9000', '068002300-CUG UNITE'],
        description: 'Array of phone numbers'
    })
    readonly phones: string[];
}


