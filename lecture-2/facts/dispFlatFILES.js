var fs = require("fs");
var path = require("path");

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
displayFlat(".\\src\\d10")
