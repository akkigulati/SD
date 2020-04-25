let fs=require("fs");


fs.readFile("../f1.html",function(err,data){
    console.log(data.byteLength);
   if(data.byteLength>20){
    fs.readFile("../f2.html",function(err,data){
        console.log(data.byteLength);
       // if(data.byteLength>20)
       if(data.byteLength>40){
        fs.readFile("../f3.html",function(err,data){
            console.log(data.byteLength);
           // if(data.byteLength>20)
            
        })
       }
        
    })
   }else{
    fs.readFile("../f3.html",function(err,data){
        console.log(data.byteLength);
       // if(data.byteLength>20)
        
    })
   }
    
})



