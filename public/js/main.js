$(function () {
    $.getJSON("json/data.json", function (Data) {
        var archive = {
            title: 'New document'
            , total: 0
            , data: []
        };
        archive.data = Data;
        var data = archive.data;
        var total = archive.total;
        $('.new').click(function () {
            $('body').load('views/main.html', function () {
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
                                    for (var k = 0; k < data[currentPill].subchapters[currentNav].items.length; k++) {
                                        var dataList = data[currentPill].subchapters[currentNav].items[k];
                                        if (dataList.specification != "undefined") {
                                            var contentCont = '<div class="col-xs-12 contentCont"><div class="col-xs-1 contentInfo">' + dataList.activity + ' </div><div class="col-xs-2 contentInfo">' + dataList.specification + '</div><div class="col-xs-1 contentInfo">' + dataList.unit + '</div><div class="col-xs-1 contentInfo">' + dataList.ammount + '</div><div class="col-xs-1 contentInfo"><input class="col-xs-12" type="number" min="0" value="' + dataList.quantity + '"> </div><div class="col-xs-2 contentInfo" value="' + dataList.price + '">$ ' + dataList.price + ' </div><div class="col-xs-1 contentInfo" value="' + dataList.waste + '">' + dataList.waste + ' % </div><div class="col-xs-3 contentInfo" value="' + dataList.total + '">$ ' + dataList.total + ' </div></div>';
                                            $('.content').append(contentCont);
                                        }
                                        else {
                                            var contentCont = '<div class="col-xs-12 contentCont hidden"><div class="col-xs-1 contentInfo">' + dataList.activity + ' </div><div class="col-xs-2 contentInfo">' + dataList.specification + '</div><div class="col-xs-1 contentInfo">' + dataList.unit + '</div><div class="col-xs-1 contentInfo">' + dataList.ammount + '</div><div class="col-xs-1 contentInfo"><input class="col-xs-12" type="number" min="0" value="' + dataList.quantity + '"> </div><div class="col-xs-2 contentInfo" value="' + dataList.price + '">$ ' + dataList.price + ' </div><div class="col-xs-1 contentInfo" value="' + dataList.waste + '">' + dataList.waste + ' % </div><div class="col-xs-3 contentInfo" value="' + dataList.total + '">$ ' + dataList.total + ' </div></div>';
                                            $('.content').append(contentCont);
                                        }
                                    }
                                    $('.total').remove();
                                    $('.content').append('<div class="col-xs-12 total"><h2 class="col-xs-4 col-xs-offset-8">Total <div class="pull-right">$ 0</div></h2></div>');
                                    $('.total > h2 > div').html('$ ' + total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
                                    $("input[type=number]").bind('keyup input', function () {
                                        var currentChapter = $('.sideNav > .active').index() - 1;
                                        var currentSubChapter = $('.topNav > .active').index();
                                        var index = $(this).parent().parent().index() - 1;
                                        var obj = data[currentChapter].subchapters[currentSubChapter].items[index];
                                        console.log(obj);
                                        total -= obj.total;
                                        var cost = obj.price;
                                        var multiplier = $(this).val();
                                        data[currentChapter].subchapters[currentSubChapter].items[index].quantity = multiplier;
                                        var waste = (obj.waste / 100) + 1;
                                        var ammount = Number(data[currentChapter].subchapters[currentSubChapter].items[index].ammount);
                                        var parcialTotal = Math.floor(cost * multiplier * waste * ammount);
                                        $($($('.contentCont')[index]).find('.contentInfo')[7]).html('$ ' + (parcialTotal).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
                                        $($($('.contentCont')[index]).find('.contentInfo')[7]).attr('value', (parcialTotal));
                                        total += (parcialTotal);
                                        $('.total > h2 > div').html('$ ' + total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
                                        data[currentChapter].subchapters[currentSubChapter].items[index].total = parcialTotal;
                                    });
                                })
                            }
                            else if (j == 11) {
                                if (subChaptersLength > 12) {
                                    topNavPill = '<div class="col-xs-' + columnSize + ' topNavPill dropBtn" data-toggle="tooltip" title="Ver más">Ver más</div>';
                                    $('.topNav').append(topNavPill);
                                    $('.dropBtn').last().on('click',function(){
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
                                        for (var k = 0; k < data[currentPill].subchapters[currentNav].items.length; k++) {
                                            var dataList = data[currentPill].subchapters[currentNav].items[k];
                                            if (dataList.specification != "undefined") {
                                                var contentCont = '<div class="col-xs-12 contentCont"><div class="col-xs-1 contentInfo">' + dataList.activity + ' </div><div class="col-xs-2 contentInfo">' + dataList.specification + '</div><div class="col-xs-1 contentInfo">' + dataList.unit + '</div><div class="col-xs-1 contentInfo">' + dataList.ammount + '</div><div class="col-xs-1 contentInfo"><input class="col-xs-12" type="number" min="0" value="' + dataList.quantity + '"> </div><div class="col-xs-2 contentInfo" value="' + dataList.price + '">$ ' + dataList.price + ' </div><div class="col-xs-1 contentInfo" value="' + dataList.waste + '">' + dataList.waste + ' % </div><div class="col-xs-3 contentInfo" value="' + dataList.total + '">$ ' + dataList.total + ' </div></div>';
                                                $('.content').append(contentCont);
                                            }
                                            else {
                                                var contentCont = '<div class="col-xs-12 contentCont hidden"><div class="col-xs-1 contentInfo">' + dataList.activity + ' </div><div class="col-xs-2 contentInfo">' + dataList.specification + '</div><div class="col-xs-1 contentInfo">' + dataList.unit + '</div><div class="col-xs-1 contentInfo">' + dataList.ammount + '</div><div class="col-xs-1 contentInfo"><input class="col-xs-12" type="number" min="0" value="' + dataList.quantity + '"> </div><div class="col-xs-2 contentInfo" value="' + dataList.price + '">$ ' + dataList.price + ' </div><div class="col-xs-1 contentInfo" value="' + dataList.waste + '">' + dataList.waste + ' % </div><div class="col-xs-3 contentInfo" value="' + dataList.total + '">$ ' + dataList.total + ' </div></div>';
                                                $('.content').append(contentCont);
                                            }
                                        }
                                        $('.total').remove();
                                        $('.content').append('<div class="col-xs-12 total"><h2 class="col-xs-4 col-xs-offset-8">Total <div class="pull-right">$ 0</div></h2></div>');
                                        $('.total > h2 > div').html('$ ' + total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
                                        $("input[type=number]").bind('keyup input', function () {
                                            var currentChapter = $('.sideNav > .active').index() - 1;
                                            var currentSubChapter = $('.topNav > .active').index();
                                            var index = $(this).parent().parent().index() - 1;
                                            var obj = data[currentChapter].subchapters[currentSubChapter].items[index];
                                            console.log(obj);
                                            total -= obj.total;
                                            var cost = obj.price;
                                            var multiplier = $(this).val();
                                            data[currentChapter].subchapters[currentSubChapter].items[index].quantity = multiplier;
                                            var waste = (obj.waste / 100) + 1;
                                            var ammount = Number(data[currentChapter].subchapters[currentSubChapter].items[index].ammount);
                                            var parcialTotal = Math.floor(cost * multiplier * waste * ammount);
                                            $($($('.contentCont')[index]).find('.contentInfo')[7]).html('$ ' + (parcialTotal).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
                                            $($($('.contentCont')[index]).find('.contentInfo')[7]).attr('value', (parcialTotal));
                                            total += (parcialTotal);
                                            $('.total > h2 > div').html('$ ' + total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
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
                $('.sideNavTitle > .glyphicon').click(function () {
                    $('.sideNav').toggleClass('hidden');
                    $('.content').toggleClass('col-xs-9 col-xs-12 col-xs-offset-3');
                    $('.topNav').toggleClass('col-xs-9 col-xs-12 col-xs-offset-3');
                })
            });
        });
        $('.new').click();
    });
});