import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const topMenu = document.getElementById('ct-top-menu');
const toggleTopMenuIcon = document.getElementById('ct-toggle-top-menu-icon');

document.addEventListener('click', (e) => {
  if (toggleTopMenuIcon.contains(e.target)) {
    //Click on toggleTopMenuIcon
    topMenu.classList.toggle('ct-top-menu-expanded');
    topMenu.classList.toggle('hidden'); 
  } else {
    //Click outside toggleTopMenuIcon
    if (topMenu.classList.contains('ct-top-menu-expanded')) {
      topMenu.classList.remove('ct-top-menu-expanded');
      topMenu.classList.add('hidden');
    }
  }
});
