let fs=require("fs");


let fileReadPromise=fs.promises.readFile("f1.html");
fileReadPromise.then(function(data){
    if(data.byteLength<20){
        let fileReadPromise=fs.promises.readFile("f2.html");
        console.log("f2 file is read");
        
        fileReadPromise.then(function(data){
            if(data.byteLength<60){
                let fileReadPromise=fs.promises.readFile("f3.txt");
                console.log("f3 file is read");

            }else{
                let fileReadPromise=fs.promises.readFile("f5.mp4");
                console.log("f5 file is read");

            }
        
        })
    }else{
        let fileReadPromise=fs.promises.readFile("f5.mp4");
        console.log("f5 file is read");

        fileReadPromise.then(function(data){
            if(data.byteLength<80){
                let fileReadPromise=fs.promises.readFile("f2.html");
                console.log("f2 file is read");

                
            }else{
                let fileReadPromise=fs.promises.readFile("f1.html");
                console.log("f1 file is read");

            }
        
        })
    }

})