// ==UserScript==
// @name         OBS Open Incoming Reviews
// @namespace    jberry-suse/opensuse-staging-tools
// @version      1.0.0
// @description  Open the first ten incoming reviews displayed on user page.
// @author       Jimmy Berry
// @match        https://build.opensuse.org/user/show/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  var key = 'jberry-suse/opensuse-staging-tools/ignored_requests';
  var ignored = JSON.parse(localStorage.getItem(key));
  if (!ignored) {
    ignored = [];
  }
  console.log(ignored);

  function is_ignored(url) {
    var parts = url.split('/');
    var request_id = parts[parts.length - 1];
    return ignored.indexOf(request_id) != -1;
  }

  setTimeout(function() {
    $('table#reviews_in_table a.request_link').each(function(index) {
      if (is_ignored($(this).attr('href'))) {
        $(this).parent().parent().css('opacity', '0.5');
        return;
      }
      if (index >= 10) return;

      console.log($(this).attr('href'));
      window.open($(this).attr("href"), "_blank");
    });
  }, 2000);
})();
