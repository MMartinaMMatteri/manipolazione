SUPSI 2022-23  
Corso d’interaction design, CV427.01  
Docenti: A. Gysin, G. Profeta  

Elaborato 3: Manipolazione 

# Piano virtuale
Autore: Hans Manon  
[MediaPipe demo-ES6](https://ixd-supsi.github.io/2023/esempi/mp_hands/es6/1_landmarks)


## Introduzione e tema
In liea con il tema della manipolazione lo scopo del progetto era quello di creare una pagina che favorisse un'azione interattiva tra la nostra mano e lo schermo. Come progetto ho personalmente pensato alla creazione di un piccolo piano virtuale, in grado di produrre il suono delle note proprio grazie all'interazione consentita grazie al track della mano. La funzione del mouse in questo elaborato resta pressocchè inesistente. 


## Riferimenti progettuali
Per il progetto mi sono ispirata ad alcuni esempi che nel coso degli anni mi è capitato di vedere, anche semplicemente scorrendo su Youtube sono entrata in contatto con video dove le persone suonavano vere e proprie melodie con solo un computer davanti, ed essendo questo l'ultimo elaborato ho voluto sperimentare in ultimo anche l'implemento del suono, argomento che ho sempre trovato particolarmente interessante.





## Design dell’interfraccia e modalià di interazione
La pagina web appare come una grande schermata fullscrean dove spiccano tre elementi principali a prima vista: la webcam, sette quadrati (corrispondenti a sette tasti) e un preciso landmarker della mano, il numero otto, posizionato sopra la punta dell'indice che a livelllo visivo appare come un pallino. Coma interagire quindi con questa pagina? Molto semplice: posizionando la mano ben visibile davanti alla webcam consentendo così il rilevamento del landmark, muovendo il dito sopra ai quadrati si potrà notare come ad ognuno di essi sia stata essegnata l'emissione di una nota su scala crescente. Premesso questo, la persona che interagisce potrà quindi suonare il piano senza toccare il mouse ma spostando semplicemente il suo dito da un tasto all'altro.




https://github.com/MMartinaMMatteri/manipolazione/assets/127389607/a9c6f7dc-0d82-4a35-84bf-d7c42294bc7d








## Tecnologia usata
Questo progetto è stato una bella sfida a livello tecnico di scrittura del codice. In base alle mie conoscenze ho dovuto confrontarmi ocn errori nuovi, circostanze nuove che in alcuni momenti non comprendevo appieno e credo che la parte focale del progetto sia stato proprio il punto di unione in cui tutto quello che era presente ha iniziato a funzionare insieme. Di seguito un piccolo estratto del codice che evidenzia la parte dell'assegnazione delle note ai vari quadrati: 


```Html
function init() {
    initSynth();

    squares = document.querySelectorAll('.square');
    for (let i = 0; i < squares.length; i++) {
        (function (index) {
            const osc = new Tone.Synth().toDestination();  // Creazione di un oscillatore per ogni quadrato

            squares[index].addEventListener('handEnter', function (event) {
                playNoteOnHover(notes[index], 0.1, osc);  // Passaggio dell'oscillatore corretto
                console.log(notes[index]);
                console.log(event.target);
            });

            squares[index].addEventListener('handLeave', function (event) {
                // Stop playing note
                osc.triggerRelease();
                isNotePlaying = false;
            });

            const squareRect = squares[index].getClientRects()[0];
            const squareObj = {
                object: squares[index],
                left: squareRect.left,
                right: squareRect.right,
                top: squareRect.top,
                bottom: squareRect.bottom,
                oscillator: osc  // Salvataggio dell'oscillatore nel quadrato corrispondente
            };

            objArray.push(squareObj);
        })(i);
    
	}
```

## Target e contesto d’uso
La pagina risulta facilmente accessibile a un terget ristretto in mancanza di una spiegazione specifica su come interagire con essa. Ciò nonostante dopo una piccola introduzione e un accompagnamento a quella che è la funzione d'interazione penso che la fetta di target possa ampliarsi un po'. 


## Link al progetto

http://127.0.0.1:5500/provaap.html
