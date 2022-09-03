import React from 'react';
import ReactDOM from 'react-dom/client';
import "./App.css"
import App from './App';
import Header from "./header"
import reportWebVitals from './reportWebVitals';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div class="cool" >
      <div>
        <h1>Cocossd Demo</h1>
      </div>
      <div class='par'>
        <p>This is a real-time object detection system that was built using Tenserflow's Cocossd Model. 
          The model detects objects defined in the COCO dataset, which is a large-scale object detection, segmentation, and captioning dataset, and is able to detect up to 80 classes of objects.
        </p>
      </div>
    </div>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
