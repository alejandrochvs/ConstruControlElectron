$(function () {
    const fs = require('fs');
    const {
        dialog
    } = require("electron").remote;
    var loadObj = function (Data) {
        var archive = Data;
        var data = archive.data;
        var total = archive.total;
        $('body').load('views/main.html', function () {
            $('.docTitle').html(archive.title);
            $('.total > div > div').html('$ ' + total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
            for (var i = 0; i < data.length; i++) {
                var sideNavPill = '<div class="col-xs-12 sideNavPill" data-toggle="tooltip" title="' + data[i].chapter + '">' + data[i].chapter + '</div>';
                $('.sideNav').append(sideNavPill);
                $('.sideNavPill').last().click(function () {
                    $('.sideNavPill').removeClass('active');
                    $(this).addClass('active');
                    var currentPill = $(this).index() - 1;
                    $('.topNavPill').remove();
                    var subChaptersLength = data[currentPill].subchapters.length;
                    var columnSize;
                    var drop = false;
                    for (var j = 0; j < subChaptersLength; j++) {
                        if (subChaptersLength <= 6) {
                            columnSize = 12 / subChaptersLength;
                            if (subChaptersLength == 5) {
                                columnSize = 2;
                            }
                        }
                        else if (subChaptersLength >= 6) {
                            columnSize = 1;
                        }
                        if (subChaptersLength > 12) {
                            drop = true;
                        }
                        var currentNavPillTitle = data[currentPill].subchapters[j].title;
                        var topNavPill = '<div class="col-xs-' + columnSize + ' topNavPill" data-toggle="tooltip" title="' + currentNavPillTitle + '">' + currentNavPillTitle + '</div>';
                        if (j != 11) {
                            $('.topNav').append(topNavPill);
                            $('.topNavPill').last().on('click', function () {
                                $('.topNavPill').removeClass('active');
                                $(this).addClass('active');
                                $('.contentCont').remove();
                                var currentNav = $(this).index();
                                console.log(data[currentPill].subchapters[currentNav]);
                                for (var k = 0; k < data[currentPill].subchapters[currentNav].items.length; k++) {
                                    var dataList = data[currentPill].subchapters[currentNav].items[k];
                                    if ((dataList.specification != "undefined") && !(isNaN(dataList.price)) && !(isNaN(dataList.waste))) {
                                        var contentCont = '<div class="col-xs-12 contentCont"><div class="col-xs-1 contentInfo">' + dataList.activity + ' </div><div class="col-xs-2 contentInfo">' + dataList.specification + '</div><div class="col-xs-1 contentInfo">' + dataList.unit + '</div><div class="col-xs-1 contentInfo">' + dataList.ammount + '</div><div class="col-xs-1 contentInfo"><input class="col-xs-12" type="number" min="0" value="' + dataList.quantity + '"> </div><div class="col-xs-2 contentInfo">$ ' + Math.floor(dataList.price).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + ' </div><div class="col-xs-1 contentInfo">' + dataList.waste + ' % </div><div class="col-xs-3 contentInfo">$ ' + Math.floor(dataList.total).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + ' </div></div>';
                                        $('.content').append(contentCont);
                                    }
                                    else {
                                        var contentCont = '<div class="col-xs-12 contentCont hidden"><div class="col-xs-1 contentInfo">' + dataList.activity + ' </div><div class="col-xs-2 contentInfo">' + dataList.specification + '</div><div class="col-xs-1 contentInfo">' + dataList.unit + '</div><div class="col-xs-1 contentInfo">' + dataList.ammount + '</div><div class="col-xs-1 contentInfo"><input class="col-xs-12" type="number" min="0" value="' + dataList.quantity + '"> </div><div class="col-xs-2 contentInfo">$ ' + Math.floor(dataList.price).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + ' </div><div class="col-xs-1 contentInfo">' + dataList.waste + ' % </div><div class="col-xs-3 contentInfo">$ ' + Math.floor(dataList.total).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + ' </div></div>';
                                        $('.content').append(contentCont);
                                    }
                                }
                                $("input[type=number]").bind('keyup input', function () {
                                    var currentChapter = $('.sideNav > .active').index() - 1;
                                    var currentSubChapter = $('.topNav > .active').index();
                                    var index = $(this).parent().parent().index() - 1;
                                    var obj = data[currentChapter].subchapters[currentSubChapter].items[index];
                                    total -= obj.total;
                                    var cost = obj.price;
                                    var multiplier = $(this).val();
                                    data[currentChapter].subchapters[currentSubChapter].items[index].quantity = multiplier;
                                    var waste = (obj.waste / 100) + 1;
                                    var ammount = Number(data[currentChapter].subchapters[currentSubChapter].items[index].ammount);
                                    var parcialTotal = Math.floor(cost * multiplier * waste * ammount);
                                    $($($('.contentCont')[index]).find('.contentInfo')[7]).html('$ ' + (parcialTotal).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
                                    total += (parcialTotal);
                                    $('.total > div > div').html('$ ' + total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
                                    archive.total = total;
                                    data[currentChapter].subchapters[currentSubChapter].items[index].total = parcialTotal;
                                });
                            })
                        }
                        else if (j == 11) {
                            if (subChaptersLength > 12) {
                                topNavPill = '<div class="col-xs-' + columnSize + ' topNavPill dropBtn" data-toggle="tooltip" title="Ver más">Ver más</div>';
                                $('.topNav').append(topNavPill);
                                $('.dropBtn').last().on('click', function () {
                                    $('.topNav').toggleClass('drop');
                                });
                            }
                            else {
                                $('.topNav').append(topNavPill);
                                $('.topNavPill').last().on('click', function () {
                                    $('.topNavPill').removeClass('active');
                                    $(this).addClass('active');
                                    $('.contentCont').remove();
                                    var currentNav = $(this).index();
                                    console.log(data[currentPill].subchapters[currentNav]);
                                    for (var k = 0; k < data[currentPill].subchapters[currentNav].items.length; k++) {
                                        var dataList = data[currentPill].subchapters[currentNav].items[k];
                                        if ((dataList.specification != "undefined") && !(isNaN(dataList.price)) && !(isNaN(dataList.waste))) {
                                            var contentCont = '<div class="col-xs-12 contentCont"><div class="col-xs-1 contentInfo">' + dataList.activity + ' </div><div class="col-xs-2 contentInfo">' + dataList.specification + '</div><div class="col-xs-1 contentInfo">' + dataList.unit + '</div><div class="col-xs-1 contentInfo">' + dataList.ammount + '</div><div class="col-xs-1 contentInfo"><input class="col-xs-12" type="number" min="0"> </div><div class="col-xs-2 contentInfo">$ ' + Math.floor(dataList.price) + ' </div><div class="col-xs-1 contentInfo" >' + dataList.waste + ' % </div><div class="col-xs-3 contentInfo" >$ ' + Math.floor(dataList.total) + ' </div></div>';
                                            $('.content').append(contentCont);
                                        }
                                        else {
                                            var contentCont = '<div class="col-xs-12 contentCont hidden"><div class="col-xs-1 contentInfo">' + dataList.activity + ' </div><div class="col-xs-2 contentInfo">' + dataList.specification + '</div><div class="col-xs-1 contentInfo">' + dataList.unit + '</div><div class="col-xs-1 contentInfo">' + dataList.ammount + '</div><div class="col-xs-1 contentInfo"><input class="col-xs-12" type="number" min="0"> </div><div class="col-xs-2 contentInfo">$ ' + Math.floor(dataList.price) + ' </div><div class="col-xs-1 contentInfo">' + dataList.waste + ' % </div><div class="col-xs-3 contentInfo">$ ' + Math.floor(dataList.total) + ' </div></div>';
                                            $('.content').append(contentCont);
                                        }
                                    }
                                    $('.total > div > div').html('$ ' + total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
                                    $("input[type=number]").bind('keyup input', function () {
                                        var currentChapter = $('.sideNav > .active').index() - 1;
                                        var currentSubChapter = $('.topNav > .active').index();
                                        var index = $(this).parent().parent().index() - 1;
                                        var obj = data[currentChapter].subchapters[currentSubChapter].items[index];
                                        total -= obj.total;
                                        var cost = obj.price;
                                        var multiplier = $(this).val();
                                        data[currentChapter].subchapters[currentSubChapter].items[index].quantity = multiplier;
                                        var waste = (obj.waste / 100) + 1;
                                        var ammount = Number(data[currentChapter].subchapters[currentSubChapter].items[index].ammount);
                                        var parcialTotal = Math.floor(cost * multiplier * waste * ammount);
                                        $($($('.contentCont')[index]).find('.contentInfo')[7]).html('$ ' + (parcialTotal).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
                                        total += (parcialTotal);
                                        $('.total > div > div').html('$ ' + total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
                                        data[currentChapter].subchapters[currentSubChapter].items[index].total = parcialTotal;
                                    });
                                })
                            }
                        }
                    }
                    $('.topNavPill').tooltip({
                        placement: 'bottom'
                    });
                    $('.topNavPill').first().click();
                });
            }
            $('.sideNavPill').tooltip({
                placement: 'right'
            });
            $('.sideNavPill').first().click();
            $('.new').click(function () {
                loadJSON("json/data.json");
            })
            $('.toggle').click(function () {
                $('.sideNav').toggleClass('pulled');
                $('.content').toggleClass('col-xs-10 col-xs-12 col-xs-offset-2');
                $('.topNav').toggleClass('col-xs-10 col-xs-12 col-xs-offset-2');
                $('.toolbar').toggleClass('pulled');
                $('.total').toggleClass('col-xs-push-3 col-xs-push-5');
                $('.toggle > .glyphicon').toggleClass('glyphicon-arrow-left glyphicon-arrow-right');
            })
            $('.save').click(function () {
                let content = archive;
                dialog.showSaveDialog({
                    filters: [{
                        name: 'json'
                        , extensions: ['json']
                        }]
                }, function (filename) {
                    if (filename === undefined) {
                        return;
                    }
                    else {
                        content.title = filename.split('\\').reverse()[0].split('.')[0];
                        $('.docTitle').html(content.title);
                        content = JSON.stringify(content);
                    }
                    fs.writeFile(filename, content, (err) => {
                        if (err) {
                            console.log("An error has ocurred " + err.message);
                            return;
                        }
                        alert('File succesfully created');
                    })
                })
            });
            $('.load').click(function () {
                dialog.showOpenDialog({
                    filters: [{
                        name: 'json'
                        , extensions: ['json']
                        }]
                }, function (filename) {
                    if (filename === undefined) {
                        return;
                    }
                    else {
                        fs.readFile(filename[0], 'utf-8', function (err, data) {
                            loadObj(JSON.parse(data));
                        })
                    }
                })
            });
        });
    }
    var loadJSON = function (pathToJSON) {
        $.getJSON(pathToJSON, function (Data) {
            loadObj(Data);
        });
    }
    $('.new').click(function () {
        loadJSON("json/data.json");
    });
    $('.open').click(function () {
        dialog.showOpenDialog({
            filters: [{
                name: 'json'
                , extensions: ['json']
                        }]
        }, function (filename) {
            if (filename === undefined) {
                return;
            }
            else {
                fs.readFile(filename[0], 'utf-8', function (err, data) {
                    loadObj(JSON.parse(data));
                })
            }
        })
    });
    $('.info').click(function () {
        const remote = require('electron').remote;
        const BrowserWindow = remote.BrowserWindow;
        const path = require('path');
        const url = require('url');
        var win = new BrowserWindow({
            width: 600
            , height: 800
        });
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'views/about.html')
            , protocol: 'file:'
            , slashes: true
        }))
    });
});