const Block = require('./block.js')

module.exports = class BlockChain{

    // chain -> array que guardará os blocos formando a corrente
    constructor(){
        this.chain = [this.createGenesisBlock()]  // adicionar primeiro bloco a corrente
        this.difficulty = 2   // dificuldade para servir de exemplo
    }

    // função para retornar um novo bloco, o primeiro bloco deve ser inserido manualmente na corrente, 
    //  os outros serão automaticos
    createGenesisBlock(){
        return new Block(0, 0, 'genesis_block', '0', '0')
    }

    // função para retornar o ultimo bloco da corrente
    getLastBlock(){
        return this.chain[this.chain.length -1]
    }

    // função para adicionar bloco a corrente
    addBlock(newBlock){
        // referenciando hash do ultimo bloco a este bloco para fazer a ligação entre blocos
        newBlock.previousHash = this.getLastBlock().hash   
        newBlock.mineBlock(this.difficulty)  // adicionando bloco com dificuldade
        //newBlock.hash = newBlock.calculateHash()  // sem usar dificuldade, nonces
        this.chain.push(newBlock)  // adicionar o bloco ao array da corrente
    }

    // metodo para testar e validar blocos, para confirmar integridade dos dados
    isValid(){
        // percorrer toda a corrente
        for(let i=1; i<this.chain.length;i++){
            const currentBlock = this.chain[i]    // bloco atual
            const previousBlock = this.chain[i-1]  // bloco anterior
            
            // verificar se a hash do bloco atual não é igual ao calculo da hash atual
            if(currentBlock.hash!==currentBlock.calculateHash()){
                return false
            }

            // verificar se o valor da hash anterior guardado no bloco atual, é realmente
            // igual ao hash do bloco anterior, para verificar ligação entre blocos 
            if(currentBlock.previousHash!==previousBlock.hash){
                return false
            }
        }
        // se não cair nos testes, é verdade que os dados são verdadeiros
        return true
    }

}
