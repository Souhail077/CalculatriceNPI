# Projet Calculatrice NPI

Ce projet est une calculatrice en ligne développée avec **FastAPI** pour le backend et **React.js** pour le frontend.

<p align="center">
  <img src="https://i.ibb.co/VvNzqrF/Capture-d-e-cran-2024-10-24-a-12-01-55.png" alt="Aperçu de l'application" width="500"/>
</p>



## Fonctionnalités

- Évaluation d'expressions en notation polonaise inverse (NPI)
- Historique des calculs
- Export des données au format CSV
- Interface utilisateur réactive

## Prérequis

- Python 3.x
- Node.js et npm
- Docker 

## Installation

### Cloner le projet

```bash
git clone https://github.com/Souhail077/CalculatriceNPI.git
cd CalculatriceNPI
```
Installation sans Docker

- Backend :

  - Accédez au répertoire backend :
 
  ``` bash
  cd backend
  ```
  
  - Créez un environnement virtuel et activez-le :
 
  ``` bash
  python -m venv venv
  source venv/bin/activate  # Sur Windows utilisez venv\Scripts\activate
  ```
   - Installez les dépendances:
 
  ``` bash
   pip install -r requirements.txt
  ```
   - Lancez l'application FastAPI :
 
  ``` bash 
   uvicorn main:app --reload
  ```
  Le backend sera accessible à l'adresse : http://localhost:8000

- Frontend

   - Accédez au répertoire frontend :

  ``` bash 
   npm start
  ```
  Le front sera accessible à l'adresse : http://localhost:3000

Installation avec Docker

Étape 1 : Cloner le dépôt

  - Accédez au répertoire frontend :

  ``` bash 
git clone https://github.com/Souhail077/CalculatriceNPI.git
cd CalculatriceNPI
  ```
Etape 2 : Tirez les images docker 
   
  - Au lieu de reconstruire les images, tirez les images Docker déjà construites depuis Docker Hub :

  ``` bash 
docker pull souhilinho07/npi-frontend:latest
docker pull souhilinho07/npi-backend:latest
  ```
Etape 3 : Lancer l'application :

  - Lancez les services avec Docker Compose :
 
  ``` bash 
  docker-compose up
  ```
Cela démarrera les services backend (FastAPI) et frontend (React). Vous pourrez accéder à l'application aux URLs suivantes :

Frontend (React) : http://localhost:3000

Backend (FastAPI) : http://localhost:8000  



  



  
          
        



