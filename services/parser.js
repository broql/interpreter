var fp = require('lodash/fp');

// const isLastToken = (tokens, position) => {
//     return (tokens.length === 1 || tokens.length === position + 1)
// };

// const unexpectedEndOfInputError = (token) => {
//     throw Error('Unexpected end of input: ' + token)
// }

const operatorPrecedence = {
    '*': 1,
    '/': 1,
    '+': 0,
    '-': 0
}

const setLeaf = (tokenIterator, tokens, tokensIndex) => {

    const symbol = tokenIterator.next()
    const type = tokenIterator.next()

    tokensIndex += 2

    if (type.done) {
        return symbol.value
    }

    let typeExist = {};

    const nextType = tokens[tokensIndex + 1] ? operatorPrecedence[tokens[tokensIndex + 1].value] : 0
    // console.log(tokens[tokensIndex + 1], operatorPrecedence[tokens[tokensIndex + 1].value], nextType, operatorPrecedence[type.value.value])
    if (tokens[tokensIndex + 1] && nextType < operatorPrecedence[type.value.value]) {
        typeExist = {
            type: tokens[tokensIndex + 1].value,
            left: setLeaf(tokenIterator, tokens, tokensIndex),
            right: symbol.value
        }
    }
    else {
        typeExist = {
            type: type.value.value,
            left: symbol.value,
            right: setLeaf(tokenIterator, tokens, tokensIndex)
        }
    }

    const typeDoesNotExist = symbol

    return type ? typeExist : typeDoesNotExist
}

const process = (tokens) => {

    let parseTree = {}
    const tokenIterator = tokens[Symbol.iterator]()
    const tokensIndex = 0

    parseTree = setLeaf(tokenIterator, tokens, tokensIndex)

    console.log(parseTree)
    return parseTree
}

module.exports = {
    process
}