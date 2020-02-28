var fs=require("fs")
var path=require("path")
var uniqid=require("uniqid")

module.exports.untreefy=function(){
    console.log("UNTREEFY COMMAND CALLED");
    let src=arguments[0];
    let dest=arguments[1];
    let root={};
    untreefy(src,dest,root);
    console.log("FILES COPIED TO "+ dest);
    console.log(root);
    fs.writeFileSync(path.join(dest,"metadata.json"),JSON.stringify(root))
    
}
function untreefy(src,dest,node){
if(fs.lstatSync(src).isDirectory())
{   
    node.isFile=false;
    node.name=path.basename(src);
    node.children=[];
    let childrens=fs.readdirSync(src);
for(let i=0;i<childrens.length;i++)
{  let childObj={};
    untreefy(path.join(src,childrens[i]),dest,childObj);
    node.children.push(childObj);
}
}
else{
    
    let uniqidN=uniqid();
    node.isFile=true;
    node.name=path.basename(src);
    let uniqueName=uniqidN;
    node.newName=uniqueName;
    fs.copyFileSync(src,path.join(dest,uniqidN));
}
}

