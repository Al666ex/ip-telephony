import { hasNumber } from "./hasNumber";

export const checkPhonesArray  = (arr) => {
    for(let i = 0; i < arr.length; i++){
       if(!hasNumber(arr[i])){
        return false
       }
    }
    return true;
}