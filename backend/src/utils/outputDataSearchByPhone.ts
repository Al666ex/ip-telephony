export const outputDataSearchByPhone = (phoneEntries: any) => {
    const result = [];

    phoneEntries.forEach(entry => {
        // Если у телефона есть связанные персоны
        if (entry.persons && entry.persons.length > 0) {
            entry.persons.forEach(person => {
                const existingPerson = result.find(p => p.id === person.id);
                
                // Если такая персона уже есть, добавляем телефон к ее записям
                if (existingPerson) {
                    existingPerson.phones.push({
                        id: entry.id, // ID телефона
                        phone_number: entry.phone_number,
                    });
                } else {
                    // Если персоны нет, создаем новую запись
                    result.push({
                        id: person.id,
                        first_name: person.first_name || " ",
                        last_name: person.last_name || " ",
                        phones: [
                            {
                                id: entry.id,
                                phone_number: entry.phone_number,
                            }
                        ]
                    });
                }
            });
        } else {
            // Если у телефона нет персоны
            result.push({
                id: "", // Пустое значение для персоны
                first_name: " ",
                last_name: " ",
                phones: [
                    {
                        id: entry.id, // ID телефона
                        phone_number: entry.phone_number,
                    }
                ]
            });
        }
    });

    return result;
};


/*


export const outputDataSearchByPhone = (phoneEntries: any) => {
    const result = [];

    // Карта для хранения уникальных записей по ключу "last_name + first_name"
    const personMap = {};

    phoneEntries.forEach(entry => {
        // Если есть связанные персоны
        if (entry.persons && entry.persons.length > 0) {
            entry.persons.forEach(person => {
                const key = `${person.last_name}-${person.first_name}`.trim();

                // Если ключа нет, создаем новую запись
                if (!personMap[key]) {
                    personMap[key] = {
                        last_name: person.last_name || " ", // Если пусто, добавляем пробел
                        first_name: person.first_name || " ",
                        phones: []
                    };
                }

                // Добавляем номер телефона, если его еще нет
                if (!personMap[key].phones.includes(entry.phone_number)) {
                    personMap[key].phones.push(entry.phone_number);
                }
            });
        } else {
            // Если у записи нет связанного человека
            result.push({
                first_name: " ", // Пустые значения, если не указан человек
                last_name: " ",
                phones: [entry.phone_number],
            });
        }
    });

    // Преобразуем карту в массив
    for (const key in personMap) {
        result.push(personMap[key]);
    }

    return result;
};



*/

/*export const outputDataSearchByPhone = (myArr : any) => {
    const result = [];

    // Хранение уникальных записей по ключу "last_name + first_name"
    const personMap = {};

    myArr.forEach(entry => {
        entry.persons.forEach(person => {
            const key = `${person.last_name}-${person.first_name}`;

            // Если ключа нет в карте, создаем новую запись
            if (!personMap[key]) {
                personMap[key] = {
                    last_name: person.last_name,
                    first_name: person.first_name,
                    phones: []
                };
            }

            // Добавляем номер телефона в массив, если он ещё не добавлен
            if (!personMap[key].phones.includes(entry.phone_number)) {
                personMap[key].phones.push(entry.phone_number);
            }
        });
    });

    // Преобразуем карту в массив
    for (const key in personMap) {
        result.push(personMap[key]);
    }

    return result;
}
    */