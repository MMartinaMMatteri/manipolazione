let notes = [60, 62, 64, 65, 67, 69, 71];
let osc;
let isNotePlaying = false;

function setup() {
  const canvas = createCanvas(640, 480);
  canvas.parent("videoCanvas");

  initSynth();
  initCamera().then(function () {
    draw();
  });
}

function draw() {
  let w = videoCanvas.width / notes.length;

  for (let i = 0; i < notes.length; i++) {
    let x = i * w;

    if (isMouseOver && !isNotePlaying) {
      playNote(notes[i], 0.5);
    }

    if (isMouseOver) {
      fill(120, 144, 186);
    } else {
      fill(200);
    }

    rect(x, 0, w - 1, videoCanvas.height - 1);
  }

  requestAnimationFrame(draw);
}

function mouseMoved() {
  isMouseOver = true;
}

function mouseExited() {
  isMouseOver = false;
}

function initSynth() {
  osc = new Tone.Synth().toDestination();

  document.getElementById("square1").addEventListener("mouseover", function () {
    if (!isNotePlaying) {
      playNote(notes[0], 0.5);
    }
  });

  document.getElementById("square2").addEventListener("mouseover", function () {
    if (!isNotePlaying) {
      playNote(notes[1], 0.5);
    }
  });

  document.getElementById("square3").addEventListener("mouseover", function () {
    if (!isNotePlaying) {
      playNote(notes[2], 0.5);
    }
  });

  document.getElementById("square4").addEventListener("mouseover", function () {
    if (!isNotePlaying) {
      playNote(notes[3], 0.5);
    }
  });

  document.getElementById("square5").addEventListener("mouseover", function () {
    if (!isNotePlaying) {
      playNote(notes[4], 0.5);
    }
  });

  document.getElementById("square6").addEventListener("mouseover", function () {
    if (!isNotePlaying) {
      playNote(notes[5], 0.5);
    }
  });

  document.getElementById("square7").addEventListener("mouseover", function () {
    if (!isNotePlaying) {
      playNote(notes[6], 0.5);
    }
  });
}

function playNote(note, duration) {
  osc.triggerAttackRelease(Tone.Midi(note).toFrequency(), duration);
  isNotePlaying = true;

  if (duration) {
    setTimeout(function () {
      osc.triggerRelease();
      isNotePlaying = false;
    }, duration * 1000 + 150);
  }
}

function initCamera() {
  return new Promise((resolve, reject) => {
    capture = createCapture(VIDEO);
    capture.parent("videoCanvas");
    capture.elt.style.transform = "scaleX(-1)";
    capture.hide();

    videoCanvas = document.getElementById("videoCanvas");

    if (capture) {
      resolve();
    } else {
      reject("Errore durante l'inizializzazione della webcam.");
    }
  });
}
