import * as handpose from '@tensorflow-models/handpose';








export async function initCamera(videoElement, width, height, fps, newWidth, newHeight) {
  const constraints = {
    audio: false,
    video: {
      facingMode: 'user',
      width: width,
      height: height,
      frameRate: { max: fps },
    },
  };




  videoElement.width = newWidth;
  videoElement.height = newHeight;

  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  videoElement.srcObject = stream;


    return new Promise((resolve) => {
    videoElement.onloadedmetadata = () => {
      resolve(videoElement);
    };
  });
}



















var notes = [60, 62, 64, 65, 67, 69, 71];
var osc;
var isNotePlaying = false;
var capture;
var detector;
var webcamCanvas;





//Ho tolto la copia dell'async function setup
  
  





function playNote(note, duration) {
  osc.triggerAttackRelease(Tone.Midi(note).toFrequency(), duration);
  isNotePlaying = true;

  if (duration) {
    setTimeout(function() {
      osc.triggerRelease();
      isNotePlaying = false;
    }, duration * 1000 + 150);
  }
}















async function draw() {
  
	// Inverte orizzontalmente l'immagine della webcam
	push();
	translate(width, 0);
	scale(-1, 1);
    image(capture, 0, 0, width, height);




	

  var w = width / notes.length;

  for (var i = 0; i < notes.length; i++) {
    var x = i * w;

    if (mouseX > x && mouseX < x + w && mouseY > 0 && mouseY < height) {
      if (!isNotePlaying) {
        playNote(notes[i], 0.5);
      }
      fill(120, 144, 186); // blu grigiastro
    } else {
      fill(200); // altro colore di riempimento
    }

    rect(x, 0, w - 1, height - 1);

	


  }








  //Parte landmarks
  if (detector) {
	const predictions = await detector.estimateHands(capture.elt);
  
	for (let i = 0; i < predictions.length; i++) {
	  const hand = predictions[i];
	  const landmarks = hand.landmarks;
  
	  for (let j = 0; j < landmarks.length; j++) {
		if (j === 8 || j === 12 || j === 16 || j === 20) {
		  const [x, y, z] = landmarks[j];
  
		  noStroke();
		  fill(0); // Colore nero
		  ellipse(x, y, 20, 20);
		}
	  }
	}
  }





  

  const predictions = await detector.estimateHands(capture.elt);

  for (let i = 0; i < predictions.length; i++) {
    const landmarks = predictions[i].landmarks;

    //push();
    translate(width, 0);
    scale(-1, 1);

    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    beginShape();
    for (let j = 0; j < landmarks.length; j++) {
      const [x, y, z] = landmarks[j];
      vertex(x, y);
    }
    endShape(CLOSE);

    pop();
    }
}

async function setup() {
	// ...
  
	// Inverte verticalmente l'immagine della webcam
	capture.style.transform = "scaleY(-1)";



	  


  
	// ...
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

































