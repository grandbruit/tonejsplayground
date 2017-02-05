// Interface elements
var instrument = document.getElementById('instrument');
var note = document.getElementById('note');
var play = document.getElementById('play');

// Restore fields from local storage
if (localStorage.getItem('instrument')) {
  instrument.value = localStorage.getItem('instrument');
}

if (localStorage.getItem('note')) {
  note.value = localStorage.getItem('note');
}

// Save field values to local storage when they change
instrument.addEventListener('change', function() {
  localStorage.setItem('instrument', this.value);
});

note.addEventListener('input', function() {
  localStorage.setItem('note', this.value);
});

// Handle click for Play button
play.addEventListener('mousedown', function() {
  window[instrument.value].triggerAttack(note.value);
});

play.addEventListener('mouseup', function() {
  window[instrument.value].triggerRelease();
});

