let fs=require("fs");

function promiseMultiFile()
{
    let files=["f1.html","f2.html","f3.txt","f4.html","f5.mp4"]

    let file1WillBeReadPromise=fs.promises.readFile(files[0])
    
    for(let i=1;i<files.length;i++)
    {
        file1WillBeReadPromise=file1WillBeReadPromise.then(function(data)
        {
            console.log(`File no ${i} printed`)
            let nfp=fs.promises.readFile(files[i])
                return nfp;
        })
    }
    return file1WillBeReadPromise;
}


promiseMultiFile().then(function(data)
{     console.log("file no 5 printed")
    //console.log(data)
})