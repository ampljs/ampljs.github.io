class Validator {
    static checkNodes(simulationDataObject, output){
        const nodes = simulationDataObject['graph']['nodes']
        let checkOk = true
        for (let n in nodes) output.search(removeUselessCharsInNodeName(n)) == -1 ? checkOk = false : true

        if(checkOk) console.log('Nodes gerados com sucesso.')
        else console.error('Os Nodes gerados não batem com a entrada')
    }

    static checkFlows(simulationDataObject, output){
        const flows = simulationDataObject['graph']['flows']
        let checkOk = true
        for (let f in flows) output.search(removeUselessCharsInNodeName(f, 'flow').replace('-', ', ')) == -1 ? checkOk = false : true

        if(checkOk) console.log('Flows gerados com sucesso.')
        else console.error('Os Flows gerados não batem com a entrada')
    }
}