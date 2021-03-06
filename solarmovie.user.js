// ==UserScript==
// @name solarmovieEnhancer
// @namespace https://github.com/mkeedlinger/userscripts
// @author mkeedlinger
// @version 0.1.0
// @description Some nice touches to solarmovie
// @homepage https://github.com/mkeedlinger/userscripts
// @source https://github.com/mkeedlinger/userscripts/blob/master/solarmovie.user.js
// @updateURL https://github.com/mkeedlinger/userscripts/raw/master/solarmovie.user.js
// @downloadURL https://github.com/mkeedlinger/userscripts/raw/master/solarmovie.user.js
// @include *
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
    },
    secret = "Pp0DNfNApQSFMXGj1P7OswRj3YKJahOi09uwHyDOTgphSTSfMtmMWO16zgAAu2hCNzjPikGwx",
    qs = document.querySelector;

if ((new URL(window.location.href).hostname) === "www.solarmovie.is") {
    if ($('.dataTable').length) { // on a links page
        console.log(1);
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
                tr.style.backgroundColor = 'rgba(230,0,0,.05)';
                top.push(tr);
                tr.remove();
            } else if (remove.indexOf(this.innerText) !== -1) {
                tr.remove();
            }
        });
        $($('.dataTable tbody')[0]).prepend(top);
        $('.dataTable tbody tr:not(.sponsorLink)').each(function (ind) {
            if (ind >= 10) {
                $(this).hide()
            }
        });
        document.body.scrollIntoView()
        $('.dataTable tbody tr:not(.sponsorLink) td:first-child > a')
        .each(function () {
            var link = this;
            $.get(link.href, function (data) {
                link.href = $(data).find('.linksWrapper .fullyGreenButton')[0].href;
            });
        });
    } else if ($('#frame').length) { // you've come to a player page
        $('.partnerButton').attr('href', '#').text('Play in fullscreen').removeAttr('target')
        .click(function (e) {
            var ret = $("iframe");
            $("body").css({
                margin : 0,
                padding : 0
            });
            ret.css({
                width : "100vw",
                height : "100vh"
            });
            $("body").html(ret);
            var html = '<section id="iBack" style="background-color: black; padding: '
                + '5px 5px; text-align: center;"><a href="javascript:;" style="color: '
                + 'darkgray; font-size: 16px;">Back</a></section>';
            $("body").prepend($(html));
            $("#iBack").click(function () {
                window.location.reload();
            });
            $('iframe').load(function () {
                $('iframe')[0].contentWindow.postMessage(secret, '*');
            });
            // $('iframe')[0].contentWindow.postMessage(secret, '*');
            console.log('parent ran');
            return false; // stops default and propagation
        });
        // $.get($('a[title="Back to movie page"]')[0].href, function (data) {
        //     if ($(data).find('#header .menuBoxHeader .active')[0].innerText === "TV SHOWS") {
        //         var episode = parseInt($('span.season_episode')[0]
        //             .innerText.replace(/\D/g, ''));
        //         $.get($(data).find('div.breadcrumb li:last-child a')[0].href, function (d) {
        //             var found = false,
        //                 origEpisode = null;
        //             $(d).find('div.seasonEpisodeList span.epnomber a').each(function () {
        //                 if (parseInt(this.innerText.replace(/\D/g, '')) + 1 === episode) {
        //                     $('a[title="Back to link page"]').removeAttr('title')
        //                     .attr('href', this.href).text('Next Episode');
        //                     found = true;
        //                     return false;
        //                 }
        //                 if (parseInt(this.innerText.replace(/\D/g, '')) === episode) {
        //                     origEpisode = this.parentElement.parentElement;
        //                 }
        //             });
        //             if ($(d).find('div.seasonEpisodeList > div:first-child')[0] === origEpisode) {
        //                 // getting there...
        //             }
        //         });
        //     } else {
        //         $('a[title="Back to link page"]').remove();
        //     }
        // });
    }
} else {
    window.addEventListener("message", function (event) {
        if (event.origin === "http://www.solarmovie.is"
            && event.data === secret) {
            var ret = $("object, embed");
            if (ret.length) {
                $("body").css({
                    margin : 0,
                    padding : 0
                });
                ret.css({
                    width : "100vw",
                    height : "100vh"
                });
                $("body").html(ret);
            }
            console.log('child ran');
        };
    }, false);
}