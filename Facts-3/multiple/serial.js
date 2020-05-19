let fs=require("fs");

(async function(){
    let f1=await fs.promises.readFile("f1.html","UTF-8");
    console.log("f1 is read..."+f1.length);
    let f2=await fs.promises.readFile("f2.html","UTF-8");
    console.log("f2 is read..."+f2.length);
    let f3=await fs.promises.readFile("f3.html","UTF-8");
    console.log("f3 is read..."+f3.length);
    
    
    
    })()