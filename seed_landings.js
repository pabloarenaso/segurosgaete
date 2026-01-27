
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';
const TOKEN = 'admin-secret-token';

const landings = [
    {
        name: "Seguro de Edificio",
        slug: "/seguros/edificio",
        menuCategory: "Seguros"
    },
    {
        name: "Vida Guardias DS-93",
        slug: "/seguros/guardias",
        menuCategory: "Seguros"
    }
];

async function seed() {
    for (const landing of landings) {
        try {
            console.log(`Creating ${landing.name}...`);
            await axios.post(`${API_URL}/landings`, landing, {
                headers: { Authorization: TOKEN }
            });
            console.log(`Created ${landing.name}`);
        } catch (error) {
            console.error(`Error creating ${landing.name}:`, error.response?.data || error.message);
        }
    }
}

seed();
