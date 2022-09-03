import React, {useRef, useState, useEffect} from 'react'
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from 'react-webcam'

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("loaded")
    setInterval(() => {
      detect(net);
    }, 10);
  };


  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      draw(obj, ctx); 
    }
  }

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
    <header className="App-header">
      <Webcam
        ref={webcamRef}
        muted={true} 
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 1080,
          height: 720,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 8,
          width: 1080,
          height: 720,
        }}
      />
    </header>
  </div>
  )
}


function draw(detections, ctx) {

  detections.forEach(prediction => {
    const [x,y, width, height] = prediction['bbox'];
    const text = prediction['class'];
    
    ctx.fillStyle = "#53b0ae";
    ctx.font = '18px Arial';

    ctx.beginPath();
    ctx.globalAlpha = 0.4;
    ctx.fillRect(x,y,width, height);
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = "#000000";
    ctx.fillText(text, x, y);
    ctx.stroke();
  })

}


function drawRect(detections, ctx){
  // Loop through each prediction
  detections.forEach(prediction => {

    // Extract boxes and classes
    const [x, y, width, height] = prediction['bbox']; 
    const text = prediction['class']; 

    // Set styling
    const color = Math.floor(Math.random()*16777215).toString(16);
    ctx.strokeStyle = '#' + color
    ctx.font = '18px Arial';

    // Draw rectangles and text
    ctx.beginPath();   
    ctx.fillStyle = '#' + color
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height); 
    ctx.stroke();
  });
}
export default App


