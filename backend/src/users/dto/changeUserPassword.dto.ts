export class ChangeUserPasswordDto {
    readonly login: string;
    readonly oldPassword: string; // Убедитесь, что это поле используется
    readonly newPassword: string;
}