var fs = require("fs");
var path = require("path");

module.exports.view=function(){
    console.log("VIEW COMMAND CALLED");
    let src=arguments[0];
    let mode=arguments[1];
    if(mode=="-t"){
        displayTree(src,str);
    }else if(mode=='-f')
    {
        
       displayFlat(src);
    }
    else{
        console.log("wrong mode");
        
    }
    
}
function displayTree(src,str) {
    if (fs.lstatSync(src).isDirectory()) {
      
      //console.log("DIRECTORY");
      const testFolder = src;
      console.log(str+path.basename( src ) );
      str+="-";
  
      let childrens=fs.readdirSync(testFolder);
      for(let i=0;i<childrens.length;i++){
        displayTree(path.join(src,childrens[i]),str);     
      }   
    }
    else {
      str+="-";
  
      console.log(str+path.basename( src ) );
  
    }
  }
  let str=" "
  

  function displayFlat(src) {
    if (fs.lstatSync(src).isDirectory()) {
      console.log()
      //console.log("DIRECTORY");
      const testFolder = src;
      console.log(src);
      
      let childrens=fs.readdirSync(testFolder);
      for(let i=0;i<childrens.length;i++){
        displayFlat(path.join(src,childrens[i]));     
      }   
    }
    else {
      console.log(src);
  
  
    }
  }
  