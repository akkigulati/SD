let fs=require("fs");
//let f2=fs.promises.readFile("f2.html");
function promisify(path){
    let fillbeingreadPromise=new Promise(function(resolve,reject){
        fs.readFile(path,function(err,data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
    return fillbeingreadPromise
}

let Filewillbepromised=promisify("f2.html");
console.log(Filewillbepromised);
Filewillbepromised.then(function(data){
    console.log(data.length);
    
})
Filewillbepromised.catch(function(err){
    console.log(err);
    
})