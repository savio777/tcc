const signalhub = require('signalhub')

const hub = signalhub('my-app', ['http://localhost:8080'])

const Block = require('../blockchain/block')
const Blockchain = require('../blockchain/blockchain')

const chain = new Blockchain()

hub.subscribe('update').on('data', (data) => {
    document.getElementById('chain').textContent = data

})

document.getElementById('save').addEventListener('click', () => {
    const publicKey = document.getElementById('publicKey').value

    chain.addBlock(new Block(new Date(), document.getElementById('data').value, publicKey))

    hub.broadcast('update', JSON.stringify(chain, null, 2))
})
