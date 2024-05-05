# **Che cos'è REST?**

## Definizione

**RE** - _Representational_
**S** - _State_
**T** - _Transfer_

Si tratta di uno stile architettonico per far comunicare programmi e servizi sul web. Funziona usando URL e i metodi del protocollo HTTP (_come GET, POST, PUT, DELETE_) per chiedere, inviare, aggiornare o eliminare dati.

È come un linguaggio universale per permettere a diversi programmi di capirsi e collaborare facilmente.

## Principali elementi

### Risorse

- In REST, tutto è una risorsa. Una risorsa potrebbe essere un utente, un prodotto o un articolo. Ogni risorsa ha un **URI** (_Uniform Resource Identifier_) unico per identificarla.
- Ad esempio, `https://example.com/api/utenti/123` potrebbe rappresentare l'utente con ID 123.

### Verbi HTTP

REST utilizza i verbi HTTP (come GET, POST, PUT e DELETE) per definire cosa si vuole fare con una risorsa.

- **GET**: Ottieni una risorsa.
  - Esempio: `GET /api/utenti/123` → Ottieni i dettagli dell'utente con ID 123.
- **POST**: Crea una nuova risorsa.
  - Esempio: `POST /api/utenti` con dati nel corpo della richiesta → Crea un nuovo utente.
- **PUT**: Aggiorna una risorsa esistente.
  - Esempio: `PUT /api/utenti/123` con dati aggiornati → Aggiorna i dettagli dell'utente con ID 123.
- **DELETE**: Elimina una risorsa.
  - Esempio: `DELETE /api/utenti/123` → Elimina l'utente con ID 123.

### Stateless (Senza stato):

- Ogni richiesta al server è indipendente. Il server non mantiene informazioni sullo stato tra le richieste. Significa che ogni richiesta deve contenere tutte le informazioni necessarie al server per comprendere e gestire la richiesta.

## Esempio

### **Esempio pratico:**

Supponiamo di voler creare un'app di gestione utenti.
Ecco come REST scende in campo:

1.  **Elenco utenti:**  
    `GET /api/utenti`  
    Risposta: Una lista di tutti gli utenti.

2.  **Dettagli utente specifico:**  
    `GET /api/utenti/123`  
    Risposta: Informazioni sull'utente con ID 123.

3.  **Crea un nuovo utente:**  
    `POST /api/utenti`  
    Corpo della richiesta: Dati del nuovo utente.  
    Risposta: Dettagli dell'utente appena creato.

4.  **Aggiorna un utente:**  
    `PUT /api/utenti/123`  
    Corpo della richiesta: Dati aggiornati.  
    Risposta: Informazioni aggiornate sull'utente con ID 123.
5.  **Elimina un utente:**  
    `DELETE /api/utenti/123`  
    Risposta: Conferma dell'eliminazione.
