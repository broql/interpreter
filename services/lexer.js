const _ = require('lodash')

const isDigit = (char) => { return /[0-9]/.test(char) }
const isWhiteSpace = (char) => { return /\s/.test(char) }
const isOperator = (char) => { return /[+\-*\/\^%=(),]/.test(char) }

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

const notRecognizedError = (char) => {
    throw Error('Unrecognized character: ' + char)
}

const recognize = (char) => {
    const type = types.find(entry => {
        return entry.comparator(char)
    })
    return type ? type.name : notRecognizedError(char)
}

const createTokens = (char) => {
    const recognizedToken = recognize(char);
    return {
        type: recognizedToken,
        value: char
    }
}

const isSameType = (prevToken, token) => {
    return (prevToken.type === token.type)
}

const addSameType = (prevToken, token) => {
    return prevToken.value + token.value
}

const mergeSameType = (tokens) => {
    let mergedTokens = [];
    tokens.forEach((token) => {
        let prevToken = _.last(mergedTokens) || {};
        if (isSameType(prevToken, token)) {
            prevToken.value = addSameType(prevToken, token)
        }
        else {
            mergedTokens.push(token)
        }
    });
    return mergedTokens
}

const tokenize = (source) => {
    const tokens = [...source].map(createTokens)
    const sameTypeTokensMerged = mergeSameType(tokens)
    return sameTypeTokensMerged;
}

module.exports = {
    tokenize
}