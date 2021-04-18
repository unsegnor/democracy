const {expect} = require('chai')
const Population = require('../test-doubles/FakePopulation')
const Decision = require('./Decision')

describe('Decision', function(){
    it('must guess the option of the majority when there are two options with an error of 0.00001%', async function(){
        var badConclusions = 0
        for(var i=0; i<10000000; i++){
            var decision = Decision({
                description: 'Which option do you prefer?',
                population: Population({
                    size: 1000,
                    intentions: [
                        {intention: 'A', percentage: 90},
                        {intention: 'B', percentage: 10}
                    ]
                })
            })
    
            var result = await decision.make()
            if (result.conclusion != 'A') badConclusions++
        }

        expect(badConclusions).to.be.lessThanOrEqual(1)
    })
})