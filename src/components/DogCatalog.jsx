import { useEffect, useState, useRef } from 'react';
import './DogCatalogStyle.css';
import Header from './Header'; 
import { Link } from 'react-router-dom';
import placeholderImage from '/src/assets/pic-missing.jpg';

function DogCatalog() {
  const [dogs, setDogs] = useState([]);
  const [nameSearchTerm, setNameSearchTerm] = useState('');
  const [breedSearchTerm, setBreedSearchTerm] = useState('');
  const [ageSearchTerm, setAgeSearchTerm] = useState(null); 
  const [showBreedOptions, setShowBreedOptions] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/671f8717ad19ca34f8bfe8ff')
      .then(response => response.json())
      .then(data => {
        setDogs(data.record);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowBreedOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    const catalogSection = document.getElementById("catalog-section");
    catalogSection.scrollIntoView({ behavior: 'smooth' });
  };

  const breedOptions = [...new Set(dogs.map(dog => dog.breed))];
  const filteredBreeds = breedOptions.filter(breed =>
    breed.toLowerCase().includes(breedSearchTerm.toLowerCase())
  );

  const filteredDogs = dogs.filter(dog => {
    return (
      dog.name.toLowerCase().includes(nameSearchTerm.toLowerCase()) &&
      (breedSearchTerm === '' || dog.breed.toLowerCase() === breedSearchTerm.toLowerCase()) &&
      (ageSearchTerm === null || dog.age === ageSearchTerm)
    );
  });

  const handleAgeChange = (value) => {
    setAgeSearchTerm(value === 0 ? null : value); 
  };

  return (
    <div>
      <Header />
      <div className="hero">
        <h2>Katalog</h2>
        <h1>Utforska våra älskade fyrbenta vänner. Klicka på bilderna för att lära känna dem närmre!</h1>
        <a href="#catalog-section" className="scroll-button" onClick={handleScroll}>Möt våra kunder</a>
      </div>

      <div id="catalog-section" className="catalog-page">
        <h1>Sök</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Sök efter namn"
            value={nameSearchTerm}
            onChange={(e) => setNameSearchTerm(e.target.value)}
          />

          <div className="dropdown-container" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Välj ras"
              value={breedSearchTerm}
              onFocus={() => setShowBreedOptions(true)}
              onChange={(e) => setBreedSearchTerm(e.target.value)}
            />
            {showBreedOptions && (
              <div className="dropdown">
                <div
                  onClick={() => {
                    setBreedSearchTerm(''); // "Ingen ras"
                    setShowBreedOptions(false);
                  }}
                  className="dropdown-option"
                >
                  Ingen ras
                </div>
                {filteredBreeds.length > 0 ? (
                  filteredBreeds.map(breed => (
                    <div
                      key={breed}
                      onClick={() => {
                        setBreedSearchTerm(breed);
                        setShowBreedOptions(false);
                      }}
                      className="dropdown-option"
                    >
                      {breed}
                    </div>
                  ))
                ) : (
                  <div className="dropdown-option">Inga resultat</div>
                )}
              </div>
            )}
          </div>

          <div className="age-container">
            <span>Välj ålder</span>
            <input
              type="range"
              min="0"
              max="16"
              onChange={(e) => handleAgeChange(parseInt(e.target.value, 10))}
            />
            <span>{ageSearchTerm !== null ? ageSearchTerm + ' år' : 'Alla'}</span>
          </div>
        </div>

        <div className="dog-grid">
          {filteredDogs.map(dog => (
            <Link to={`/details/${dog.chipNumber}`} className="dog-card" key={dog.chipNumber}>
              <div className="image-container">
                <img 
                  src={dog.img} 
                  alt={dog.name || 'Hund utan namn'} 
                  onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} 
                />
                <div className="dog-overlay">
                  <div className="dog-info">
                    <h3>{dog.name}
                    <span className={`status-indicator ${dog.present ? 'checked-in' : 'not-checked-in'}`}></span>
                    </h3>
                    <p>{dog.age} år</p>
                    <p className="breed">{dog.breed}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DogCatalog