export default function pathify(str: string, prefix: string = '') {
    let newStr = prefix
    let currStr = str.replace('//', '/').toLowerCase()

    if (currStr.length >= prefix.length && currStr.substring(0, prefix.length) === prefix) {
        currStr = currStr.replace(prefix, '')
    }

    newStr += currStr.replace('//', '/').toLowerCase();

    return newStr
}


