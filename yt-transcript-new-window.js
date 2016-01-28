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

      // console.dir(text);
      var twin =
          window.open(undefined,
                      "Transcript",
                      'height=600, width=700, top=150, left=150, ' +
                      'scrollable=yes, menubar=yes, resizable=yes');

      text = "\
<div id='tscriptText'>\
<style type='text/css'>\
#tscriptText {\
font-family: Roboto, arial, sans-serif;\
font-size: 13px;\
line-height: 16.9px;\
margin-left: 2px;\
margin-right: 2px;\
line-height: 1.3em;\
border-radius: 3px;\
width:610 px;\
color: #666;\
vertical-align: top;\
overflow: auto;\
} \
</style>\
" + text + "</div>";

      twin.document.write(text);
    }
    else {
      alert("I could not find the transcript, sorry");
    }
  };

  popTranscript();

}());
