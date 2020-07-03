const $ = require('jquery');
const dialog = require('electron').remote.dialog;
let fs = require("fs");
let db;
$(document).ready(
    function () {
        $("#grid .cell").on("click", function () {
            let rid = Number($(this).attr("ri"));
            let cid = Number($(this).attr("ci"));
            let ciAdrr = String.fromCharCode(cid + 65);
            $("#address-container").val(ciAdrr + (rid + 1));
        })
        $(".menu-item").on("click", function () {
            $(".menu-options-item").removeClass("selected");
            let id = $(this).attr("id");
            $(`#${id}-options`).addClass("selected");
        })
        $("#New").on("click", function () {
            db = [];
            let rows = $("#grid").find(".row");
            for (let i = 0; i < rows.length; i++) {
                let row = [];
                let cRowCells = $(rows[i]).find(".cell");
                // row.push(cell);
                for (let j = 0; j < cRowCells.length; j++) {
                    //Db
                    let cell = false;
                    row.push(cell);
                    $(cRowCells[j]).html("false");
                }
                db.push(row);
            }
        });
        $("#grid .cell").on("keyup", function () {
            //updated db
            //  console.log(db);
            let rid = ($(this).attr("ri"));
            let cid = ($(this).attr("ci"));
            db[rid][cid] = $(this).html();
            console.log(db);

        })
        $("#Save").on("click", async function () {
            let sdb = await dialog.showOpenDialog();
            let jsonData = JSON.stringify(db);
            fs.writeFileSync(sdb.filePaths[0], jsonData);
        })
        // JS  alternative to show dialogBox
        let fileSaver = document.querySelector("#File-saver");
        fileSaver.addEventListener("change", function () {
            let fpath = fileSaver.files[0].path;
            let jsonData = JSON.stringify(db);
            fs.writeFileSync(fpath, jsonData);
            console.log("written file to disk");
        })
        // Open
        $("#Open").on("click", async function () {
            let odb = await dialog.showOpenDialog();
            let fp = odb.filePaths[0];
            let content = fs.readFileSync(fp);
            db = JSON.parse(content);
            // loop 
            let rows = $("#grid").find(".row");
            for (let i = 0; i < rows.length; i++) {
                let cRowCells = $(rows[i]).find(".cell");
                for (let j = 0; j < cRowCells.length; j++) {
                    // DB  
                    $(cRowCells[j]).html(db[i][j]);
                }
            }
        })
        function init() {
            $("#File").trigger("click");
            $("#New").click();

        }
        init();

    });




