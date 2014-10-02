// ==UserScript==
// @name solarmovieEnhancer
// @namespace https://github.com/mkeedlinger/userscripts
// @author mkeedlinger
// @version 0.1.0
// @description Some nice touches to solarmovie
// @homepage https://github.com/mkeedlinger/userscripts
// @source https://github.com/mkeedlinger/userscripts/blob/master/solarmovie.js
// @updateURL https://raw.githubusercontent.com/mkeedlinger/userscripts/master/solarmovie.js
// @downloadURL https://raw.githubusercontent.com/mkeedlinger/userscripts/master/solarmovie.js
// @include http*://*.solarmovie.is/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @run-at document-end
// @grant GM_addStyle
// @grant GM_listValues
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_addValueChangeListener
// @grant GM_log
// @grant GM_notification
// ==/UserScript==

var l = {
        l: GM_log,
        n: GM_notification
    },
    s = {
        set: GM_setValue,
        get: GM_getValue,
        list: GM_listValues,
        addListener: GM_addValueChangeListener
    };

if ($('.dataTable')) { // on a links page
    setTimeout(function () {
        $('.commentsTree').remove();
    }, 750);
    $('.showmoreCell a').click();
    GM_addStyle('.dataTable tbody .oddCell {background-color:rgba(231,239,243,.5)}');

    var top = [],
        remove = ['realvid.net'],
        great = ['played.to', 'clicktoview.org'];
    $('.dataTable tbody tr:not(.sponsorLink) td:first-child > a')
    .each(function () {
        var tr = this.parentElement.parentElement;
        if (great.indexOf(this.innerText) !== -1) {
            tr.style.backgroundColor = 'rgba(230,0,0,.2)';
            top.push(tr);
            tr.remove();
        } else if (remove.indexOf(this.innerText) !== -1) {
            tr.remove();
        }
    });
    $($('.dataTable tbody')[0]).prepend(top);
    $('.dataTable tbody tr:not(.sponsorLink)').each(function (ind) {
        if (ind >= 40) {
            this.remove()
        }
    });
    document.body.scrollIntoView()
    $('.dataTable tbody tr:not(.sponsorLink) td:first-child > a')
    .each(function () {
        $.get(this.href, function (data) {
            l.l(data);
        });
    });
} else if ($('.watchMovieBlock')) { // you've come to a link page. you
    //
}