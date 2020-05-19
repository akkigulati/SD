let fs=require("fs");

(async function(){
    let files=["f1.html","f2.html","f3.html"]
   // let parallel=[];
    for(let i=0;i<files.length;i++){
         let fileRead=readFil(files[i]);  
        }
    })()
    
    async function readFil(f){
        let fp= fs.promises.readFile(f,"utf8");
        console.log(await fp);
        
    }