const Lexer = require('./../services/lexer.js')
var expect = require('chai').expect;

describe('Lexer', () => {
    // it('should produce token list out of math statement', () => {

    //     const lexerOutput = [
    //         ['operator', '('],
    //         ['number', 12],
    //         ['operator', '+'],
    //         ['number', 4],
    //         ['operator', ')'],
    //         ['operator', '/'],
    //         ['number', 6]
    //     ];

    //     expect('(12 + 4) / 6').to.equal(lexerOutput)
    // });

    it('should recognize and produce number token', () => {
        const token = Lexer.tokenize('4')
        const numberToken = [
            {
                'type': 'number',
                'value': '4'
            }
        ]
        expect(token).to.deep.equal(numberToken)
    })

    it('should recognize and produce operator token', () => {
        const token = Lexer.tokenize('+')
        const numberToken = [
            {
                'type': 'operator',
                'value': '+'
            }
        ]
        expect(token).to.deep.equal(numberToken)
    })

    it('should recognize and produce whitespace token', () => {
        const token = Lexer.tokenize(' ')
        const numberToken = [
            {
                'type': 'whitespace',
                'value': ' '
            }
        ]
        expect(token).to.deep.equal(numberToken)
    })
});