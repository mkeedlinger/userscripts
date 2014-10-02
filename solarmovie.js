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

if ($('.dataTable')) {
    setTimeout(function () {
        $('.js-comment, .commentRow').remove();
    }, 750);
    $('.showmoreCell a').click();
    GM_addStyle('.dataTable tbody .oddCell {background-color:rgba(231,239,243,.5)}');

    var top = [],
        remove = ['realvid.net'],
        great = ['played.to', 'clicktoview.org'];
    $('.dataTable tbody tr:not(.sponsorLink) td:first-child > a')
    .each(function () {
        l.l('running...')
        var tr = this.parentElement.parentElement;
        if (great.indexOf(this.innerText) !== -1) {
            tr.style.backgroundColor = 'rgba(230,0,0,.2)';
            top.push(tr);
            tr.remove();
        } else if (remove.indexOf(this.innerText) !== -1) {
            tr.remove();
        }
    });
    l.l('NOOOOOOOOOOOOOOOO');
    $($('.dataTable tbody')[0]).prepend(top);
}