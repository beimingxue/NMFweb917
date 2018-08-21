/*
* @Author: TomChen
* @Date:   2018-07-21 09:35:42
* @Last Modified by:   TomChen
* @Last Modified time: 2018-07-21 09:39:33
*/
/*const buf = new Buffer('hello');
console.log(buf);*/

//const buf2 = Buffer.from('7468697320697320612074c3a97374','hex');
//console.log(buf2);
//console.log(buf2.toString());

/*const EventEmitter = require('events');
//console.log(EventEmitter);

class MyEmitter extends EventEmitter{
}
const myEmitter = new MyEmitter();
myEmitter.on('event',() => {
	console.log('an event occurred!');
});
myEmitter.emit('event');*/

/*const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('触发了一个事件！');
});
myEmitter.emit('event');*/

//
//定义
/*const EventEmitter = require('events');
class MyEmitter extends EventEmitter{
}

const myEmitter = new MyEmitter();
myEmitter.on('event', function(a, b) {
  console.log(a, b, this);
  // 打印:
  //   a b MyEmitter {
  //     domain: null,
  //     _events: { event: [Function] },
  //     _eventsCount: 1,
  //     _maxListeners: undefined }
});
myEmitter.emit('event', 'a', 'b');*/

//错误事件
/*const EventEmitter = require('events');
class MyEmitter extends EventEmitter{
};
const myEmitter = new MyEmitter();
myEmitter.on('error', (err) => {
  console.error('有错误');
});
myEmitter.emit('error', new Error('whoops!'));*/
// 打印: 有错误

//移除
const EventEmitter = require('events');
class MyEmitter extends EventEmitter{
};
const myEmitter = new MyEmitter();
myEmitter.once('newListener',() => {
   if (event === 'event') {
    // 在开头插入一个新的监听器
    myEmitter.on('event', () => {
      console.log('B');
    });
  };
});
myEmitter.on('event', () => {
  console.log('A');
});
myEmitter.emit('event');
// 打印:                                                                                                                                                                                                                                                                                                                                                           
//   B
//   A

