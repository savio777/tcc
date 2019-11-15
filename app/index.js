const signalhub = require('signalhub')

const hub = signalhub('my-app', ['http://localhost:8080'])

const EC = require('elliptic').ec
const ec = EC('secp256k1')

const Block = require('../blockchain/block')
const Blockchain = require('../blockchain/blockchain')

const chainCurrent = new Blockchain()

const col = document.createElement('div')
col.setAttribute('class', 'col s12 m6 center')

document.body.appendChild(col)

hub.subscribe('chain').on('data', (data) => {
  const keyPrivate = document.getElementById('privateKey').value

  const keyLoggedPrivate = ec.keyFromPrivate(keyPrivate)

  const keyLoggedPublic = keyLoggedPrivate.getPublic('hex')

  if ((keyLoggedPublic === data.publicKey) && (data.description && data.address)) {
    chainCurrent.addBlock(new Block(
      chainCurrent.chain.length,
      new Date(),
      {
        description: data.description,
        address: data.address
      },
      data.publicKey
    ))

    const divider = document.createElement('div')
    divider.setAttribute('class', 'divider')

    const iconArrow = document.createElement('i')
    iconArrow.setAttribute('class', 'material-icons')

    iconArrow.innerText = 'arrow_downward'

    const newBlock = document.createElement('div')
    newBlock.setAttribute('class', 'card black white-text center')

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

    const adress = document.createElement('p')
    adress.innerText = `Chave da outra parte: ${chainCurrent.getLastBlock().data.address}`

    newBlock.appendChild(titleBlock)
    newBlock.appendChild(divider)
    newBlock.appendChild(hash)
    newBlock.appendChild(previousHash)
    newBlock.appendChild(publicKey)
    newBlock.appendChild(timestamp)
    newBlock.appendChild(adress)
    col.appendChild(newBlock)
    col.appendChild(iconArrow)

    document.getElementById('testChain').innerText =
      `Corrente é válida: ${chainCurrent.isValid()}`

    document.getElementById('testKey').innerText = (keyLoggedPublic === data.publicKey) ?
      `Chave é válida: ${true}` : `Chave é válida: ${false}`

    console.log(JSON.stringify(chainCurrent, null, 2))
  } else {
    alert('erro na autenticação ou campo em branco')
  }
})

document.getElementById('save').addEventListener('click', () => {
  const data = {
    description: document.getElementById('description').value,
    address: document.getElementById('address').value,
    publicKey: document.getElementById('publicKey').value
  }

  hub.broadcast('chain', data)
})
