// carregar modulo de criptografia que usa curva elíptica
const EC = require('elliptic').ec

// criando objeto e iniciando o construtor do gerador de curvas elípticas
const ec = EC('secp256k1')

// gerador de chaves
const key = ec.genKeyPair()

module.exports = class KeyGenerator{
    
    // gerador de chaves publicas 
    publickKey(){
        return key.getPublic('hex') 
    }


    // gerador de chaves privadas
    privateKey(){
        return key.getPrivate('hex')
    }

}


//console.log('chave publica: ' + publickKey + "\n")

//console.log('chave privada: ' + privateKey)