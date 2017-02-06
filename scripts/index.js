// Interface elements
var instrument = document.getElementById('instrument');
var effect1 = document.getElementById('effect1');
var note = document.getElementById('note');
var play = document.getElementById('play');

// Restore fields from local storage
if (localStorage.getItem('instrument')) {
  instrument.value = localStorage.getItem('instrument');
}

if (localStorage.getItem('effect1')) {
  effect1.value = localStorage.getItem('effect1');
}

if (localStorage.getItem('note')) {
  note.value = localStorage.getItem('note');
}

updateNoteDisabled();
routeAudio();

// Reroute audio and save field values to local storage when they change
instrument.addEventListener('change', function() {
  localStorage.setItem('instrument', this.value);
  routeAudio();
  updateNoteDisabled();
});

effect1.addEventListener('change', function() {
  routeAudio();
  localStorage.setItem('effect1', this.value);
});

note.addEventListener('input', function() {
  localStorage.setItem('note', this.value);
});

// Handle click for Play button
play.addEventListener('mousedown', function() {
  var noteValue = currentInstrumentUsesNote() ? note.value : undefined;
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

function routeAudio() {
  // Reset connections
  window[instrument.value].disconnect();

  if (effect1.value == 'none') {
    // No effect; route the instrument directly to master
    window[instrument.value].toMaster();
  } else {
    // Connect the effect to master
    window[effect1.value].toMaster();
    // Connect instrument to effect
    window[instrument.value].connect(window[effect1.value]);
  }
}
