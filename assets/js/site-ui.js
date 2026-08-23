(function () {
  "use strict";

  var emailTrigger = document.querySelector(".email-trigger");
  var emailPopover = document.getElementById("email-popover");

  function closeEmail() {
    if (!emailTrigger || !emailPopover) return;
    emailTrigger.setAttribute("aria-expanded", "false");
    emailPopover.hidden = true;
  }

  if (emailTrigger && emailPopover) {
    emailTrigger.addEventListener("click", function (event) {
      event.stopPropagation();
      var shouldOpen = emailTrigger.getAttribute("aria-expanded") !== "true";
      emailTrigger.setAttribute("aria-expanded", String(shouldOpen));
      emailPopover.hidden = !shouldOpen;
    });

    emailPopover.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    document.addEventListener("click", closeEmail);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeEmail();
        emailTrigger.focus();
      }
    });
  }

  var tabList = document.querySelector('[role="tablist"]');
  if (!tabList) return;

  var tabs = Array.prototype.slice.call(tabList.querySelectorAll('[role="tab"]'));

  function activateTab(tab, moveFocus) {
    tabs.forEach(function (candidate) {
      var selected = candidate === tab;
      var panel = document.getElementById(candidate.getAttribute("aria-controls"));
      candidate.setAttribute("aria-selected", String(selected));
      candidate.tabIndex = selected ? 0 : -1;
      if (panel) panel.hidden = !selected;
    });

    if (moveFocus) tab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activateTab(tab, false);
    });

    tab.addEventListener("keydown", function (event) {
      var nextIndex;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  });

  var requestedTab = new URLSearchParams(window.location.search).get("tab");
  var requestedButton = document.getElementById(requestedTab + "-tab");
  if (requestedButton) activateTab(requestedButton, false);
})();
