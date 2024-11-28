export function roleSearch(arr,role){
    const result = arr.find(({value}) => value === role)
    return result ? result : null 
}