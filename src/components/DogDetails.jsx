import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DogDetailsStyle.css';
import Header from './Header'; 
import placeholderImage from '/src/assets/pic-missing.jpg';

function DogDetails() {
  const { chipNumber } = useParams();
  const [dog, setDog] = useState(null);

  useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/66ea6857e41b4d34e4325758')
      .then(response => response.json())
      .then(data => {
        const foundDog = data.record.find(dog => dog.chipNumber === chipNumber);
        if (foundDog) {
          setDog(foundDog);
        } else {
          console.error('Dog not found');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [chipNumber]);

  if (!dog) {
    return null;
  }

  const genderIcon = dog.sex === 'female' ? '/src/assets/girl.png' : '/src/assets/boy.png';

  return (
    <div>
      <Header />
    <div className="dog-details-page">
      
      <div className="dog-details-container">
        <div className="dog-details-image">
        <img 
  src={dog.img} 
  alt={dog.name || 'Hund utan namn'} 
  onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} 
/>
        </div>
        <div className="dog-details-info">
          <h1>{dog.name}</h1>
          <p id="breed"><span>Ras:</span> {dog.breed}</p>
          <p><span>Ålder:</span> {dog.age} år</p>

          {/* Show gender w icon */}
          <p>
            <span>Kön:</span>
            <img
              src={genderIcon}
              alt={dog.sex === 'female' ? 'Girl' : 'Boy'}
              className="gender-icon"
            />
          </p>

          <p><span>Incheckad på dagis:</span> {dog.present ? 'Yes' : 'No'}</p>
          <p><span>Ägare:</span> {dog.owner.name} {dog.owner.lastName}</p>
          <p><span>Telefonnr:</span> {dog.owner.phoneNumber}</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default DogDetails