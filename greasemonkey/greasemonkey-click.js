// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://localhost:8080/?sheetId=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1yYXaC-IFuHHllkGY0ZWOHwx49Im0unfpWjDWUWeuFds%2Fedit%23gid%3D0
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

var intervalId;
var count = 1;
var id = "1";
//Zoom out a bit, to fit more on screen
document.body.style.zoom = "90%" ;
(f = function() {
  // Quadrant selection every 30 seconds
  setTimeout(function() {
    clearInterval(intervalId);
    intervalId = null;
    f();
  }, 5000);

  if(count > 4) {
    $('.home-link').click();
    count = 0;
    return;
  }

  count=count+1;

  let index = Math.round((Math.random() * 3));
  $('.button')[index].click();

  let order = 'first';
  if (index === 0) {
    order = 'first';
  }
  if (index === 1) {
    order = 'second';
  }
  if (index === 2) {
    order = 'third';
  }
  if (index === 3) {
    order = 'fourth';
  }

  let classname = '.quadrant-table.' + order;

  var length = $(classname).find('.blip-list-item').length - 1;
  $(classname).find('.blip-list-item')[0].click();

  // Blip Item selection every 10 seconds
  intervalId = setInterval(function () {

    triggerEvent('mouseout', 'blip-link-'+id);

    ind = Math.floor(Math.random() * length);
    $(classname).find('.blip-list-item')[ind].click();
    textElem = $(classname).find('.blip-list-item')[ind]
    elemid = $(textElem).attr('id');
    id =  + elemid.split(/[- ]+/).pop();

    triggerEvent('mouseover', 'blip-link-' + id);

  }, 1000)
}) ();

function triggerEvent(eventType, id)
{
  var clickEvent = document.createEvent('MouseEvents');
  clickEvent.initEvent (eventType, true, true);
  document.getElementById(id).dispatchEvent(clickEvent);
}