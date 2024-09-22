import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DogDetailsStyle.css';

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

  return (
    <div>
      <h1>{dog.name}</h1>
      <img src={dog.img} alt={dog.name} />
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age} years</p>
      <p>Sex: {dog.sex}</p>
      <p>Present at daycare: {dog.present ? 'Yes' : 'No'}</p>
      <p>Owner: {dog.owner.name} {dog.owner.lastName}</p>
      <p>Phone: {dog.owner.phoneNumber}</p>
    </div>
  );
}

export default DogDetails