export const sortPersons = (arr) => arr.sort((a, b) => {
    // Сначала сравниваем по last_name
    if (a.last_name < b.last_name) return -1;
    if (a.last_name > b.last_name) return 1;

    // Если last_name одинаковы, сравниваем по first_name
    if (a.first_name < b.first_name) return -1;
    if (a.first_name > b.first_name) return 1;

    return 0;
});