import { useEffect, useState } from 'react';
import './DogCatalogStyle.css';
import { Link } from 'react-router-dom';

function DogCatalog() {
  const [dogs, setDogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/66ea6857e41b4d34e4325758')
      .then(response => response.json())
      .then(data => {
        setDogs(data.record); // Save JSON-data in "dogs" state
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    const catalogSection = document.getElementById("catalog-section");
    catalogSection.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredDogs = dogs.filter(dog => {
    const search = searchTerm.toLowerCase();
    return (
      dog.name.toLowerCase().includes(search) ||
      dog.breed.toLowerCase().includes(search) ||
      dog.age.toString().includes(search)
    );
  });

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h2>Katalog</h2>
        <h1>Utforska våra älskade fyrbenta vänner. Klicka på bilderna för att lära känna dem närmre!</h1>
        <a href="#catalog-section" className="scroll-button" onClick={handleScroll}>Möt våra kunder</a>
      </div>

      {/* Dog catalog */}
      <div id="catalog-section" className="catalog-page">
        <h1>Sök</h1>

        {/* Search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Sök efter namn, ras eller ålder"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Dog list */}
        <div className="dog-grid">
          {filteredDogs.map(dog => (
            <Link to={`/details/${dog.chipNumber}`} className="dog-card" key={dog.chipNumber}>
              <div className="image-container">
                <img src={dog.img} alt={dog.name} />
                <div className="dog-overlay">
                  <div className="dog-info">
                    <h3>{dog.name}</h3>
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