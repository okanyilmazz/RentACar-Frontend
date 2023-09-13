export interface UpdatePasswordDto {
  id: number;
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}
