const { expect } = require("chai")
const Generator = require('./PopulationGenerator')

describe('PopulationGenerator', function(){
    let generator

    beforeEach(function(){
        generator = Generator()
    })

    it('must create a population with 50% of the members voting one option and 50% other option', async function(){
        var population = await generator.generate({
            size: '10',
            intentions: [
                {intention: 'A', percentage: '50'},
                {intention: 'B', percentage: '50'}
            ]
        })

        var intentionA = 0
        var intentionB = 0
        var size = await population.getSize()
        for(var i=0; i<size; i++){
            var intention = await population.askIntentionTo(i)
            if(intention === 'A') intentionA++
            if(intention === 'B') intentionB++
        }

        expect(intentionA).to.equal(5)
        expect(intentionB).to.equal(5)
    })
})