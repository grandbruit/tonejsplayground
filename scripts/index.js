// Interface elements
var instrument = document.getElementById('instrument');
var note = document.getElementById('note');
var play = document.getElementById('play');

// Event listeners
play.addEventListener('mousedown', function() {
  window[instrument.value].triggerAttack(note.value);
})

play.addEventListener('mouseup', function() {
  window[instrument.value].triggerRelease();
})