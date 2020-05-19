let fs=require("fs");

(async function(){
    let files=["f1.html","f2.html","f3.html"]
    for(let i=0;i<files.length;i++){
     let n= await fs.promises.readFile(files[i],"UTF-8");
    console.log(`f${i+1} is read...`+n.length);}
    })()