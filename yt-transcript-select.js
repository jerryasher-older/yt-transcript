(function() {

  // a simpler bookmark that opens the transcript and selects it.

  function selectTranscript() {
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

    console.log("transcriptCompletefn");

    if (!transcript) {
      transcript = document.getElementById("transcript-scrollbox");
    }

    var selection = window.getSelection();        
    var range = document.createRange();

    console.dir(transcript);
    console.dir(selection);
    console.dir(range);

    range.selectNodeContents(transcript);
    selection.removeAllRanges();
    selection.addRange(range);

  };

  selectTranscript();

}());
