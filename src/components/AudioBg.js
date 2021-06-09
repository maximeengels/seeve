
import React, { useEffect, useState } from "react"

const AudioBg = ({ audio, paused }) => {
  
  let audioSrc = new Audio(audio) 
  // let audioSrc = document.querySelector('.song1') 
  // console.log(audio)
  audioSrc.crossOrigin = "anonymous";
  const [onPause, setOnPause] = useState(false)
  
  const canvasRef = React.useRef(null)
  
  useEffect(() => {
  const canvas = canvasRef.current

    // audioSrc.play();
    const context = new AudioContext();
    // console.log(audioSrc)
    const track = context.createMediaElementSource(audioSrc);
    
    // const gainNode = context.createGain();
    const analyser = context.createAnalyser();

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 1.1;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // gainNode.gain.value = 0;
    track.connect(analyser);

    // check if context is in suspended state (autoplay policy)
    if (context.state === 'suspended') {
      context.resume();
    }

    // play or pause track depending on state
    if (onPause === false) {
      console.log(paused)
        audioSrc.play();
        setOnPause(true)
    } else if (onPause === true) {
      console.log(paused)
        audioSrc.pause();
        setOnPause(false)
    }


// ================================== GRAPH ======================================

    analyser.connect(context.destination);
    analyser.fftSize = 2048;

    const bufferLength = analyser.frequencyBinCount;

    const dataArray = new Uint8Array(bufferLength);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    let barWidth = (WIDTH / bufferLength) * 1.5;
    let barHeight;
    let x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 2;
        
        // const r = barHeight - 50 - (25 * (i/bufferLength));
        // const g = 250 * (i/bufferLength);
        // const b = 255;

        const r = barHeight + (i/bufferLength);
        const g = 20;
        const b = 0;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 8;
      }
    }
    

    renderFrame();
}, [audio])

  return (
    <canvas ref={ canvasRef } id="canvas"></canvas>
  )
}

export default AudioBg;