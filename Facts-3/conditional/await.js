let fs=require("fs");
(async function(){
let f1=await fs.promises.readFile("f1.html");
console.log("f1 is read");

if(f1.byteLength>20){
    let f2=await fs.promises.readFile("f2.html");
    console.log("f2 is read");
    if(f2.byteLength<20){
        let f5=await fs.promises.readFile("f5.mp4");
        console.log("f5 is read");
    
    }else{
        let f4=await fs.promises.readFile("f4.html");
        console.log("f4 is read");
    }
}else{
    let f3=await fs.promises.readFile("f3.html");
    console.log("f3 is read");
    if(f3.byteLength<20){
        let f4=await fs.promises.readFile("f4.html");
        console.log("f4 is read");
    
    }else{
        let f5=await fs.promises.readFile("f5.mp4");
        console.log("f5 is read");
    }
}
})()