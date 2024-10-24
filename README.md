Projet Calculatrice NPI (FastAPI & React.js)
Prérequis
Assurez-vous d'avoir :

Docker (Option 1) : Pour exécuter les containers.
Python 3.9+ et npm (Option 2) : Si vous voulez exécuter le projet sans Docker.
Git : Pour cloner le dépôt.
Installation
Option 1 : Exécuter avec Docker
Étape 1 : Cloner le dépôt
Commencez par cloner le projet :

bash
Copier le code
git clone https://github.com/Souhail077/CalculatriceNPI.git
cd CalculatriceNPI
Étape 2 : Tirer les images Docker
Au lieu de reconstruire les images, tirez les images Docker déjà construites depuis Docker Hub :

bash
Copier le code
docker pull souhilinho07/npi-frontend:latest
docker pull souhilinho07/npi-backend:latest
Étape 3 : Exécuter Docker Compose
Lancez les services avec Docker Compose :

bash
Copier le code
docker-compose up
Cela démarrera les services backend (FastAPI) et frontend (React). Vous pourrez accéder à l'application aux URLs suivantes :

Frontend (React) : http://localhost:3000
Backend (FastAPI) : http://localhost:8000
Option 2 : Exécuter sans Docker
Étape 1 : Cloner le dépôt
Cloner le dépôt de la même manière :

bash
Copier le code
git clone https://github.com/Souhail077/CalculatriceNPI.git
cd CalculatriceNPI
Étape 2 : Exécuter le Backend (FastAPI)
Créer et activer un environnement virtuel :

bash
Copier le code
cd backend
python -m venv venv
source venv/bin/activate  # Pour Windows, utilisez `venv\Scripts\activate`
Installer les dépendances :

bash
Copier le code
pip install -r requirements.txt
Lancer le serveur FastAPI :

bash
Copier le code
uvicorn main:app --reload
Le backend sera accessible à l'adresse : http://localhost:8000

Étape 3 : Exécuter le Frontend (React.js)
Installer les dépendances :

bash
Copier le code
cd ../frontend
npm install
Lancer le serveur de développement React :

bash
Copier le code
npm start
Le frontend sera accessible à l'adresse : http://localhost:3000
