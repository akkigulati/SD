let fs=require("fs");
let path=["../f1.html","../f2.html"]

readFF(0);
function readFF(i){
if(i==path.length)
return;
fs.readFile(path[i],'UTF-8',function(err,data){
    console.log(`file${i}:${data}`);
    
})
readFF(i+1);
}