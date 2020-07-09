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
        $("#New").on("click", function () {
            db = [];
            let rows = $("#grid").find(".row");
            for (let i = 0; i < rows.length; i++) {
                let row = [];
                let cRowCells = $(rows[i]).find(".cell");
                // row.push(cell);
                for (let j = 0; j < cRowCells.length; j++) {
                    //Db
                    let cell = {
                        value: "",
                        formula: "",
                        downstream:[],
                        upstream: []
                    }
                    row.push(cell);
                    $(cRowCells[j]).html("");
                }
                db.push(row);
            }
        });
        $("#grid .cell").on("blur", function () {
            // updated db
            // console.log(this);
            console.log("cell fn")
            // lsc = this;
            let { rowId, colId } = getRc(this);

            let cellObject = getCellObject(rowId, colId);
            
            if ($(this).html() == cellObject.value) {
                return;
            }
            if (cellObject.formula) {
                removeFormula(cellObject, rowId, colId);
            }
           // console.log(rowId+" "+ colId);
            
            cellObject.value = $(this).html();
            // updateCell=> update self // childrens(UI changes)
            updateCell(rowId, colId, $(this).html(), cellObject);
            // console.log(db);
        })
 
        $("#formula-container").on("blur", function () {
            // console.log("Formula fn")
            // console.log(this);
            // console.log(lsc);
            //   cell 
            let address = $("#address-container").val();
            
            // console.log(address);
            let { rowId, colId } = getRcFromAddress(address);
            // set formula
            let cellObject = getCellObject(rowId, colId);
            
            let formula = $(this).val();
            if (cellObject.formula == $(this).val()) {
                return;
            }

            if (cellObject.formula) {
                removeFormula(cellObject, rowId, colId)
            }
 //  console.log(formula);
            cellObject.formula = formula;
           // setUpFormula(rowId, colId, formula);
            let eValuatedVal = evaluate(cellObject);
            setUpFormula(rowId, colId, formula);
            updateCell(rowId, colId, eValuatedVal, cellObject);

            // evaluate
            // update cell
        })
        function setUpFormula(rowId, colId, formula) {
            // parent  downstream add
            let cellObject = getCellObject(rowId, colId);

            // ( A1 + A2 )
            //    ( A1 + A2 )
            let formulaComponent = formula.split(" ");
            // [(,A1,+,A2,)]

            for (let i = 0; i < formulaComponent.length; i++) {
                let code = formulaComponent[i].charCodeAt(0);

                if (code >= 65 && code <= 90) {

                    let parentRc = getRcFromAddress(formulaComponent[i]);
                    let fParent = db[parentRc.rowId][parentRc.colId];
                    console.log(fParent);
                    
                    // set yourself to your parent's downstream
                    fParent.downstream.push({
                        rowId, colId
                    })
                    // // evaluate 
                    // cellObject.upstream.push({
                    //     rowId: parentRc.rowId,
                    //     colId: parentRc.colId
                    // })

                }

            }
        }
        function evaluate(cellObject) {
            let formula = cellObject.formula;
            // ( A1 + A2 )
            let formulaComponent = formula.split(" ");
            // [( ,A1,+,A2,)]
            for (let i = 0; i < formulaComponent.length; i++) {
                let code = formulaComponent[i].charCodeAt(0);
                if (code >= 65 && code <= 90) {
                    let parentRc = getRcFromAddress(formulaComponent[i]);

                    let fParent = db[parentRc.rowId][parentRc.colId];
                    let value = fParent.value;
                    formula = formula.replace(formulaComponent[i], value)
                }

            }
            // ( 10 + 20 )
            console.log(formula);
            let ans = eval(formula);
            console.log(ans);
            return ans;

        }
        function updateCell(rowId, colId, val, cellObject) {
            // update yourself
            $(`#grid .cell[ri=${rowId}][ci=${colId}]`).html(val);
            cellObject.value = val;
            console.log(val);
            for (let i = 0; i < cellObject.downstream.length; i++) {
                let sdsorc = cellObject.downstream[i];
                let fdso = db[sdsorc.rowId][sdsorc.colId];
                let evaluatedValue = evaluate(fdso);
                updateCell(sdsorc.rowId, sdsorc.colId, evaluatedValue, fdso);
            }

        }
        function setUpFormula(rowId, colId, formula) {
            // parent  downstream add
            let cellObject = getCellObject(rowId, colId);
            // ( A1 + A2 )
            //    ( A1 + A2 )
            let formulaComponent = formula.split(" ");
            // [(,A1,+,A2,)]
            for (let i = 0; i < formulaComponent.length; i++) {
                let code = formulaComponent[i].charCodeAt(0);
                if (code >= 65 && code <= 90) {
                    let parentRc = getRcFromAddress(formulaComponent[i]);
                    let fParent = db[parentRc.rowId][parentRc.colId];
                    // set yourself to your parent's downstream
                    fParent.downstream.push({
                        rowId, colId
                    })

                    cellObject.upstream.push({
                        rowId: parentRc.rowId,
                        colId: parentRc.colId
                    })
                }
            }
        }
        function removeFormula(cellObject, rowId, colId) {
            // delete yourself from parents downstream

            for (let i = 0; i < cellObject.upstream.length; i++) {
                let suso = cellObject.upstream[i];
                let fuso = db[suso.rowId][suso.colId];
                let fds = fuso.downstream.filter(function (rc) {
                    return !(rc.rowId == rowId && rc.colId == colId)
                })
                fuso.downstream = fds;
            }
            cellObject.upstream = [];
            cellObject.formula = "";
            // upstream clear
            // formula clear
        }
        function getRcFromAddress(address) {
            let colId = address.charCodeAt(0) - 65;
            let rowId = Number(address.substring(1)) - 1;
            return { colId, rowId };

        }

        function getRc(elem) {
            let rowId = $(elem).attr("ri");
            let colId = $(elem).attr("ci");
            return {
                rowId,
                colId
            }
        }

        function getCellObject(rowId, colId) {
            return db[rowId][colId];
        }



        function init() {
            $("#File").trigger("click");
            $("#New").click();

        }
        init();

    });




