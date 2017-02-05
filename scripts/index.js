var synth = AMSynth;

document.getElementById('play').addEventListener('mousedown', function() {
  synth.triggerAttack("C4");
})

document.getElementById('play').addEventListener('mouseup', function() {
  synth.triggerRelease();
})