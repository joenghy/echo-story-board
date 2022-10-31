import $ from "jquery";

$(document).ready(function () {
    $('.sub-button').click(function () {
        $(this).next('.sub-menu').slideToggle();
        $(this).find('.dropdown').toggleClass('rotate');
    });

    $('.menu-button').click(function () {
        $('.side-bar').addClass('active');
        $('.story-board').removeClass('wide');
        $('.editor-page').removeClass('wide');
        $('.content-wrapper').removeClass('wide');
        $('.menu-button').css("visibility", "hidden");
    });

    $('.close-button').click(function () {
        $('.side-bar').removeClass('active');
        $('.story-board').addClass('wide');
        $('.editor-page').addClass('wide');
        $('.content-wrapper').addClass('wide');
        $('.menu-button').css("visibility", "visible");
    });
});