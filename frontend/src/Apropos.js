import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Apropos = () => {
  return (
    <div 
      className="container mt-5 text-center" 
      style={{ 
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        padding: '20px', 
        borderRadius: '8px' 
      }} 
    >
      {/* Ajout de l'image du profil avec une bordure */}
      <img 
        src="https://i.ibb.co/q1C2P4B/about-img.jpg" 
        alt="Profil" 
        className="rounded-circle mb-3" 
        style={{ 
          width: '150px', 
          height: '150px', 
          border: '2px solid #0a0fba', 
          padding: '1px'
        }} 
      />
      <h2>Souhail ROUAI</h2>
      <p className="text-muted">Développeur Web & Data</p>

      <div className="mt-4">
        <h4>À Propos</h4>
        <p>
          Cette application a été développée par Souhail ROUAI. <br></br> Elle permet de calculer des expressions en notation polonaise inversée (NPI) et offre des fonctionnalités comme l'export en CSV.
        </p>
      </div>
    </div>
  );
};

export default Apropos;
