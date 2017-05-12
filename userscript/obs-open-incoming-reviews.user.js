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

  setTimeout(function() {
    $('table#reviews_in_table a.request_link').each(function(index) {
      if (index >= 10) return;

      console.log($(this).attr('href'));
      window.open($(this).attr("href"), "_blank");
    });
  }, 2000);
})();
