const {expect} = require('chai')
const Population = require('../test-doubles/FakePopulation')
const Decision = require('../domain/Decision')

describe('Decision', function(){
    it('must guess the option of the majority when there are two options with an error of 0.00001%', async function(){
        var badConclusions = 0
        for(var i=0; i<100; i++){
            var decision = Decision({
                description: 'Which option do you prefer?',
                population: Population({
                    size: 1000,
                    intentions: [
                        {intention: `Option${i}`, percentage: 90},
                        {intention: `Option${i+1}`, percentage: 10}
                    ]
                })
            })
    
            var result = await decision.make()
            if (result.conclusion != `Option${i}`) badConclusions++
        }

        expect(badConclusions).to.be.lessThanOrEqual(1)
    })
})