const isDigit = (char) => { return /[0-9]/.test(char); }
const isWhiteSpace = (char) => { return /\s/.test(char); }
const isOperator = (char) => { return /[+\-*\/\^%=(),]/.test(char); }

const types = [
    {
        name: 'number',
        comparator: isDigit
    },
    {
        name: 'whitespace',
        comparator: isWhiteSpace
    },
    {
        name: 'operator',
        comparator: isOperator
    }
]

const recognize = (char) => {

    const type = types.find(entry => {
        return entry.comparator(char)
    })

    return type ? type.name : 'NotRecognized'
}

const tokenize = (input) => {
    const inputArr = Array.prototype.slice.call(input);

    const tokens = inputArr.map(char => {
        return {
            type: recognize(char),
            value: char
        }
    })

    return tokens;
}

module.exports = {
    tokenize
}