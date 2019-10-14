const signalhub = require('signalhub')

const hub = signalhub('my-app', ['http://localhost:8080'])

const EC = require('elliptic').ec
const ec = EC('secp256k1')

const Block = require('../blockchain/block')
const Blockchain = require('../blockchain/blockchain')

const chain = new Blockchain()

hub.subscribe('chain').on('data', (data) => {
  const keyPrivate = document.getElementById('privateKey').value

  const keyLoggedPrivate = ec.keyFromPrivate(keyPrivate)

  const keyLoggedPublic = keyLoggedPrivate.getPublic('hex')

  if (keyLoggedPublic === data.publicKey) {
    chain.addBlock(new Block(
      new Date(),
      {
        description: data.description,
        address: data.address,
        amount: data.amount
      }
      , data.publicKey
    ))

    document.getElementById('chain').textContent = JSON.stringify(chain, null, 2)

    document.getElementById('testChain').textContent = 'Corrente é válida: ' + chain.isValid()

    console.log(chain)
  }

  document.getElementById('testKey').textContent = (keyLoggedPublic === data.publicKey) ?
    `Chave é válida: ${true}` : `Chave é válida: ${false}`
})

document.getElementById('save').addEventListener('click', () => {
  const data = {
    description: document.getElementById('description').value,
    address: document.getElementById('address').value,
    amount: document.getElementById('amount').value,
    publicKey: document.getElementById('publicKey').value
  }

  hub.broadcast('chain', data)
})
