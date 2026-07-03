# 📝 Todo List Manager

Applicazione web **Full-Stack** per la gestione di liste di attività (Todo List), con possibilità di creare più liste indipendenti e gestire i task al loro interno.

> 🎓 Progetto didattico realizzato a scopo di esercitazione nello sviluppo web.

**Autore:** Lamiae Jalal

---

## 🚀 Tecnologie utilizzate

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla ES6)

### Backend
- Node.js
- Express

### Database
- SQLite (tramite la libreria `sqlite3`)

### Strumenti di sviluppo
- `nodemon` — riavvio automatico del server durante lo sviluppo
- `concurrently` — esecuzione simultanea di backend e frontend
- `live-server` — server di sviluppo con live reload per il frontend

---

## ✨ Funzionalità principali

- 📋 **Gestione liste**: creare, visualizzare, modificare ed eliminare intere liste di attività
- ✅ **Gestione task**: aggiungere ed eliminare singoli task all'interno di una specifica lista
- 🔄 **Stato dei task**: segnare i task come completati o da completare

---

## ⚙️ Installazione

Clona la repository ed esegui l'installazione delle dipendenze dalla cartella principale (root) del progetto:

```bash
git clone <url-della-repository>
cd todo-list-manager
npm install
```

> Non è necessario installare separatamente le dipendenze di frontend e backend: `npm install` nella root si occupa di tutto.

---

## ▶️ Avvio dell'applicazione

Per avviare l'intera applicazione basta un solo comando, sempre dalla root del progetto:

```bash
npm run dev
```

Questo comando utilizza `concurrently` per avviare in parallelo:

| Servizio | Indirizzo |
|---|---|
| 🔧 Backend (API + Express) | `http://localhost:3000` |
| 🎨 Frontend (live-server) | `http://localhost:5173` |

Una volta avviato, apri il browser su **`http://localhost:5173`** per utilizzare l'applicazione.

---

## 🗄️ Database

> ℹ️ **Nota importante:** il database SQLite **non richiede alcuna configurazione manuale**.

Al primo avvio dell'applicazione, il backend crea automaticamente:

- la cartella `database/`
- il file `database/app.sqlite`
- la struttura delle tabelle necessarie:
  - **`lists`** → contiene le liste, con colonna `description`
  - **`items`** → contiene i task, collegati alla lista di appartenenza tramite la chiave esterna `id_list`

Non è quindi necessario creare manualmente il database o le tabelle: basta avviare l'app con `npm run dev` e tutto viene generato in automatico.

---

## 📁 Struttura del progetto

```
todo-list-manager/
├── backend/
│   ├── db.js
│   ├── server.js
│   └── ...
├── frontend/
│   ├── index.html
│   ├── main.js
│   ├── api.js
│   └── ...
├── database/          # generata automaticamente al primo avvio
│   └── app.sqlite      # generato automaticamente al primo avvio
├── package.json
└── README.md
```

---

## 📌 Note finali

Questo progetto è stato sviluppato a scopo puramente didattico, per esercitarsi nello sviluppo di applicazioni web full-stack con Node.js, Express e SQLite.

---

<div align="center">

Realizzato  da **Lamiae Jalal**

</div>