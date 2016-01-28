yt-transcript: a bookmarklet to pop up the youtube transcript
-----------------------------------------

I like the youtube transcriptions, but I dislike the small box, and
mostly I dislike the difficulty in selecting and copying portions of
the transcript.

## Three bookmarklets to help extract YouTube transcripts

[rawgit.com: yt-transcripts.html](https://rawgit.com/jerryasher/yt-transcript/master/yt-transcripts.html) contains the bookmarklets as links that can be dragged to your browser bar.

* yt-transcript-select.js -- opens the transcript and selects its text in place so the user can ctrl-c copy it. The problem is that a simple paste of the transcript will not have the best formatting, the timestamp is run into the text of the transcript.

* yt-transcript-new-window.js -- opens the transcript in a draggable, resizable entirely new window. This is typical of the behavior we might expect to see in an older app, it may not look as nice but actually the behavior is nicer since it doesn't occlude any of the video window. It has been formatted such that a paste of it is a bit friendlier than in the naive select bookmarklet.

* yt-transcript-jquery-dialog.js -- opens the transcript in a draggable, resizable pop window over the same window as the video. This is typical of the behavior we might expect to see in modern applications. The user is offered a button to select the text, and it has been formatted such that a paste of it is a bit friendlier than in the naive select bookmarklet.

License
-------

The GNU General Public License v3.0. See LICENSE for details. Have at it.

Testing
-------

I use Chrome for the most part, so that's where I use this and where it has been tested.

