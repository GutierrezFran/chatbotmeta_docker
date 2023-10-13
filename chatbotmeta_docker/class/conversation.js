class conversation {

    constructor(){
      this.dataConversation = {}
    }  
    
    newConversation(userphone){
      if(!this.dataConversation[userphone]){
        this.dataConversation[userphone] = []
      }
    }
  
    addElement(userphone, element){
      if(this.dataConversation[userphone]){ 
        this.dataConversation[userphone].push(element)
      }
      /*
      else{
        console.warn('Advertencia: No es el mismo usuario: ', userphone)
      }*/
    }
    getDataConversation(userphone) {
      return this.dataConversation[userphone];
    }
    
    cleanObjectConversation(userphone){
      return this.dataConversation[userphone] = []
    }
  }
  
  
  module.exports = conversation;