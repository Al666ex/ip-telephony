// let arr = [1,2,3]

// console.log(Array.from(arr, (x) => x*2))
// console.log(Array.from('foo'))
// console.log(Array.from('2,4', (x) => x*3))
/*

let arr = [
    {
        "id": 202,
        "first_name": "MI1",
        "last_name": "AN1",
        "phones": [
            {
                "id": 165,
                "phone_number": "3257"
            }
        ]
    },
    {
        "id": 203,
        "first_name": "MI2",
        "last_name": "AN2",
        "phones": [
            {
                "id": 165,
                "phone_number": "3257"
            }
        ]
    }
]

console.log(arr.map(({first_name,last_name}) => `${first_name} ${last_name}`))

*/

// написать функцию searchForMatches которая определяет есть ли совпадения в массиве только по цифрам и не учитывает другие символы,
// например '123' или '123 - CUG' или '12-3' считать как "123", если совпадения есть функция возвращает true в противном случае false

// например const arr = ['123','123 - CUG','333'] 
// searchForMatches(arr) вернет true потому что есть совпадения '123' и '123 - CUG' 

// const arr2 = ['333','123','1-23']
// searchForMatches(arr2) вернет true потому что есть совпадения '123' и '1-23'

// const arr3 = ['333','1w23','144w']
// searchForMatches(arr3) вернет false потому что нет совпадений 

/*
function searchForMatches(arr) {
    // Normalize each entry to contain only digits
    const normalizedNumbers = arr.map(str => str.replace(/\D/g, ''));
    
    // Use a Set to track unique numbers
    const uniqueNumbers = new Set();
  
    // Check for duplicates
    for (let num of normalizedNumbers) {
      if (uniqueNumbers.has(num)) {
        return true; // Duplicate found
      }
      uniqueNumbers.add(num);
    }
    
    return false; // No duplicates found
  }
  */
  
  // Example usage:
//   const arr1 = ['123', '123 - CUG', '333'];
//   console.log(searchForMatches(arr1)); // Output: true
  
//   const arr2 = ['333', '123', '1-23'];
//   console.log(searchForMatches(arr2)); // Output: true
  
//   const arr3 = ['333', '1w23', '144w'];
//   console.log(searchForMatches(arr3)); // Output: false


//   const str = 'ŞŢȘȚ' Ş Ș Ţ Ț
//   console.log(str.charCodeAt(0))
//   console.log(str.charCodeAt(1))
//   console.log(str.charCodeAt(2))
//   console.log(str.charCodeAt(3))

//   const str2 = 'ĂĂ'
//   console.log(str2.charCodeAt(0))
//   console.log(str2.charCodeAt(1))
  

//   const str3 = 'ÎÎ'
//   console.log(str3.charCodeAt(0))
//   console.log(str3.charCodeAt(1))

/*
let editObject = {
    "id": 9,
    "last_name": "ŢAȚTTTZ",
    "first_name": "ION",
    "patronymic": "",
    "phones": [
        {
            "id": 9,
            "phone_number": "43432"
        },
        {
            "id": 11,
            "phone_number": "555 CUG"
        }
    ]
}

const onlyPhoneNumbers = editObject.phones.map(({phone_number}) =>phone_number)
console.log(onlyPhoneNumbers)
*/

export const hasNumber = (str) => /\d/.test(str);

const phonesArr = ['234', '2CUG', '232 - CUG']
const phonesArr2 = ['234', '2222', '232 - CUG']
const phonesArr3 = ['234ww', '2CUG', '232 - CUG','']

const checkPhonesArray  = (arr) => {
    for(let i = 0; i < arr.length; i++){
       if(!hasNumber(arr[i])){
        return false
       }
    }
    return true;
}

console.log(checkPhonesArray(phonesArr))
console.log(checkPhonesArray(phonesArr2))
console.log(checkPhonesArray(phonesArr3))