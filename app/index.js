const signalhub = require('signalhub')

const hub = signalhub('my-app', ['http://localhost:8080'])

const EC = require('elliptic').ec
const ec = EC('secp256k1')

const Block = require('../blockchain/block')
const Blockchain = require('../blockchain/blockchain')

const chainCurrent = new Blockchain()

const col = document.createElement('div')
col.setAttribute('class', 'col s12 m6')

document.body.appendChild(col)

hub.subscribe('chain').on('data', (data) => {
  const keyPrivate = document.getElementById('privateKey').value

  const keyLoggedPrivate = ec.keyFromPrivate(keyPrivate)

  const keyLoggedPublic = keyLoggedPrivate.getPublic('hex')

  if (keyLoggedPublic === data.publicKey) {
    chainCurrent.addBlock(new Block(
      chainCurrent.chain.length,
      new Date(),
      {
        description: data.description,
        address: data.address,
        amount: data.amount
      },
      data.publicKey
    ))

    const iconArrow = document.createElement('i')
    iconArrow.setAttribute('class', 'material-icons')

    iconArrow.innerText = 'arrow_downward'

    const newBlock = document.createElement('div')
    newBlock.setAttribute('class', 'card blue-grey darken-1 white-text')

    const titleBlock = document.createElement('span')
    titleBlock.setAttribute('class', 'card-title')
    titleBlock.innerText = `Descrição: ${chainCurrent.getLastBlock().data.description}`

    const hash = document.createElement('p')
    hash.innerText = `Hash atual: ${chainCurrent.getLastBlock().hash}`

    const previousHash = document.createElement('p')
    previousHash.innerText = `Chave anterior ${chainCurrent.getLastBlock().previousHash}`

    const publicKey = document.createElement('p')
    publicKey.innerText = `Chave Primária: ${chainCurrent.getLastBlock().publicKey}`

    const timestamp = document.createElement('p')
    timestamp.innerText = `Timestamp: ${chainCurrent.getLastBlock().timestamp}`

    newBlock.appendChild(titleBlock)
    newBlock.appendChild(hash)
    newBlock.appendChild(previousHash)
    newBlock.appendChild(publicKey)
    newBlock.appendChild(timestamp)


    if (chainCurrent.getLastBlock().data.description) {
      const adress = document.createElement('p')
      adress.innerText = `Chave do Recebedor: ${chainCurrent.getLastBlock().data.address}`

      const amount = document.createElement('p')
      amount.innerText = `Valor: ${chainCurrent.getLastBlock().data.amount}`

      newBlock.appendChild(adress)
      newBlock.appendChild(amount)
    }

    col.appendChild(newBlock)
    col.appendChild(iconArrow)

    document.getElementById('testChain').innerText =
      `Corrente é válida: ${chainCurrent.isValid()}`

    document.getElementById('testKey').innerText = (keyLoggedPublic === data.publicKey) ?
      `Chave é válida: ${true}` : `Chave é válida: ${false}`

    console.log(chainCurrent)
  }
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
