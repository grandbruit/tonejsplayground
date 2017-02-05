AMSynth = new Tone.AMSynth({
  harmonicity: 3,
  detune: 0,
  oscillator: {
    type: "sine",
  },
  envelope: {
    attack: 0.01,
    decay: 0.01,
    sustain: 1,
    release: 0.5,
  },
  modulation:{
    type:"square",
  },
  modulationEnvelope:{
    attack: 0.5,
    decay: 0,
    sustain: 1,
    release: 0.5,
  }
}).toMaster();
