// carregar modulo de criptografia que usa curva elíptica
const EC = require('elliptic').ec

// criando objeto e iniciando o construtor do gerador de curvas elípticas
const ec = EC('secp256k1')

// gerador de chaves
const key = ec.genKeyPair()

console.log('chave publica: ' + key.getPublic('hex') + "\n")

console.log('chave privada: ' + key.getPrivate('hex'))