const signalhub = require('signalhub')

const hub = signalhub('my-app', ['http://localhost:8080'])

const EC = require('elliptic').ec
const ec = EC('secp256k1')

const Block = require('../blockchain/block')
const Blockchain = require('../blockchain/blockchain')

const chainCurrent = new Blockchain()

// SAVE INFORMATION

document.getElementById('save').addEventListener('click', () => {
  const data = {
    sellerPublicKey: document.getElementById('sellerPublicKey').value,
    sellerPrivateKey: document.getElementById('sellerPrivateKey').value,
    sellerCpf: document.getElementById('sellerCpf').value,
    sellerCrv: document.getElementById('sellerCrv').value,
    value: document.getElementById('value').value,
    purchaserPublicKey: document.getElementById('purchaserPublicKey').value,
    purchaserCpf: document.getElementById('purchaserCpf').value
  }
  hub.broadcast('chain', data)

  document.getElementById('sellerPublicKey').value = ''
  document.getElementById('sellerPrivateKey').value = ''
  document.getElementById('sellerCpf').value = ''
  document.getElementById('sellerCrv').value = ''
  document.getElementById('value').value = ''
  document.getElementById('purchaserPublicKey').value = ''
  document.getElementById('purchaserCpf').value = ''
})

const col = document.createElement('div')
col.setAttribute('class', 'col s12 m6')

document.body.appendChild(col)

hub.subscribe('chain').on('data', (data) => {
  // BLOCK CREATION

  const keyLoggedPrivate = ec.keyFromPrivate(data.sellerPrivateKey)
  const keyLoggedPublic = keyLoggedPrivate.getPublic('hex')

  if (
    (keyLoggedPublic === data.sellerPublicKey) &&
    (data.value && data.purchaserPublicKey && data.sellerCpf &&
      data.sellerCrv && data.purchaserCpf)
  ) {
    chainCurrent.addBlock(new Block(
      chainCurrent.chain.length,
      new Date(),
      {
        value: data.value,
        sellerPublicKey: data.sellerPublicKey,
        sellerCpf: data.sellerCpf,
        sellerCrv: data.sellerCrv,
        purchaserPublicKey: data.purchaserPublicKey,
        purchaserCpf: data.purchaserCpf
      }
    ))

    // ELEMENTS OF THE BLOCKS

    const container = document.createElement('div')
    container.setAttribute('class', 'container')

    const divider = document.createElement('div')
    divider.setAttribute('class', 'divider')

    const iconArrow = document.createElement('i')
    iconArrow.setAttribute('class', 'material-icons')
    iconArrow.innerText = 'arrow_downward'

    const iconEncrypt = document.createElement('i')
    iconEncrypt.setAttribute('class', 'material-icons')
    iconEncrypt.innerText = 'enhanced_encryption'

    const newBlock = document.createElement('div')
    newBlock.setAttribute('class', 'card purple darken-4')

    const contentBlock = document.createElement('div')
    contentBlock.setAttribute('class', 'card-content white-text')

    const hashTitle = document.createElement('span')
    hashTitle.setAttribute('class', 'card-title')
    hashTitle.appendChild(iconEncrypt)
    hashTitle.innerText =
      `#${chainCurrent.getLastBlock().index}: ${chainCurrent.getLastBlock().hash}`

    const previousHash = document.createElement('p')
    previousHash.innerText = `Chave anterior ${chainCurrent.getLastBlock().previousHash}`

    const sellerPublicKey = document.createElement('p')
    sellerPublicKey.innerText =
      `Chave Primária: ${chainCurrent.getLastBlock().data.sellerPublicKey}`

    const sellerCpf = document.createElement('p')
    sellerCpf.innerText = `Cpf do vendedor: ${chainCurrent.getLastBlock().data.sellerCpf}`

    const timestamp = document.createElement('p')
    timestamp.innerText = `Timestamp: ${chainCurrent.getLastBlock().timestamp}`

    const value = document.createElement('p')
    value.innerText = `Valor: ${chainCurrent.getLastBlock().data.value}`

    const sellerCrv = document.createElement('p')
    sellerCrv.innerText = `CRV do veículo: ${chainCurrent.getLastBlock().data.sellerCrv}`

    const purchaserPublicKey = document.createElement('p')
    purchaserPublicKey.innerText =
      `Chave do comprador: ${chainCurrent.getLastBlock().data.purchaserPublicKey}`

    const purchaserCpf = document.createElement('p')
    purchaserCpf.innerText =
      `Cpf do comprador: ${chainCurrent.getLastBlock().data.purchaserCpf}`

    contentBlock.appendChild(hashTitle)
    contentBlock.appendChild(divider)
    contentBlock.appendChild(previousHash)
    contentBlock.appendChild(sellerPublicKey)
    contentBlock.appendChild(sellerCpf)
    contentBlock.appendChild(timestamp)
    contentBlock.appendChild(value)
    contentBlock.appendChild(sellerCrv)
    contentBlock.appendChild(purchaserPublicKey)
    contentBlock.appendChild(purchaserCpf)
    newBlock.appendChild(contentBlock)
    col.appendChild(newBlock)
    container.appendChild(iconArrow)
    col.appendChild(container)

    document.getElementById('testChain').innerText =
      `Corrente é válida: ${chainCurrent.isValid()}`

    document.getElementById('testKey').innerText = (keyLoggedPublic === data.sellerPublicKey) ?
      `Chave é válida: ${true}` : `Chave é válida: ${false}`

    console.log(JSON.stringify(chainCurrent, null, 2))
  } else {
    alert('erro na autenticação ou campo em branco')
  }
})
