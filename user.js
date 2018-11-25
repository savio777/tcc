module.exports = class User{
    
    constructor(id, publicKey){
        this.id = id
        this.publicKey = publicKey
    }

    getId(){
        return this.id
    }

    getPublicKey(){
        return this.publicKey
    }

}