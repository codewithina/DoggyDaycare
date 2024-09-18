import React from 'react';
import { useParams } from 'react-router-dom';

const DogDetails = () => {
  const { id } = useParams();
  return <h1>Dog Details for ID: {id}</h1>;
};

export default DogDetails