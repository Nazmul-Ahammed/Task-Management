import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import localforage from 'localforage';
import { AuthProvider } from './Contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { TeamProvider } from './Contexts/TeamContext';
import { TaskProvider } from './Contexts/TaskContext';

// Configure LocalForage
localforage.config({
  name: 'myAppStorage', // Use a custom name for your app
  storeName: 'myDataStore', // Use a custom store name
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TeamProvider>
          <TaskProvider>
            <App />
        </TaskProvider>
        </TeamProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
