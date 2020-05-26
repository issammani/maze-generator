class Stack{

    constructor(){
        this.stack = [];
    }

    push(element){
        this.stack.unshift(element);
    }

    pop(){
        if(this.stack.length > 0){
            return this.stack.shift();
        }
    }

    peek(){
        if(this.stack.length > 0){
            return this.stack[0];
        }
    }

    size(){
        return this.stack.length;
    }

    isEmpty(){
        return this.stack.length === 0;
    }
}