let viewFile=require("./commands/view")
let treefyFile=require("./commands/treefy")
let untreefyFile=require("./commands/untreefy")
let monitorFile=require("./commands/monitor")
let helpFile=require("./commands/help")

let cmd=process.argv[2];
if(cmd=="view")
{
  viewFile.view(process.argv[3],process.argv[4]);
    
}
else if(cmd=="treefy")
{
    treefyFile.treefy(process.argv[3],process.argv[4]);
    
}
else if(cmd=="untreefy")
{
    untreefyFile.untreefy(process.argv[3],process.argv[4]);
    
}
else if(cmd=="monitor")
{
    monitorFile.monitor(process.argv[3],process.argv[4]);
    
}
else if(cmd=="help")
{
    helpFile.help();
    
}
else
{
    console.log("PTA PUTA HAI NI CHALE CODE KRNE");
    
}