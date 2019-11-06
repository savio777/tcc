// carregar modulo da criptografia sha-256
const SHA256 = require('crypto-js/sha256')

module.exports = class Block {

    // index -> local do bloco na corrente
    // timestamp -> quando o bloco foi criado
    // data -> tipo de dados do bloco 
    // previousHash -> guardar hash anterior a esse bloco, para fazer a ligaçõa entre os blocos 
    // hash -> guardar hash desse bloco
    // nonce -> quantidade de zeros no inicio da hash que gera a dificuldade
    // publicKey -> possibilitar o compartilhamento das informações do bloco com segurança 
    constructor(id, timestamp, data, publicKey) {
	this.index = id
        this.timestamp = timestamp
        this.data = data
        this.previousHash = ''
        this.hash = this.calculateHash()
        this.nonce = 0
        this.publicKey = publicKey
    }

    // função para retornar calculo da hash desse bloco, utilizando sha-256, para validação dos dados
    calculateHash() {
        return SHA256(this.previousHash + this.timestamp
            + JSON.stringify(this.data) + this.nonce).toString()
    }

    //  difficulty -> as hash devem começar com varios zeros, dificultando a geração de novas hash,
    //  aumentando o tempo de processamento para geração das hash, quanto mais blocos mais dificil serpa
    //  e mais demorado
    mineBlock(difficulty) {
        // enquanto não tiver a quantidade de zeros suficientes no começo da hash, continua
        // calculando o hash
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++
            this.hash = this.calculateHash()
        }

        console.log('hash: ' + this.hash)
    }

}
