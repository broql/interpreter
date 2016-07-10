const Lexer = require('./../services/lexer.js')
var expect = require('chai').expect;

describe('Math lexer', () => {
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

    it('should throw error if element is not recognizable', () => {
        const tokenizeFn = () => { return Lexer.tokenize('&') }
        const errMesg = 'Unrecognized character: &'

        expect(tokenizeFn).to.throw(Error, errMesg);
    })

    it('should produce token list out of math statement', () => {

        const lexerOutput = [
            {
                'type': 'number',
                'value': '2'
            },
            {
                'type': 'operator',
                'value': '+'
            },
            {
                'type': 'number',
                'value': '2'
            }
        ];

        const tokens = Lexer.tokenize('2+2')

        expect(tokens).to.deep.equal(lexerOutput)
    });

    it('should merge adjacent tokens of the same type', () => {
        const token = Lexer.tokenize('425+2')
        const numberToken = [
            {
                'type': 'number',
                'value': '425'
            },
            {
                'type': 'operator',
                'value': '+'
            },
            {
                'type': 'number',
                'value': '2'
            }
        ]

        expect(token).to.deep.equal(numberToken)
    })
});