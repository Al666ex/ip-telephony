export const onHandleFormPersonInput = (e) => {
    const input = e.target.value.toUpperCase();    
    const validInput = input.replace(/[^A-ZŢŞĂÂÎȘȚ-]/g, ''); // Оставляем только латинские символы и специальные буквы    
    return validInput;    
};