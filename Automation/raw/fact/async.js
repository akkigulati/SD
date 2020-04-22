let fs=require("fs");
console.log("before");
console.log("start");


fs.readFile("f1.html",function(err,content)
{
    if(err)
    {console.log(err);
    }
    else{
        console.log(content+"");
    }
    console.log("finish");

})
//let content =fs.readFileSync("f1.html");

console.log("after");