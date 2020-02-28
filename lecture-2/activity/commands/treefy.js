let path = require("path")
let fs = require("fs")
module.exports.treefy = function () {
    console.log("TREEFY COMMAND CALLED");
    let src = arguments[0];
    let dest = arguments[1];
    var json = require(path.join(src, "metadata.json"));
    treefyF(src, dest, json)

}

function treefyF(src, dest, root) {
    if (root.isFile == true) {
        //it's a file
        oldf=path.join(src,root.newName)
        newn=path.join(dest,root.name)
        fs.copyFileSync(oldf,newn)
        
    } else {
        let dir = path.join(dest, root.name);
      //  console.log(dir);
        
        fs.mkdirSync(dir);

        for (var i = 0; i < root.children.length; i++) {
            treefyF(src, dir, root.children[i]);

        }
    }
}