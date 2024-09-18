import { useEffect, useState } from 'react';

function DogCatalog() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Dog Catalog</h1>
      <ul>
        {dogs.map(dog => (
          <li key={dog.id}>
            {dog.name} - {dog.breed}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DogCatalog