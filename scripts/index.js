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

updateNoteDisabled();

// Save field values to local storage when they change
instrument.addEventListener('change', function() {
  localStorage.setItem('instrument', this.value);
  updateNoteDisabled();
});

note.addEventListener('input', function() {
  localStorage.setItem('note', this.value);
});

// Handle click for Play button
play.addEventListener('mousedown', function() {
  var noteValue = currentInstrumentUsesNote() ? note.value : null;
  window[instrument.value].triggerAttack(noteValue);
});

play.addEventListener('mouseup', function() {
  window[instrument.value].triggerRelease();
});

// Functions
function currentInstrumentUsesNote() {
  if (['MetalSynth', 'NoiseSynth'].indexOf(instrument.value) >= 0) {
    return false;
  } else {
    return true;
  }
}

function updateNoteDisabled() {
  if (currentInstrumentUsesNote()) {
    note.disabled = false;
  } else {
    note.disabled = true;
  }
}