import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import DogCatalog from './components/DogCatalog';
import DogDetails from './components/DogDetails';
import ContactPage from './components/ContactPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/catalog" element={<DogCatalog />} />
      <Route path="/details/:chipNumber" element={<DogDetails />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}

export default App
