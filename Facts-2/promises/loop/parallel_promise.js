let fs=require("fs");

function promiseMultiFile()
{
    let files=["f1.html","f2.html","f3.txt","f4.html","f5.mp4"]

    let file1WillBeReadPromise=fs.promises.readFile(files[0])
    
    for(let i=0;i<files.length;)
    {
       let nsp=fs.promises.readFile(files[i++])
       nsp.then(function(data)
       {
           console.log(`Data ${i}`)
       }) 
       nsp.catch(function(err)
       {
           console.log(err)
       })
    }
    return file1WillBeReadPromise;
}


promiseMultiFile()