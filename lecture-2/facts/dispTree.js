var fs = require("fs");
var path = require("path");

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
displayTree(".\\src\\d10",str)