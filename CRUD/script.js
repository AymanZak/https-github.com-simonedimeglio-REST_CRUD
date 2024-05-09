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

  // Mostro lo spinner
  mostraSpinner(); // NEW -----------------------------------------------------------------------

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
      // Nascondi lo spinner
      nascondiSpinner(); // NEW ---------------------------------------------------------
      aggiungiCardUtente(nuovoUtente);
      mostraMessaggio("Utente aggiunto con successo!"); // NEW ----------------------------------------------------
      console.log("Utente aggiunto con successo!");
    })
    // Gestisco eventuali errori durante la richiesta
    .catch((error) => {
      console.error("Errore:", error);
      mostraMessaggio("Errore nell'aggiunta dell'utente."); // NEW --------------------------------------------------
      // Nascondi lo spinner anche in caso di errore
      nascondiSpinner(); // NEW -------
    });
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

  // ----------------- NEW -----------------
  // Bottoni per modificare ed eliminare l'utente
  const bottoneModifica = document.createElement("div");
  bottoneModifica.classList.add("edit");
  bottoneModifica.textContent = "Modifica";
  bottoneModifica.onclick = () => modificaUser(utente.id, card);

  const bottoneElimina = document.createElement("div");
  bottoneElimina.classList.add("delete");
  bottoneElimina.textContent = "Elimina";
  bottoneElimina.onclick = () => cancellaUser(utente.id, card);
  // ----------------- END NEW -----------------

  // Aggiungo gli elementi alla scheda utente
  card.appendChild(nomeUtente);
  card.appendChild(emailUtente);
  card.appendChild(idUtente);
  card.appendChild(bottoneModifica); // NEW ---------------------------------------------
  card.appendChild(bottoneElimina); // NEW -------------------------------------------------------

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

    // ----------------- NEW -----------------

    /*
     *
     * Controlli di validazione
     *
     */

    // Controlla se i campi 'nome' e 'email' sono stati riempiti
    if (!nomeUserDaForm.trim() || !emailUserDaForm.trim()) {
      // Utilizza il metodo 'trim()' per rimuovere gli spazi bianchi all'inizio e alla fine delle stringhe
      // Se uno dei campi è vuoto dopo il trim (quindi, una stringa vuota è falsa in JavaScript), entra nel blocco if

      alert("Entrambi i campi sono richiesti!"); // Mostra un messaggio di errore all'utente
      return; // Termina l'esecuzione della funzione per impedire l'invio del form senza i dati necessari
    }

    // Controlla se l'indirizzo email inserito è valido
    if (!validateEmail(emailUserDaForm)) {
      // Chiama la funzione 'validateEmail' che verifica se l'email rispetta il formato richiesto
      // Se la funzione restituisce 'false', significa che l'email non è valida

      alert("Inserisci un indirizzo email valido!"); // Mostra un messaggio di errore all'utente
      return; // Termina l'esecuzione della funzione per impedire l'invio del form con un'email non valida
    }

    // ----------------- END NEW -----------------

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

// ----------------- NEW -----------------
// Funzione per validare l'indirizzo email
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
// ----------------- END NEW -----------------

// FUNZIONE PER CREARE UN TAG HTML (CON DEL TESTO)
// Creo un nuovo tag HTML con il testo fornito
function creaElementoConTesto(tipoDiTag, testo) {
  const tag = document.createElement(tipoDiTag);
  tag.textContent = testo;
  return tag;
}

// ----------------- NEW -----------------

/**
 *
 * - Funzione per modificare un Utente
 * - Funzione per eliminare un Utente
 *
 */

// FUNZIONE PER MODIFICARE UN UTENTE
function modificaUser(userId, card) {
  // Chiede all'utente di inserire un nuovo nome, mostrando il nome attuale come valore predefinito
  const nuovoNome = prompt(
    "Nuovo nome:",
    card.querySelector("h3").innerText // Inserisco già il valore del nome precedente nel prompt
  );

  // Chiede all'utente di inserire una nuova email, mostrando l'email attuale come valore predefinito
  const nuovaEmail = prompt(
    "Nuova email:",
    card.querySelector("p").innerText.split(": ")[1] // Estrae solo la parte dell'email dal testo
  );

  // Controlla che entrambi i campi siano stati riempiti
  if (nuovoNome && nuovaEmail) {
    // Invia una richiesta PUT all'API per aggiornare i dati dell'utente
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "PUT", // Metodo HTTP per aggiornamenti
      headers: { "Content-Type": "application/json" }, // Specifica che il corpo della richiesta è in JSON
      body: JSON.stringify({ name: nuovoNome, email: nuovaEmail }), // Converte l'oggetto dati in una stringa JSON
    })
      .then((response) => response.json()) // Converte la risposta in JSON
      .then((data) => {
        // Aggiorna la visualizzazione della card con i nuovi dati
        console.log("Utente aggiornato:", data); // Log dell'utente aggiornato
        card.querySelector("h3").innerText = data.name; // Aggiorna il nome nella card
        card.querySelector("p").innerText = `Email: ${data.email}`; // Aggiorna l'email nella card
      })
      .catch((error) => console.error("Errore:", error)); // Cattura e logga eventuali errori
  }
}

// Funzione per eliminare un utente
function cancellaUser(userId, card) {
  // Chiede conferma all'utente prima di procedere con l'eliminazione
  if (confirm("Sei sicuro di voler eliminare questo utente?")) {
    // Invia una richiesta DELETE all'API per eliminare l'utente specificato
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "DELETE", // Metodo HTTP DELETE per eliminare risorse
    })
      .then(() => {
        // Se la richiesta ha successo, logga un messaggio e rimuove la card dell'utente dall'interfaccia
        console.log("Utente eliminato");
        card.remove(); // Rimuove l'elemento della card dal DOM
      })
      .catch((error) => {
        // Se ci sono errori nella richiesta, logga l'errore nella console
        console.error("Errore:", error);
      });
  }
}

// FUNZIONE PER ELIMINARE UN UTENTE
function cancellaUser(userId, card) {
  /**
   *
   * confirm():
   * Questa funzione mostra una finestra di dialogo
   * con un messaggio e due pulsanti:
   * - Ok
   * - Annulla
   *
   * Restituisce TRUE se l'utente clicca OK,
   *
   */

  // Chiede conferma all'utente prima di procedere con l'eliminazione
  if (confirm("Sei sicuro di voler eliminare questo utente?")) {
    // Invia una richiesta DELETE all'API per eliminare l'utente specificato
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "DELETE", // Metodo HTTP DELETE per eliminare risorse
    })
      .then(() => {
        // Se la richiesta ha successo, logga un messaggio e rimuove la card dell'utente dall'interfaccia
        console.log("Utente eliminato");
        card.remove(); // Rimuove l'elemento della card dal DOM
      })
      .catch((error) => {
        // Se ci sono errori nella richiesta, logga l'errore nella console
        console.error("Errore:", error);
      });
  }
}

// ----------------- END NEW -----------------

// ----------------- NEW -----------------

/**
 *
 * Sezione per loaders e messaggi
 * utili a migliorare la UX
 *
 */

function mostraSpinner() {
  document.getElementById("spinner").style.display = "block";
}

function nascondiSpinner() {
  document.getElementById("spinner").style.display = "none";
}

function mostraMessaggio(messaggio) {
  const messageBox = document.getElementById("message-box");
  messageBox.textContent = messaggio;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 3000); // Il messaggio scompare dopo 3 secondi
}

// ----------------- NEW -----------------
