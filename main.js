const electron = require('electron');
//const express = require('express');
const fs = require('fs');
// Module to control application life.
const app = electron.app
    // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url');
if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('public/presupuestos/APU.xlsx');
var worksheet = workbook.Sheets[workbook.SheetNames[8]];
var chaptersList = [{
        id: 5
        , subchapters: [
            {
                id: 6
                , items: [{
                    id: 7
            }, {
                    id: 8
            }]
        }
        , {
                id: 12
                , items: [
                    {
                        id: 15
                }
                , {
                        id: 16
                }
                , {
                        id: 17
                }
                , {
                        id: 18
                }
                , {
                        id: 19
                }
                , {
                        id: 20
                }
                , {
                        id: 21
                }
                , {
                        id: 22
                }
                , {
                        id: 23
                }
                , {
                        id: 24
                }
                , {
                        id: 25
                }
            ]
        }
        , {
                id: 29
                , items: [
                    {
                        id: 30
                }
                , {
                        id: 31
                }
                , {
                        id: 32
                }
                , {
                        id: 33
                }
                , {
                        id: 34
                }
                , {
                        id: 35
                }
                , {
                        id: 36
                }
                , {
                        id: 37
                }
                , {
                        id: 38
                }
                , {
                        id: 39
                }
                , {
                        id: 40
                }
                , {
                        id: 41
                }
                , {
                        id: 42
                }
            ]
        }
        , {
                id: 46
                , items: [
                    {
                        id: 47
                }
                , {
                        id: 48
                }
                , {
                        id: 49
                }
                , {
                        id: 50
                }
            ]
        }
        , {
                id: 54
                , items: [
                    {
                        id: 55
                }
            ]
        }
        , {
                id: 59
                , items: [
                    {
                        id: 60
                }
                , {
                        id: 61
                }
                , {
                        id: 62
                }
                , {
                        id: 63
                }
                , {
                        id: 64
                }
                , {
                        id: 65
                }
            ]
        }]
}, {
        id: 69
        , subchapters: [
            {
                id: 70
                , items: [{
                    id: 71
            }, {
                    id: 72
            }]
        }
        , {
                id: 83
                , items: [
                    {
                        id: 77
                }
                , {
                        id: 78
                }
                , {
                        id: 79
                }
            ]
        }
        , {
                id: 83
                , items: []
        }]
}, {
        id: 90
        , subchapters: [
            {
                id: 91
                , items: [{
                    id: 92
            }, {
                    id: 93
            }, {
                    id: 94
            }, {
                    id: 95
            }]
        }
        , {
                id: 99
                , items: [
                    {
                        id: 100
                }
                , {
                        id: 101
                }
            ]
        }
        , {
                id: 105
                , items: [
                    {
                        id: 106
                }
                , {
                        id: 107
                }
            ]
        }, {
                id: 111
                , items: [{
                    id: 112
            }, {
                    id: 113
            }, {
                    id: 114
            }, {
                    id: 115
            }]
        }
        , {
                id: 119
                , items: [
                    {
                        id: 120
                }
                , {
                        id: 121
                }
                , {
                        id: 122
                }
            ]
        }
        , {
                id: 126
                , items: [
                    {
                        id: 127
                }
                , {
                        id: 128
                }
                , {
                        id: 129
                }, {
                        id: 130
                }
                , {
                        id: 131
                }
                , {
                        id: 132
                }
            ]
        }]
}, {
        id: 136
        , subchapters: [
            {
                id: 137
                , items: []
        }, {
                id: 147
                , items: []
        }, {
                id: 161
                , items: []
        }, {
                id: 175
                , items: []
        }, {
                id: 186
                , items: []
        }, {
                id: 198
                , items: []
        }, {
                id: 210
                , items: []
        }, {
                id: 222
                , items: []
        }, {
                id: 234
                , items: []
        }, {
                id: 246
                , items: []
        }, {
                id: 258
                , items: []
        }, {
                id: 270
                , items: []
        }, {
                id: 282
                , items: []
        }, {
                id: 294
                , items: []
        }
        ]
}
                    , {
        id: 308
        , subchapters: [
            {
                id: 309
                , items: []
        }, {
                id: 319
                , items: []
        }, {
                id: 327
                , items: []
        }, {
                id: 335
                , items: []
        }, {
                id: 343
                , items: []
        }, {
                id: 351
                , items: []
        }, {
                id: 359
                , items: []
        }, {
                id: 367
                , items: []
        }, {
                id: 375
                , items: []
        }]
}
                    , {
        id: 383
        , subchapters: [
            {
                id: 384
                , items: []
        }, {
                id: 396
                , items: []
        }]
}
                    , {
        id: 411
        , subchapters: [
            {
                id: 412
                , items: []
        }]
}, {
        id: 420
        , subchapters: [
            {
                id: 421
                , items: []
        }, {
                id: 429
                , items: []
        }]
}, {
        id: 438
        , subchapters: [
            {
                id: 439
                , items: []
        }, {
                id: 448
                , items: []
        }, {
                id: 457
                , items: []
        }, {
                id: 468
                , items: []
        }, {
                id: 475
                , items: []
        }, {
                id: 484
                , items: []
        }, {
                id: 491
                , items: []
        }, {
                id: 498
                , items: []
        }, {
                id: 506
                , items: []
        }, {
                id: 513
                , items: []
        }, {
                id: 523
                , items: []
        }]
}, {
        id: 539
        , subchapters: [
            {
                id: 540
                , items: []
        }, {
                id: 553
                , items: []
        }, {
                id: 559
                , items: []
        }]
}, {
        id: 565
        , subchapters: [
            {
                id: 566
                , items: []
        }, {
                id: 573
                , items: []
        }, {
                id: 580
                , items: []
        }, {
                id: 587
                , items: []
        }, {
                id: 594
                , items: []
        }, {
                id: 601
                , items: []
        }, {
                id: 608
                , items: []
        }, {
                id: 615
                , items: []
        }, {
                id: 622
                , items: []
        }, {
                id: 629
                , items: []
        }, {
                id: 636
                , items: []
        }, {
                id: 643
                , items: []
        }, {
                id: 650
                , items: []
        }, {
                id: 657
                , items: []
        }, {
                id: 664
                , items: []
        }, {
                id: 671
                , items: []
        }, {
                id: 678
                , items: []
        }, {
                id: 685
                , items: []
        }, {
                id: 692
                , items: []
        }, {
                id: 706
                , items: []
        }, {
                id: 713
                , items: []
        }, {
                id: 720
                , items: []
        }, {
                id: 727
                , items: []
        }, {
                id: 734
                , items: []
        }, {
                id: 741
                , items: []
        }, {
                id: 748
                , items: []
        }, {
                id: 755
                , items: []
        }, {
                id: 762
                , items: []
        }, {
                id: 769
                , items: []
        }, {
                id: 776
                , items: []
        }, {
                id: 783
                , items: []
        }, {
                id: 790
                , items: []
        }, {
                id: 797
                , items: []
        }, {
                id: 804
                , items: []
        }, {
                id: 811
                , items: []
        }, {
                id: 818
                , items: []
        }, {
                id: 825
                , items: []
        }, {
                id: 832
                , items: []
        }, {
                id: 839
                , items: []
        }, {
                id: 846
                , items: []
        }, {
                id: 853
                , items: []
        }, {
                id: 860
                , items: []
        }, {
                id: 867
                , items: []
        }, {
                id: 872
                , items: []
        }]
}, {
        id: 879
        , subchapters: [
            {
                id: 880
                , items: []
        }, {
                id: 893
                , items: []
        }, {
                id: 906
                , items: []
        }, {
                id: 919
                , items: []
        }, {
                id: 932
                , items: []
        }, {
                id: 945
                , items: []
        }, {
                id: 958
                , items: []
        }, {
                id: 971
                , items: []
        }, {
                id: 983
                , items: []
        }]
}, {
        id: 996
        , subchapters: [
            {
                id: 997
                , items: []
        }, {
                id: 1005
                , items: []
        }, {
                id: 1025
                , items: []
        }, {
                id: 1032
                , items: []
        }, {
                id: 1038
                , items: []
        }, {
                id: 1044
                , items: []
        }, {
                id: 1051
                , items: []
        }, {
                id: 1057
                , items: []
        }, {
                id: 1063
                , items: []
        }, {
                id: 1069
                , items: []
        }, {
                id: 1075
                , items: []
        }, {
                id: 1083
                , items: []
        }, {
                id: 1091
                , items: []
        }, {
                id: 1098
                , items: []
        }]
}, {
        id: 1105
        , subchapters: [
            {
                id: 1106
                , items: []
        }, {
                id: 1112
                , items: []
        }]
}, {
        id: 1116
        , subchapters: [
            {
                id: 1117
                , items: []
        }, {
                id: 1130
                , items: []
        }, {
                id: 1146
                , items: []
        }, {
                id: 1162
                , items: []
        }, {
                id: 1178
                , items: []
        }, {
                id: 1194
                , items: []
        }, {
                id: 1210
                , items: []
        }, {
                id: 1226
                , items: []
        }, {
                id: 1243
                , items: []
        }, {
                id: 1257
                , items: []
        }, {
                id: 1268
                , items: []
        }, {
                id: 1275
                , items: []
        }, {
                id: 1283
                , items: []
        }, {
                id: 1291
                , items: []
        }, {
                id: 1299
                , items: []
        }, {
                id: 1307
                , items: []
        }, {
                id: 1315
                , items: []
        }, {
                id: 1323
                , items: []
        }, {
                id: 1339
                , items: []
        }, {
                id: 1355
                , items: []
        }, {
                id: 1371
                , items: []
        }, {
                id: 1387
                , items: []
        }, {
                id: 1394
                , items: []
        }, {
                id: 1399
                , items: []
        }, {
                id: 1410
                , items: []
        }, {
                id: 1415
                , items: []
        }]
}, {
        id: 1428
        , subchapters: [
            {
                id: 1429
                , items: []
        }, {
                id: 1438
                , items: []
        }, {
                id: 1450
                , items: []
        }, {
                id: 1462
                , items: []
        }, {
                id: 1474
                , items: []
        }, {
                id: 1483
                , items: []
        }, {
                id: 1494
                , items: []
        }, {
                id: 1505
                , items: []
        }, {
                id: 1517
                , items: []
        }, {
                id: 1525
                , items: []
        }, {
                id: 1533
                , items: []
        }, {
                id: 1541
                , items: []
        }, {
                id: 1552
                , items: []
        }, {
                id: 1563
                , items: []
        }, {
                id: 1575
                , items: []
        }, {
                id: 1587
                , items: []
        }, {
                id: 1599
                , items: []
        }, {
                id: 1611
                , items: []
        }, {
                id: 1622
                , items: []
        }, {
                id: 1633
                , items: []
        }, {
                id: 1653
                , items: []
        }, {
                id: 1664
                , items: []
        }, {
                id: 1676
                , items: []
        }, {
                id: 1686
                , items: []
        }, {
                id: 1696
                , items: []
        }]
}, {
        id: 1702
        , subchapters: [
            {
                id: 1703
                , items: []
        }, {
                id: 1713
                , items: []
        }, {
                id: 1723
                , items: []
        }, {
                id: 1733
                , items: []
        }, {
                id: 1746
                , items: []
        }, {
                id: 1759
                , items: []
        }, {
                id: 1772
                , items: []
        }, {
                id: 1785
                , items: []
        }, {
                id: 1797
                , items: []
        }, {
                id: 1810
                , items: []
        }, {
                id: 1823
                , items: []
        }, {
                id: 1836
                , items: []
        }, {
                id: 1849
                , items: []
        }, {
                id: 1862
                , items: []
        }, {
                id: 1875
                , items: []
        }, {
                id: 1888
                , items: []
        }, {
                id: 1901
                , items: []
        }, {
                id: 1912
                , items: []
        }, {
                id: 1923
                , items: []
        }, {
                id: 1934
                , items: []
        }, {
                id: 1941
                , items: []
        }, {
                id: 1948
                , items: []
        }, {
                id: 1955
                , items: []
        }, {
                id: 1962
                , items: []
        }, {
                id: 1969
                , items: []
        }, {
                id: 1982
                , items: []
        }, {
                id: 1994
                , items: []
        }, {
                id: 2007
                , items: []
        }, {
                id: 2020
                , items: []
        }, {
                id: 2031
                , items: []
        }, {
                id: 2041
                , items: []
        }]
}, {
        id: 2049
        , subchapters: [
            {
                id: 2050
                , items: []
        }, {
                id: 2058
                , items: []
        }, {
                id: 2064
                , items: []
        }]
}, {
        id: 2070
        , subchapters: [
            {
                id: 2071
                , items: []
        }, {
                id: 2075
                , items: []
        }]
}, {
        id: 2079
        , subchapters: [
            {
                id: 2079
            }
    ]
}];
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
            var activityVal = (activity ? activity.v : "");
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
                    activity: activityVal
                    , specification: specificationVal
                    , unit: unitVal
                    , ammount: ammountVal
                    , quantity: 0
                    , price: priceVal
                    , waste: wasteVal
                    , total: 0
                }
            }
            else {
                chaptersObj[i].subchapters[j].items[counter] = {
                    activity: ''
                    , specification: 'undefined'
                    , unit: ''
                    , ammount: '0'
                    , quantity: '0'
                    , price: '0'
                    , waste: '0'
                    , total: '0'
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
            while (chaptersList[i].subchapters[j].id + counter < chaptersList[i+1].subchapters[0].id) {
                var specification = worksheet['D' + (chaptersList[i].subchapters[j].id + counter)];
                var specificationVal = (specification ? specification.v : undefined);
                var activity = worksheet['C' + (chaptersList[i].subchapters[j].id + counter)];
                var activityVal = (activity ? activity.v : undefined);
                var unit = worksheet['E' + (chaptersList[i].subchapters[j].id + counter)];
                var unitVal = (unit ? unit.v : undefined);
                var ammount = worksheet['F' + (chaptersList[i].subchapters[j].id + counter)];
                var ammountVal = (ammount ? ammount.v : undefined);
                var price = worksheet['H' + (chaptersList[i].subchapters[j].id + counter)];
                var priceVal = (price ? price.v : undefined);
                var waste = worksheet['G' + (chaptersList[i].subchapters[j].id + counter)];
                var wasteVal = (waste ? waste.v : undefined);
                var total = worksheet['J' + (chaptersList[i].subchapters[j].id + counter)];
                var totalVal = (total ? total.v : undefined);
                if (specificationVal != undefined) {
                    chaptersObj[i].subchapters[j].items[counter] = {
                        activity: activityVal
                        , specification: specificationVal
                        , unit: unitVal
                        , ammount: ammountVal
                        , quantity: 0
                        , price: priceVal
                        , waste: wasteVal
                        , total: 0
                    }
                }
                else {
                    chaptersObj[i].subchapters[j].items[counter] = {
                        activity: 'undefined'
                        , specification: 'undefined'
                        , unit: 'undefined'
                        , ammount: 'undefined'
                        , quantity: 'undefined'
                        , price: 'undefined'
                        , waste: 'undefined'
                        , total: 'undefined'
                    }
                }
                counter++;
            }
        }
    }
}
fs.writeFile('public/json/data.json', JSON.stringify(chaptersObj), 'utf8', function (err, data) {});
fs.writeFile('public/json/index.json', JSON.stringify(chaptersList), 'utf8', function (err, data) {});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    //    express();
    mainWindow = new BrowserWindow({
            width: 1920
            , height: 1080
        })
        // and load the index.html of the app.
    mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'public/index.html')
            , protocol: 'file:'
            , slashes: true
        }))
        // Open the DevTools.
        // mainWindow.webContents.openDevTools()
        // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
    // Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) {
            createWindow()
        }
    })
    // In this file you can include the rest of your app's specific main process
    // code. You can also put them in separate files and require them here.