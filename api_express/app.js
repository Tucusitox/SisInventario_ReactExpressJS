import { AppRoutes } from './routes/routes.js';
import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); //->SIRVIENDO LA CARPETA "public/imgProdcuts"

// --------------------------------------------------------------------------
// LEVANTAMOS EL SERVIDOR
app.listen(8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
});

// RUTA PARA INICIAR EL SERVIDOR
app.get('/', ()=>{
    console.log('Servidor Funcional al 100% en la ruta: http://localhost:8000/');
});

// --------------------------------------------------------------------------
// LLAMAR A TODAS LAS RUTAS DE LA API CON EL PREFIJO "api"
app.use('/api', AppRoutes);



