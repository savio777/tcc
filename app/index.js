const signalhub = require('signalhub')

const hub = signalhub('my-app', ['http://localhost:8080'])

const Block = require('../blockchain/block')
const Blockchain = require('../blockchain/blockchain')

const chain = new Blockchain()

hub.subscribe('chain').on('data', (data) => {
    chain.addBlock(new Block(new Date(), data.data, data.publicKey))

    document.getElementById('chain').textContent = JSON.stringify(chain, null, 2)

    document.getElementById('testChain').textContent = 'Corrente é válida: ' + chain.isValid()
})

document.getElementById('save').addEventListener('click', () => {
    const data = {
        data: document.getElementById('data').value,
        publicKey: document.getElementById('publicKey').value
    }

    hub.broadcast('chain', data)
})
