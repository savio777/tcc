const Block = require('./block.js')
const BlockChain = require('./blockchain.js')

const myPublicKey = '041f7a070fd14e239263ec90b6377e47ab78064ffdaad7bc7454465a76b3a5b6e537eeacfe7dcea371009e63eb757a5e82e22b19bd3b595a70085494de0bd880b2'

const corrente = new BlockChain()

const bloco1 = new Block(corrente.chain.length, new Date(),
    { valor: 1000000, myPublicKey: myPublicKey })

console.log('adicionando novo bloco...')
corrente.addBlock(bloco1)

// imprimir na tela em formato de JSON (null e 2 são parametros para o metodo stringfy) 
console.log('\n' + JSON.stringify(corrente, null, 2))
console.log('os dados são integros? ' + corrente.isValid())  // imprimir resposta do metodo validar

const bloco2 = new Block(corrente.chain.length, new Date(),
    { valor: 1, myPublicKey: myPublicKey })

console.log('adicionando novo bloco...')
corrente.addBlock(bloco2)

console.log('\n' + JSON.stringify(corrente, null, 2))
console.log('os dados são integros? ' + corrente.isValid())  // imprimir resposta do metodo validar

// forçar erro para testar validação
/*corrente.chain[1].data = {valor: 1110000000000000001}
corrente.chain[1].hash = corrente.chain[1].calculateHash()
console.log('\n\n')
console.log(JSON.stringify(corrente, null, 2))
console.log('os dados são integros? ' + corrente.isValid())*/
