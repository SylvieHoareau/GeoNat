// hydrometrieController.js

import axios from 'axios';

const getHydrometrieData = async (page = 1, pageSize = 20) => {
    try {
        const response = await axios.get(`https://hubeau.eaufrance.fr/api/v1/hydrometrie/referentiel/sites?format=json&page=${page}&size=${pageSize}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching hydrometrie data:', error);
        throw error;
    }
}

export default {
    getHydrometrieData
}