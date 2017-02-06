MonoSynth = new Tone.MonoSynth({
	"frequency" : "C4",
	"detune" : 0,
	"oscillator" : {
		"type" : "square"
	},
	"filter" : {
		"Q" : 6,
		"type" : "lowpass",
		"rolloff" : -24
	},
	"envelope" : {
		"attack" : 0.005,
		"decay" : 0.1,
		"sustain" : 0.9,
		"release" : 1
	},
	"filterEnvelope" : {
		"attack" : 0.06,
		"decay" : 0.2,
		"sustain" : 0.5,
		"release" : 2,
		"baseFrequency" : 200,
		"octaves" : 7,
		"exponent" : 2
	}
});
