//const stream = require('stream');
//console.log(stream);


const fs = require('fs');
//console.log(fs);
//let fd = fs.openSync('./001.txe');
fs.open('./001.txt', 'w',{flag:'a'} (err, fd) => {
   if(!err){
      //console.log('open success...');
       fs.write(fd,'kuaa',(err) => {
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
});



