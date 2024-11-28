export function searchForMatches(arr) {
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
 