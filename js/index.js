$(document).ready(function(){
    //背景随机
    rnd(1, 7)
    function rnd(n, m){
        var result=(parseInt(Math.random()*(m-n)+n));
        $('iframe').attr("src",'a'+result+'.'+'html');
    }
    $('#fullpage').fullpage({
        'verticalCentered': false,
        'css3': true,
        'sectionsColor': ['', '', '', ''],
        anchors: ['page1', 'page2', 'page3', 'page4'],
        'navigation': true,
        'navigationPosition': 'right',
        'navigationTooltips': ['fullPage.js', 'Powerful', 'Amazing', 'Simple'],
        'loopBottom':true
    })
    $('.nav li #a1').mouseover(function(){
        $(this).html('首页');
    });
    $('.nav li #a1').mouseout(function(){
        $(this).html('HOME');
    });

    $('.nav li #a2').mouseover(function(){
        $(this).html('列表');
    });
    $('.nav li #a2').mouseout(function(){
        $(this).html('PANKING LIST');
    });

    $('.nav li #a3').mouseover(function(){
        $(this).html('关于应用程序');
    });
    $('.nav li #a3').mouseout(function(){
        $(this).html('ABOUT APP');
    });

    $('.nav li #a4').mouseover(function(){
        $(this).html('关于我们');
    });
    $('.nav li #a4').mouseout(function(){
        $(this).html('CONTACT US');
    });
});