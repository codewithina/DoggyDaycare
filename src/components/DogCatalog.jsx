import { useEffect, useState } from 'react';
import './DogCatalogStyle.css';

function DogCatalog() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/66ea6857e41b4d34e4325758')
      .then(response => response.json())
      .then(data => {
        setDogs(data.record);  // Save JSON-data in "dogs" state
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const filteredDogs = dogs.filter(dog => {
    const search = searchTerm.toLowerCase();
    return (
      dog.name.toLowerCase().includes(search) ||
      dog.breed.toLowerCase().includes(search) ||
      dog.age.toString().includes(search)
    );
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="catalog-page">
      <h1>Hundkatalog</h1>

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
          <div className="dog-card" key={dog.id}>
            <div className="image-container">
              <img src={dog.img} alt={dog.name} />
            </div>
            <div className="dog-info">
              <h2>
                {dog.name}, {dog.age} år
                <span
                  className={`status-indicator ${dog.present ? 'present' : 'not-present'}`}
                  title={dog.present ? 'Närvarande' : 'Ej närvarande'}
                ></span>
              </h2>
              
              <p className="dog-breed">{dog.breed}</p>
            </div>
            <a href={`#/details/${dog.id}`} className="btn">Mer info</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DogCatalog