export const outputDataForXML = (persons : any) => persons.map((person) => ({    
    last_name : person.last_name,
    first_name : person.first_name,
    patronymic : person.patronymic,
    phones : person.phones.map((phone) => 
        ({            
            phone_number : phone.phone_number
        })
)
}))

