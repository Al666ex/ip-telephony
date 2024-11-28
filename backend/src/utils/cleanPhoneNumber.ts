export const cleanPhoneNumber = (phone) => {
    return phone.replace(/\D/g, ''); // Убираем все символы кроме цифр
  };