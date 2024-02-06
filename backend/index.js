import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import hydrometrieController from './controller/hydrometrieController.js';

const app = express();
const port = 3000;

// Middleware pour accéder aux variables d'environnement
/* if (process.env.NODE_ENV === 'development') {
    // Importer dotenv uniquement en développement
    const dotenv = require('dotenv');
    dotenv.config();
} */

dotenv.config();

// Configuration CORS pour autoriser les requêtes depuis http://localhost:8080/
const corsOptions = {
    origin: 'http://localhost:8080',
    optionSuccessStatus: 200
}

// Middleware CORS
app.use(cors(corsOptions));

// Middleware pour analyser les paramètres de requête
app.use(express.urlencoded({ extended: true }));

// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware pour les fichiers statiques
app.use('/styles', express.static('public'));

// Rendre la page d'accueil
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/api/getApiKey', (req, res) => {
    const apiKey = process.env.VUE_TOKEN_IGN;
    res.json({ apiKey });
})

// Route pour afficher les données hydrométriques
app.get('/hydrometrie', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Vérifier que page est un nombre entier
        const data = await hydrometrieController.getHydrometrieData(page);
        res.render('hydrometrie', { data: data.data })
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des données', error);
    }
})

app.listen(port, () => {
    console.log(`Le serveur démarre à l'adresse http://localhost:${port}`);
})