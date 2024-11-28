export const replaceStr = (str : string) => {
    let person = str.toUpperCase()
    return person
        .replace(/T/g, '[TŢȚ]')
        .replace(/S/g, '[SŞȘ]')
        .replace(/I/g, '[IÎ]')
        .replace(/A/g, '[AĂÂ]');
} 