$('#sidemenu').hide();
$('.bg_wrap.bg_lnb').hide();
$('#lnbOpen').click(function(){
    $('.bg_wrap.bg_lnb').show();
    $('#sidemenu').animate({left: 0},500).show();
});
$('#lnbClose').click(function(){
    $('.bg_wrap.bg_lnb').hide();
    $('#sidemenu').animate({left: -317},500).show();
});

$('#lnb li .depth2').hide();
$('#lnb li').removeClass('on');
$('#lnb li .lnbDropdown').click(function(){
    $('#lnb li').removeClass('on');
    $(this).parent().addClass('on');
    $(this).next().slideToggle();
    // return false;
});

$('.tabmenu li:first').addClass('on');
$('.tabmenu li').click(function(){
    $('.tabmenu li').removeClass('on');
    $(this).addClass('on');
});

var uploadFile = $('.fileBox .btnUpload');
uploadFile.on('change', function(){
    if(window.FileReader){
        var filename = $(this)[0].files[0].name;
    } else {
        var filename = $(this).val().split('/').pop().split('\\').pop();
    }
    $(this).siblings('.fileName').val(filename);
});

$(document).ready(function(){
    // $('select').prettyDropdown();
});

/* detail view tabmenu */
$('.subTab > li:first').addClass('on');
$('.tabContain .tabContents').hide();
$('.tabContain .tabContents:first').show();
$('.subTab > li > a').click(function(){
    $('.subTab > li').removeClass('on');
    $(this).parent().addClass('on');
    $('.tabContain .tabContents').hide();
    $( $(this).attr('href')).show();
});
