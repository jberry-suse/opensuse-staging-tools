// ==UserScript==
// @name         OBS Request Accept Hotkey
// @namespace    jberry-suse/opensuse-staging-tools
// @version      1.0.0
// @description  Jump to leaper comment and listen for alt + a.
// @author       Jimmy Berry
// @match        https://build.opensuse.org/request/show/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/keypress/2.1.4/keypress.min.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  if ($('p.flash-content span:contains(Successfully submitted review)').length == 1) {
    window.close();
    return;
  }

  if ($('ul#review_descision_select > li.selected > a:contains(leap-reviewers)').length != 1) {
    console.log('leap-reviewers not found');
    return;
  }

  // Focus on leaper comment.
  $(window).scrollTop($('div.comment:has(a:contains(leaper))').offset().top);

  var listener = new window.keypress.Listener();
  listener.simple_combo("alt a", function() {
    $('#review_comment_0').text('ok');
    $('input[type="submit"][value="Approve"]:visible').click();
  });
})();
