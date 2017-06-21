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
  listener.simple_combo("alt d", function() {
    $('#review_comment_0').text('no diff');
    $('input[type="submit"][value="Disregard"]:visible').click();
  });

  var key = 'jberry-suse/opensuse-staging-tools/ignored_requests';
  function ignore_pre() {
    var ignored = JSON.parse(localStorage.getItem(key));
    if (!ignored) {
      ignored = [];
    }
    var parts = window.location.href.split('/');
    var request_id = parts[parts.length - 1];
    return [ignored, request_id];
  }
  listener.simple_combo("alt i", function() {
    var ignored, request_id;
    [ignored, request_id] = ignore_pre();
    if (ignored.indexOf(request_id) == -1) {
      ignored.push(request_id);
      localStorage.setItem(key, JSON.stringify(ignored));
      console.log(ignored);
      $('#review_comment_0').text('<!-- ignored -->');
    }
  });
  listener.simple_combo("alt u", function() {
    var ignored, request_id;
    [ignored, request_id] = ignore_pre();
    if (ignored) {
      var index = ignored.indexOf(request_id);
      if (index > -1) {
        ignored.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(ignored));
        console.log(ignored);
        $('#review_comment_0').text('<!-- unignored -->');
      }
    }
  });
})();
