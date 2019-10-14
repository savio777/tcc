// carregar modulo de criptografia que usa curva elíptica
const EC = require('elliptic').ec

// criando objeto e iniciando o construtor do gerador de curvas elípticas
const ec = EC('secp256k1')

// gerador de chaves
const key = ec.genKeyPair()

const keyPublic = key.getPublic('hex')

const keyPrivate = key.getPrivate('hex')

console.log(`chave pública~> ${keyPublic}`)
console.log(`chave privada~> ${keyPrivate}\n`)

const keyLoggedPrivate = ec.keyFromPrivate(keyPrivate)

const keyLoggedPublic = keyLoggedPrivate.getPublic('hex')

console.log(`chave pública logada~> ${keyLoggedPublic}`)

console.log((keyLoggedPublic === keyPublic) ? true : false)
