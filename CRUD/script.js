// PUNTATORI
const form = document.getElementById("user-form");
const containerUtenti = document.getElementById("user-cards");

// FUNZIONE PER OTTENERE GLI UTENTI
function ottieniUtenti() {
  // Invia una richiesta GET per ottenere gli utenti dal server
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json()) // Converto la risposta del server in JSON
    .then((utenti) => {
      // Itero attraverso la lista di utenti restituiti e aggiunge una scheda per ciascuno
      utenti.forEach((utente) => aggiungiCardUtente(utente));
    })
    // Gestisco eventuali errori durante la richiesta
    .catch((error) => console.error("Errore:", error));
}

// FUNZIONE PER CREARE UN NUOVO UTENTE
function creaUtente(utente) {
  // Invio una richiesta POST per creare un nuovo utente sul server

  /**
   * NB: Nell'API JSONPlaceholder,
   * quando si crea un nuovo utente con una POST,
   * l'ID viene generato automaticamente dal server
   * e restituito nella risposta
   * AKA: non dobbiamo gestirlo "direttamente"
   */

  fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST", // Metodo HTTP POST per l'invio dei dati
    headers: {
      "Content-Type": "application/json", // Imposto il tipo di contenuto a JSON
    },
    body: JSON.stringify(utente), // Converto l'oggetto utente in una stringa JSON e lo invio
  })
    // Converto la risposta del server in un formato JSON utilizzabile
    .then((response) => response.json())
    // Aggiungo una scheda per il nuovo utente aggiunto e mostro un messaggio di conferma
    .then((nuovoUtente) => {
      aggiungiCardUtente(nuovoUtente);
      console.log("Utente aggiunto con successo!");
    })
    // Gestisco eventuali errori durante la richiesta
    .catch((error) => console.error("Errore:", error));
}

// FUNZIONE PER AGGIUNGERE UNA NUOVA CARD UTENTE
function aggiungiCardUtente(utente) {
  // Creo un nuovo div per la card utente
  const card = document.createElement("div");
  card.className = "user-card"; // Applico CSS

  // Creo i tag per il nome, l'email e l'ID dell'utente
  const nomeUtente = creaElementoConTesto("h3", utente.name);
  const emailUtente = creaElementoConTesto("p", "Email: " + utente.email);
  const idUtente = creaElementoConTesto("p", "ID: " + utente.id);

  // Aggiungo gli elementi alla scheda utente
  card.appendChild(nomeUtente);
  card.appendChild(emailUtente);
  card.appendChild(idUtente);

  // Aggiungo la scheda al contenitore delle schede
  containerUtenti.appendChild(card);
}

// AL CARICAMENTO DELLA PAGINA
document.addEventListener("DOMContentLoaded", function () {
  // Aggiungo un gestore dell'evento 'submit' al modulo per gestire l'invio dei dati
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Previene il comportamento predefinito del modulo (ricaricamento della pagina)

    // Ottengo i dati del nuovo utente dai campi del modulo
    const nomeUserDaForm = document.getElementById("name").value;
    const emailUserDaForm = document.getElementById("email").value;

    // Creo un oggetto utente con i dati ottenuti
    const user = {
      name: nomeUserDaForm,
      email: emailUserDaForm,
    };
    // Invio i dati dell'utente al server
    creaUtente(user);
    // Resetto il modulo dopo l'invio
    form.reset();
  });

  // Chiamo la funzione per ottenere gli utenti e visualizzarli
  ottieniUtenti();
});

// FUNZIONE PER CREARE UN TAG HTML (CON DEL TESTO)
// Creo un nuovo tag HTML con il testo fornito
function creaElementoConTesto(tipoDiTag, testo) {
  const tag = document.createElement(tipoDiTag);
  tag.textContent = testo;
  return tag;
}
