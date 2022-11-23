import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App2 from './App2';
import ImportUI from "../src/import/ImportUI";
import Appdelete from './Appdelete';
import Delete from "../src/delete/Delete"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <App /> 
    // <App2/>
    <ImportUI/>
    // <Appdelete/>
    // <Delete/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
