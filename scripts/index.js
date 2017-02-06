// Interface elements
var instrument = document.getElementById('instrument');
var effect1 = document.getElementById('effect1');
var note = document.getElementById('note');
var play = document.getElementById('play');

// Add extra effect selects
var effect2 = effect1.cloneNode(true);
effect2.id = 'effect2';
effect1.after(effect2);
var effect3 = effect1.cloneNode(true);
effect3.id = 'effect3';
effect2.after(effect3);

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

updateFields();
routeAudio();

// Reroute audio and save field values to local storage when they change
instrument.addEventListener('change', function() {
  localStorage.setItem('instrument', this.value);
  routeAudio();
  updateFields();
});

effect1.addEventListener('change', function() {
  localStorage.setItem('effect1', this.value);
  routeAudio();
  updateFields();
});

effect2.addEventListener('change', function() {
  localStorage.setItem('effect2', this.value);
  routeAudio();
  updateFields();
});

effect3.addEventListener('change', function() {
  localStorage.setItem('effect3', this.value);
  routeAudio();
  updateFields();
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

function updateFields() {
  // Determine whether or not Note field should be disabled
  if (currentInstrumentUsesNote()) {
    note.disabled = false;
  } else {
    note.disabled = true;
  }
  
  // Determine which effects should be disabled (we only want one of each at once)
  document.querySelectorAll('option').forEach(function(item) {
    item.disabled = false;
  });
  for (var i = 1; i <= 3; i++) {
    var effectSelect = window['effect' + i];
    if (effectSelect.value != 'none') {
      // First disable every <option> with that value
      document.querySelectorAll('option[value=' + effectSelect.value + ']').forEach(function(item) {
        item.disabled = true;
      });
      // Then enable the correct one
      effectSelect.querySelector('option[value=' + effectSelect.value + ']').disabled = false;
    }
  }
}

function routeAudio() {
  var routableItems = [instrument, effect1, effect2, effect3];
  
  // Reset connections
  for (var i = 0; i < instrument.children.length; i++) {
    window[instrument.children[i].value].disconnect();
  }
  for (var i = 0; i < effect1.children.length; i++) {
    var effect = effect1.children[i].value;
    if (effect != 'none') {
      window[effect].disconnect();
    }
  }
  
  // Filter out inactive items
  activeItems = [instrument, effect1, effect2, effect3].filter(function(item) {
    return item.value != 'none';
  });
  
  // Route last item to master
  var lastItem = activeItems.pop();
  window[lastItem.value].toMaster();
  
  // Route remaining items
  var previousItem = lastItem;
  while (currentItem = activeItems.pop()) {
    console.log('connected ' + currentItem.value + ' to ' + previousItem.value);
    window[currentItem.value].connect(window[previousItem.value]);
    previousItem = currentItem;
  }
}
