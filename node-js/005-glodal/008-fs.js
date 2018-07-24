/*const fs = require('fs');
//console.log(fs);
//let fd = fs.openSync('./001.txe');
fs.open('001.txt', 'r', (err, fd) => {
   if(!err){
       //console.log('success...');
       fs.write(fd,'bbbb',(err) => {
       	 if(err){
       	 	console.log('read success....');
       	 	fs.close(fd,(err) => {
               if(!err){
               	  console.log('close success');
               }else{
               	   console.log('close failed');
               }
       	 	})
       	 }else{
       	 	console.log('read failed....')
       	 }
       })
   }else{
   	 console.log('open failed...');
   }
});*/
const fs = require('fs');
/*fs.writeFile('./001.txt','abcA',(err) => {
  if(!err){
     console.log('write success...');
  }else{
     console.log('write fail...');
  }
});
fs.readFile('./001.txt',(err,data) => {
  if(!err){
     console.log('read success',data);
  }else{
     console.log('read fail',data);
  }
})*/
let path = '<文件名>';
let options = {
  encoding: 'utf8',
  end:3
};
const ws = fs.createWriteStream(path);
const rs = fs.createReadStream(path);
//console.log(ws);
//console.log(rs);
rs.on('error',(err) => {
    console.log('发生异常:',err);
});
rs.on('open',(fd) => {
   console.log('文件已打开:',fd);
})





