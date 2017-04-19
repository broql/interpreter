var fp = require('lodash/fp');

const isLastToken = (tokens, position) => {
    return (tokens.length === 1 || tokens.length === position + 1)
};

const unexpectedEndOfInputError = (token) => {
    throw Error('Unexpected end of input: ' + token)
}

const setLeaf = (tokens) => {

    const lValue = tokens.next()
    const tValue = tokens.next()

    if (tValue.done) {
        return lValue.value
    }

    const tValueExist = {
        type: tValue.value.value,
        left: lValue.value,
        right: setLeaf(tokens)
    }

    const tValueDoesNotExist = lValue

    return tValue ? tValueExist : tValueDoesNotExist
}

const process = (tokens) => {

    let parseTree = {}
    const tokenIterator = tokens[Symbol.iterator]();

    parseTree = setLeaf(tokenIterator)
    return parseTree
}

module.exports = {
    process
}