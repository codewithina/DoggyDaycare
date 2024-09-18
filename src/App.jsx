import { useState } from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import DogCatalog from './components/DogCatalog';
import DogDetails from './components/DogDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/catalog" element={<DogCatalog />} />
        <Route path="/dog/:id" element={<DogDetails />} />
      </Routes>
    </Router>
  )
}

export default App
