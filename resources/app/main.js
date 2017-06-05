const electron = require('electron');
const fs = require('fs');
const app = electron.app
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const chaptersList = require('./public/json/index.json');
if (typeof require !== 'undefined') XLSX = require('xlsx');
// Excel conversion
var convertExcel = function (path) {
    var workbook = XLSX.readFile(path);
    var worksheet = workbook.Sheets[workbook.SheetNames[8]];
    var newDoc = {
        title: "Nuevo Documento"
        , total: 0
        , data: []
    };
    var chaptersObj = [];
    for (var i = 0; i < chaptersList.length - 1; i++) {
        var cell = worksheet['C' + chaptersList[i].id];
        var value = (cell ? cell.v : undefined);
        chaptersObj[i] = {
            chapter: value
            , subchapters: []
        };
        for (var j = 0; j < chaptersList[i].subchapters.length - 1; j++) {
            var subChaptCell = worksheet['C' + chaptersList[i].subchapters[j].id];
            var subChaptVal = (subChaptCell ? subChaptCell.v : undefined);
            chaptersObj[i].subchapters[j] = {
                title: subChaptVal
                , items: []
            };
            var counter = 0;
            while (chaptersList[i].subchapters[j].id + counter < chaptersList[i].subchapters[j + 1].id) {
                var specification = worksheet['D' + (chaptersList[i].subchapters[j].id + counter)];
                var specificationVal = (specification ? specification.v : "undefined");
                var activity = worksheet['C' + (chaptersList[i].subchapters[j].id + counter)];
                var activityVal = (activity ? activity.v : 0);
                var unit = worksheet['E' + (chaptersList[i].subchapters[j].id + counter)];
                var unitVal = (unit ? unit.v : 0);
                var ammount = worksheet['F' + (chaptersList[i].subchapters[j].id + counter)];
                var ammountVal = (ammount ? ammount.v : 0);
                var price = worksheet['H' + (chaptersList[i].subchapters[j].id + counter)];
                var priceVal = (price ? price.v : 0);
                var waste = worksheet['G' + (chaptersList[i].subchapters[j].id + counter)];
                var wasteVal = (waste ? waste.v : 0);
                var total = worksheet['J' + (chaptersList[i].subchapters[j].id + counter)];
                var totalVal = (total ? total.v : 0);
                if (specificationVal != undefined) {
                    chaptersObj[i].subchapters[j].items[counter] = {
                        activity: Number(activityVal)
                        , specification: specificationVal
                        , unit: unitVal
                        , ammount: Number(ammountVal)
                        , quantity: 0
                        , price: Number(priceVal)
                        , waste: Number(wasteVal)
                        , total: 0
                        , row: chaptersList[i].subchapters[j].id + counter
                    }
                }
                else {
                    chaptersObj[i].subchapters[j].items[counter] = {
                        activity: ''
                        , specification: 'undefined'
                        , unit: ''
                        , ammount: 0
                        , quantity: 0
                        , price: 0
                        , waste: 0
                        , total: 0
                        , row: chaptersList[i].subchapters[j].id + counter
                    }
                }
                counter++;
            }
            if (j == chaptersList[i].subchapters.length - 2) {
                j++;
                var subChaptCell = worksheet['C' + chaptersList[i].subchapters[j].id];
                var subChaptVal = (subChaptCell ? subChaptCell.v : undefined);
                chaptersObj[i].subchapters[j] = {
                    title: subChaptVal
                    , items: []
                };
                var counter = 0;
                while (chaptersList[i].subchapters[j].id + counter < chaptersList[i + 1].subchapters[0].id) {
                    var specification = worksheet['D' + (chaptersList[i].subchapters[j].id + counter)];
                    var specificationVal = (specification ? specification.v : undefined);
                    var activity = worksheet['C' + (chaptersList[i].subchapters[j].id + counter)];
                    var activityVal = (activity ? activity.v : undefined);
                    var unit = worksheet['E' + (chaptersList[i].subchapters[j].id + counter)];
                    var unitVal = (unit ? unit.v : undefined);
                    var ammount = worksheet['F' + (chaptersList[i].subchapters[j].id + counter)];
                    var ammountVal = (ammount ? ammount.v : 0);
                    var price = worksheet['H' + (chaptersList[i].subchapters[j].id + counter)];
                    var priceVal = (price ? price.v : 0);
                    var waste = worksheet['G' + (chaptersList[i].subchapters[j].id + counter)];
                    var wasteVal = (waste ? waste.v : 0);
                    var total = worksheet['J' + (chaptersList[i].subchapters[j].id + counter)];
                    var totalVal = (total ? total.v : 0);
                    if (specificationVal != undefined) {
                        chaptersObj[i].subchapters[j].items[counter] = {
                            activity: Number(activityVal)
                            , specification: specificationVal
                            , unit: unitVal
                            , ammount: Number(ammountVal)
                            , quantity: 0
                            , price: Number(priceVal)
                            , waste: Number(wasteVal)
                            , total: 0
                            , row: chaptersList[i].subchapters[j].id + counter
                        }
                    }
                    else {
                        chaptersObj[i].subchapters[j].items[counter] = {
                            activity: 'undefined'
                            , specification: 'undefined'
                            , unit: 'undefined'
                            , ammount: 0
                            , quantity: 0
                            , price: 0
                            , waste: 0
                            , total: 0
                            , row: chaptersList[i].subchapters[j].id + counter
                        }
                    }
                    counter++;
                }
            }
        }
    }
    newDoc.data = chaptersObj;
    fs.writeFile('public/json/data.json', JSON.stringify(newDoc), 'utf8', function (err, data) {});
}
if (fs.existsSync('resources/app/public/presupuestos/APU.xlsx')) {
    convertExcel('resources/app/public/presupuestos/APU.xlsx');
}
else if (fs.existsSync('public/presupuestos/APU.xlsx')) {
    convertExcel('public/presupuestos/APU.xlsx');
}
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1920
        , height: 1080
    })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'public/index.html')
        , protocol: 'file:'
        , slashes: true
    }))
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})