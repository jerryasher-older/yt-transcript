(function() {

  function popTranscript() {
    // start off by pressing the more button to get
    // YouTube to add the transcript dom
    // due to (seeming?) need to wait for various actions
    // implemented as a series of set timeouts and callbacks

    transcript = document.getElementById("transcript-scrollbox");

    // if there is no transcript button, then click "more"
    if (!transcript) {
      pressMoreButton();
    } else {
      transcriptCompletefn(transcript);
    }
  }

  function pressMoreButton() {
    // click the more button
    document.getElementById("action-panel-overflow-button").click();

    // click the transcript button
    var buttons = document.getElementsByClassName("yt-ui-menu-item-label");
    var clicked = false;
    for (i = 0; i < buttons.length; i++) {
      if (buttons[i].innerHTML == "Transcript") {
        buttons[i].click();
        clicked = true;
      }
    }
    if (clicked) {
      setTimeout(transcriptCompletefn, 200);
    } else {
      alert("Sorry, I could not obtain a transcript");
    }
  };

  // once you have the transcript
  // process it and present it.
  function transcriptCompletefn (transcript) {

    if (!transcript) {
      transcript = document.getElementById("transcript-scrollbox");
    }

    var text = "";
    if (transcript) { // clean it up
      text = transcript.innerHTML;

      // prepend a newline and append two spaces to all the timestamps
      // prior to getting rid of all html div tags
      text = text.replace(/>([0-9]+:[0-9][0-9])</g, ">\n$1&nbsp;&nbsp;<");

      // and now get rid of all html div tags (leaving naked text)
      text = text.replace(/<[\/]?div[^>]*>/g,"");

      // fix up the text by unwrapping lines
      // get rid of newlines not followed by a timestamp
      // replace the newlines with a space.
      text = text.replace(/\n(?![0-9]+:[0-9][0-9])/g, " ");

      // // add a break tag in front of every newline
      // text = text.replace(/\n/g, "<br>\n");

      // add a break tag at end of line (in front of every timestamp)
      text = text.replace(/\n(?=([0-9]+:[0-9][0-9]))/g, "<br>\n");

      var p = document.createElement("p");
      p.setAttribute("id",  "tscript-text");
      p.innerHTML = text;

      // console.log(text);

      jQuery("#tscriptPopUp").remove();

      jQuery("body").append("<div id='tscriptPopUp'></div>");
      jQuery("#tscriptPopUp").append(p);
      jQuery("#tscriptPopUp").append("\
<div id='tscriptPopUp'>\
<style type='text/css'>\
#tscriptPopUp { background-color: rgba(255,255,255,.3);\
border-color: rgba(0,0,0,.7); \
}\
#tscript-text {\
font-family: Roboto, arial, sans-serif;\
font-size: 13px;\
line-height: 16.9px;\
}\
");

      $("#tscriptPopUp").dialog({
        title: "Transcript",
        height: 500,
        width: $("#transcript-scrollbox").width(),
        closeOnEscape: false,
        dialogClass: "transcript-popup",
        position: {
          // my: "left top", at: "top right", of: $("#page-container"),
          // my: "right top+100", at: "left top", of: $(".watch-sidebar-head"),
          // my: "left top+100", at: "left top", of: $("#watch7-sidebar-contents"),
          my: "right top+100", at: "right bottom", of: $("#yt-masthead-container"),
          collision: "fit"
        },
        buttons: [
          {
            text: "Select All (Press Ctrl-C to copy)",
            click: function() {
              // console.log("select all");
              var s = window.getSelection();
              var r = document.createRange();
              r.selectNode(document.getElementById("tscriptPopUp"));
              s.removeAllRanges();
              s.addRange(r);
              // console.log("selected then");
            }
          },
          {
            text: "OK",
            click: function() {
              $(this).dialog("close");
            }
          }
        ]
      });
    }
    else {
      alert("I could not find the transcript, sorry");
    }
  };

  function addScript (path, callback) {
    // console.log("addingScript: " + path);
    var done = false;
    var script = document.createElement("script");
    script.src = path;
    script.onload = script.onreadystatechange = function(){
      // console.log("script: " + path + " on loaded.");
      if (!done && (!this.readyState
                    || this.readyState == "loaded"
                    || this.readyState == "complete")) {
        done = true;
        // console.log("script: " + path + " has loaded.");
        if (callback) {
          callback ();
        }
      }
    };
    document.getElementsByTagName("head")[0].appendChild(script);
    // console.log("Asking DOM to inject: " + path);
  };

  function addCSS (path, callback) {
    // console.log("addingCSS: " + path);

    if (!(jQueryUICSSloaded.hasOwnProperty(path)
          && jQueryUICSSloaded[path])) {

      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = path;

      link.onload = function() {
        // console.log("link: " + path + " has loaded.");
        jQueryUICSSloaded[path] = true;
        if (callback) {
          callback ();
        }
      };

      link.onerror = function() {
        // console.log("ERROR loading link: " + path);
        if (callback) {
          callback ();
        }
      };

      document.getElementsByTagName("head")[0].appendChild(link);
    }
  };

  var jQueryurl = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js",
      jQueryminver = "2.2.0";

  var jQueryUIurl = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js",
      jQueryUIminver = "1.11.4";

  var jQueryUICSSurl = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css",
      jQueryUICSSloaded = {};

  function checkForJQuery () {
    // console.log("check for jQuery");
    // the minimum version of jQuery we want
    var v = "1.8.2";
    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
      addScript(jQueryurl, checkForJQueryUI);
    } else {
      checkForJQueryUI();
    }
  };

  function checkForJQueryUI () {
    // console.log("check for jQueryUI");
    if (!jQuery.ui) {
      addScript(jQueryUIurl, checkForJQueryCSS);
    } else {
      initMyBookmarklet();
    }
  };

  function checkForJQueryCSS () {
    // console.log("check for jQueryCSS");
    if (jQueryUICSSloaded.hasOwnProperty(jQueryUICSSurl)
        && jQueryUICSSloaded[jQueryUICSSurl]) {
      initMyBookmarklet();
    } else {
      addCSS(jQueryUICSSurl, initMyBookmarklet);
    }
  };

  checkForJQuery();

  function initMyBookmarklet() {
    popTranscript();
  }

}());
