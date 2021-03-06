const fs = require('fs');
const uuidv1 = require('uuid/v1');

const path = require('path');
// normalize 使正常化
const filePath = normalize(__dirname + './data/data.json');
 
let add = (options,callback)=>{
    fs.readFile(filePath,(err,data)=>{
        if(!err){
            let obj = JSON.parse(data);
            options.id = uuidv1();
            obj.push(options);
            let str = JSON.stringify(obj);
 
            fs.writeFile(filePath,str,(err)=>{
                if(!err){
                    callback(null,options);
                }else{
                    callback(err);
                }
            })
 
        }else{
            callback(err);
        }
    })
}
 
let get = (callback)=>{
    fs.readFile(filePath,(err,data)=>{
        if(!err){
            let obj = JSON.parse(data);
            callback(null,obj);
        }else{
            callback(err);
        }
    });
}
 
let remove = (id,callback)=>{
    fs.readFile(filePath,(err,data)=>{
        if(!err){
            let obj = JSON.parse(data);
            let newObj = obj.filter((val)=>{
                return val['id'] != id
            });
            let str = JSON.stringify(newObj);
            fs.writeFile(filePath,str,(err)=>{
                if(!err){
                    callback(null,newObj);
                }else{
                    callback(err);
                }
            })
         
        }else{
            callback(err);
        }
    });
}
 
module.exports = {
    get:get,
    add:add,
    remove:remove
}