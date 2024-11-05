// ==UserScript==
// @name         Zoom In/Out and Keep Search in WorkFlowy
// @namespace    https://rawbytz.wordpress.com
// @version      1.0
// @description  WorkFlowy Zoom In and Out keeping search active using Ctrl+Alt+Up/Down (Mac:control+Option+Up/Down)
// @author       rawbytz
// @match        https://workflowy.com/*
// @match        https://*.workflowy.com/*
// ==/UserScript==

(function () {
  'use strict';
  function getSearchParam() {
    const search = WF.currentSearchQuery(); // returns null when no search
    return search ? `?q=${encodeURIComponent(search)}` : ""
  }

  const getBaseUrl = item => item.isMainDocumentRoot() ? "/#" : item.getUrl(); //need to add # to avoid reload

  function setLocationKeepSearch(item) {
    if (!item) return
    location.href = getBaseUrl(item) + getSearchParam();
    WF.editItemName(item.isMainDocumentRoot ? item.getVisibleChildren()[0] : item);
  }

  document.addEventListener("keydown", function (event) {
    if (event.altKey && event.ctrlKey && !event.shiftKey && !event.metaKey) {
      switch (event.key) {
        case "ArrowDown": // Ctrl+Alt+Down = zoom in keep search
          setLocationKeepSearch(WF.focusedItem());
          break;
        case "ArrowUp": // Ctrl+Alt+Up = zoom out keep search
          setLocationKeepSearch(WF.currentItem().getParent());
          break;
        default:
          break;
      }
    }
  });
})();