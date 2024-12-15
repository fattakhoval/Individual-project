// Viewer client

// get socket server url from env
// const socketServerUrl = 'ws://localhost:8123';
// Initialize WebSocket connection
const socket = new WebSocket('ws://127.0.0.1:8000/ws/video/');
socket.binaryType = 'arraybuffer';
const notConnectedMessage = document.getElementById('not_connected_message');

// socket.onmessage = (event) => {
// Create a MediaSource object
var mediaSource = new MediaSource();

// When the MediaSource is successfully opened
mediaSource.addEventListener('sourceopen', () => {
  // Create a new SourceBuffer
  var sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.64001E, mp4a.40.2"');

  // When a chunk of data is received from the WebSocket
  socket.onmessage = (event) => {
    const arrayU8 = new Uint8Array(event.data);
    // Check if the MediaSource is still open
    if (mediaSource.readyState === 'open') {
      // Append the received data to the SourceBuffer
      sourceBuffer.appendBuffer(arrayU8);
    } else {
      console.log('Media source is not in open state: ', mediaSource.readyState);
    }
  };

  // When the SourceBuffer has enough data to start playing
  sourceBuffer.addEventListener('updateend', () => {
    // If the video element is not already playing, start playing it
    if (video.paused) {
      video.play();
      // hide the not connected message
      notConnectedMessage.style.display = 'none';
    }
  });

  sourceBuffer.addEventListener('error', (event) => {
    console.error('SourceBuffer error:', event);
  });
});


// When a WebSocket error occurs
socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// When the WebSocket connection is closed
socket.onclose = () => {
  console.log('WebSocket connection closed.');
};

// Create a video element to display the streamed video
const video = document.getElementById('video');

// Assign the MediaSource object to the video element
video.src = URL.createObjectURL(mediaSource);