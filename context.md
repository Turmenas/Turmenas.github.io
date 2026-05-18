Štai visas tavo projekto ir ND3 progresas viename faile. Gali jį išsisaugoti kaip `ND3_PROGRESAS.md`, kad visada turėtum po ranka visą kontekstą ir kodą.

```markdown
# My Winter Car: Corris Rivett Workshop Manual (ND3 Progresas)

## 1. Projekto apžvalga (ND2 būsena)
Projektas prasidėjo kaip interaktyvus techninis gidas, sudarytas iš:
- **P100 Home**: Įvadas.
- **P200 Parts**: Detalių sąrašas ir filtravimas.
- **P300 Mechanic**: Kontaktų forma gedimams (Diagnostic Ticket).
- **P400 VIN**: VIN dekoderis.
- **P500 Build Log**: Interaktyvus surinkimo žurnalas.

## 2. ND3 Užduoties tikslas (MERN Stack)
Pagal gautus reikalavimus, ND3 projektas turi būti pilna web aplikacija, naudojanti **MERN** modelį:
- **M**ongoDB (Duomenų bazė)
- **E**xpress (Backend karkasas)
- **R**eact (Frontend biblioteka)
- **N**ode.js (Serverio platforma)

## 3. Infrastruktūra (Docker)
Duomenų bazės paleidimui naudojamas Docker.

### Failas: `docker-compose.yml`
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: corris_mongo
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

## 4. Backend realizacija (Node.js + Express)
Backend tarnyba sukurta `backend/` kataloge. Ji teikia API CRUD operacijoms.

### Failas: `backend/models/Ticket.js` (Schema)
```javascript
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    mechanicName: { type: String, required: true },
    vinNumber: { type: String },
    issueType: { type: String, required: true },
    issueDescription: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);
```

### Failas: `backend/routes/tickets.js` (CRUD API)
| Metodas | Maršrutas | Veiksmas |
| :--- | :--- | :--- |
| **POST** | `/api/tickets` | Sukuria naują ticketą (Create) |
| **GET** | `/api/tickets` | Gauna visus įrašus (Read) |
| **PUT** | `/api/tickets/:id` | Atnaujina įrašą pagal ID (Update) |
| **DELETE** | `/api/tickets/:id` | Ištrina įrašą pagal ID (Delete) |

### Failas: `backend/server.js` (Pagrindinis serverio įėjimas)
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/corris_manual')
    .then(() => console.log('Sekmingai prisijungta prie MongoDB!'))
    .catch(err => console.error('Klaida jungiantis prie DB:', err));

const ticketRoutes = require('./routes/tickets');
app.use('/api/tickets', ticketRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Serveris veikia ant porto ${PORT}`));
```

## 5. Dabartinis Progresas
- [x] Docker sukonfigūruotas ir paleistas MongoDB.
- [x] Backend serveris sėkmingai inicializuotas.
- [x] Užmegztas ryšys tarp Node.js ir MongoDB.
- [x] API maršrutai (CRUD) paruošti naudojimui.

## 6. Kitas Žingsnis
**MERN modelio įgyvendinimas (Frontend - React)**:
- Sukurti React aplikaciją.
- Integruoti esamą Corris Rivett dizainą į React komponentus.
- Sujungti formas su Backend API naudojant `axios` arba `fetch`.
```

Ateityje, kai norėsi tęsti (prie **React** dalies), tiesiog sakyk – aš jau pasiruošęs!