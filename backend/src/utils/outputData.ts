
export const outputData = (persons : any) => persons.map((person) => ({
    id : person.id,
    last_name : person.last_name,
    first_name : person.first_name,
    patronymic : person.patronymic,
    phones : person.phones.map((phone) => 
        ({
            id : phone.id,
            phone_number : phone.phone_number
        })
)
}))




// export const outputData = (persons : any) => persons.map((person) => ({
//     id : person.id,
//     last_name : person.last_name,
//     first_name : person.first_name,
//     phones : person.phones.map((phone) => phone.phone_number)
// }))