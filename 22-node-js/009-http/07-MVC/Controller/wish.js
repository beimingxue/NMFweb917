//控制器 将用户输入的指令传递给model模型   （人机交互）
class Wish{
   index(/*req,res,...args*/){
      console.log('wish index...');
      /*console.log(args);
      res.end('ok');*/
   }
}

module.exports = new Wish();