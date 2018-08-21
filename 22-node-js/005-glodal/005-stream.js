//const stream = require('stream');
//console.log(stream);


//---类---Writable
/*const writable = require('stream').Writable;
//console.log(writable);

class MyWritable extends writable{
}*/
//const myWritable = new MyWritable();
/*myWritable.on('writable',() => {
	console.log('aaa');
});*/

// 写入 'hello, ' ，并用 'world!' 来结束写入。
/*const fs = require('fs');
const file = fs.createWriteStream('example.txt');
file.write('hello, ');
file.end('world!');*/
// 后面不允许再写入数据！

/*const writer = getWritableStreamSomehow();
for (let i = 0; i < 100; i++) {
  writer.write(`你好，#${i}!\n`);
}
writer.end('这是结尾\n');
writer.on('finish', () => {
  console.error('所有写入已完成。');
});
*/
const { PassThrough, Writable } = require('stream');
const pass = new PassThrough();
const writable = new Writable();

//pass.pipe(writable);
//pass.unpipe(writable);
// readableFlowing 现在为 false。

//pass.on('data', (chunk) => { console.log(chunk.toString()); });
//pass.write('ok'); // 不会触发 'data' 事件。
//pass.resume(); // 必须调用它才会触发 'data' 事件。
/*class Myreadable extends e{
}*/

const readable = getReadableStreamSomehow();
