//const stream = require('stream');
//console.log(stream);


//---类---Writable
/*const writable = require('stream').Writable;
//console.log(writable);

class MyWritable extends writable{
}
let start = 
           end
           tmp
           buf
           //this.emit('data',buf);
           //restLength -= this.offsetLength;
*/

const EventEmitter = require('events');
console.log(EventEmitter);
class LikeReadableStream extends EventEmitter{
	constructor(data,offsetLength){
		//在ES6中，在子类的constructor中必须先调用super才能引用this
        super(); //super代表父类的构造函数 但是super内部的this指向LikeReadableStream
        this.data = data;
        this.offsetLength = offsetLength;
        this.on('newListener',function(){
           
        })
	};
	_dispatch(){
        let tatalLength = this.data.length;
        let.restLength = 

        while(restLength > 0){
           
        }
        this.emit('end');
	}
}

let data = 'aaaaabbbbb';
const rs = new LikeReadableStream();
console.log(rs);
rs.on('data',(chuck) => {
	console.log(chuck);
})
rs.on('end',() =>{
	console.log('end...');
})