const Parser = require('./../services/parser.js')
const Lexer = require('./../services/lexer.js')
var expect = require('chai').expect;

describe('Parser', () => {

    it('should produce correct parse tree with one math operation', () => {
        const tokens = Lexer.tokenize('12+2')

        const parserOutput = {
            type: '+',
            left: { type: 'number', value: '12' },
            right: { type: 'number', value: '2' }
        }

        expect(Parser.process(tokens)).to.deep.equal(parserOutput)
    })


    it('should return left denotative when token is on the first position', () => {

        const tokens = Lexer.tokenize('12')

        const parserOutput = { type: 'number', value: '12' }

        expect(Parser.process(tokens)).to.deep.equal(parserOutput)
    })

    xit('should throw an error if operator token is the last token', () => {
        const tokens = [
            {
                'type': 'operator',
                'value': '+'
            }
        ]

        const parseFn = () => { return Parser.process(tokens) }
        const errMesg = 'Unexpected end of input: ' + tokens[0].value

        expect(parseFn).to.throw(Error, errMesg);
    })

    it('should produce correct parse tree with many math operations', () => {
        const tokens = Lexer.tokenize('12+2-4')

        const parserOutput = {
            type: '+',
            left: { type: 'number', value: '12' },
            right: {
                type: '-',
                left: { type: 'number', value: '2' },
                right: { type: 'number', value: '4' }
            }
        }

        expect(Parser.process(tokens)).to.deep.equal(parserOutput)
    })

    it('12/4+6, should produce correct parse tree with operator precedence', () => {
        const tokens = Lexer.tokenize('12/4+6')

        const parserOutput = {
            type: '+',
            left: {
                type: '/',
                left: { type: 'number', value: '12' },
                right: { type: 'number', value: '4' }
            },
            right: { type: 'number', value: '6' }
        }

        // console.log(Parser.process(tokens))

        expect(Parser.process(tokens)).to.deep.equal(parserOutput)
    })

    xit('12+4/6, should produce correct parse tree with operator precedence part 2', () => {
        const tokens = Lexer.tokenize('12+4/6')

        const parserOutput = {
            type: '+',
            left: { type: 'number', value: '12' },
            right: {
                type: '/',
                left: { type: 'number', value: '4' },
                right: { type: 'number', value: '6' }
            }
        }

        expect(Parser.process(tokens)).to.deep.equal(parserOutput)
    })
})