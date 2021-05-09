const {expect} = require('chai')
const Population = require('../test-doubles/FakePopulation')
const Decision = require('./Decision')

describe('Decision', function(){
    it('must return a conclusion', async function(){
        var decision = Decision({
            description: 'Which option do you prefer?',
            population: Population({
                size: 100,
                intentions: [
                    {intention: 'A', percentage: 90},
                    {intention: 'B', percentage: 10}
                ]
            })
        })

        var result = await decision.make()
        expect(result.conclusion).to.not.be.undefined
    })
})