# API

Segue una lista di oggetti che ci aspettiamo siano ritornati dai vari endpoint esposti dal backend. La lista non è completa e può essere soggetta a variazioni. Sono anche indicati i formati con la quale saranno inviati i dati nel _body_ delle richieste dal client al server.

## Pianificazione menù

### GET /menuplan?date=aaaa-mm-gg

Usato lato admin per ritornare l'elenco di piatti disponibili nel menù di una certa giornata. (Tutti con segnalati quelli già selezionati)

Risposta:

```json
{
    "dinner": [
        {
            "name": "nome del piatto" (String),
            "id": "id_del_piatto" (String),
            "type": 1|2|3, 
            "checked": true | false
        },
        {
            ...
        }
    ],
    "lunch": [
    	{
            "name": "nome del piatto" (String),
            "id": "id_del_piatto" (String),
            "type": 1|2|3, 
            "checked": true | false
        },
        {
            ...
        }
    ]
}
```



### POST /menuplan

Body:

```json
{
    "date": "aaaa-mm-gg",
    "lunch": [
    	{
            "name": "nome del piatto" (String),
            "id": "id_del_piatto" (String),
            "type": 1|2|3, 
        },
        {
            ...
        }
    ],
    "dinner": [
        {
            "name": "nome del piatto" (String),
            "id": "id_del_piatto" (String),
            "type": 1|2|3, 
        },
        {
            ...
        }
    ]   
}
```



## Prenotazioni

### GET /reservations/users?date=aaaa-mm-gg&moment={lunch|dinner}

Ritorna prenotazioni ordinate per utente, con il rispettivo elenco di piatti per il pranzo|cena

Response:

```json
[
    {
        
      "user": {
        "id": "7",
        "name": "Nome Cognome"
      },
      "meals": [
        {
          "id": "1",
          "name": "Pasta al pomodoro",
          "description": "descrizione come stringa"
        },
        {
          "id": "5",
          "name": "Polpettone",
          "description": "descrizione come stringa"
        },
        {
          "id": "8",
          "name": "Insalata mista",
          "description": "descrizione come stringa",
        }
      ],
      "hour": "12:56",
      "id": "6"
    },
    {
        ...
    }
],
```

### GET /reservations/meals?date=aaaa-mm-gg&moment={lunch|dinner}

```json
[
    {
      "id": "0 (id del piatto)",
      "name": "Zucchine ai ferri",
      "type": 1|2|3,
      "reslist": [
        {
          "id": "id_della_prenotazione" (String),
          "name": "Giovanni Cognome",
          "hour": "12:30"
        },
        {
          "id": "id_della_prenotazione2",
          "name": "Paolo Rossi",
          "hour": "12:33"
        },
        {
          "id": "id_della_prenotazione2",
          "name": "Pippo Pippa",
          "hour": "12:00"
        }
      ]
    },
    {
        ...
    }
 ]
```



### POST /reservations

```json
{
    "user": {
        "id": "id_della_persona",
        "name": "Nome Cognome"
      },
      "meals": [
        {
          "id": "1",
          "name": "Piatto2",
          "type": 1|2|3
        },
        {
          "id": "5",
          "name": "Piatto3",
          "type": 1|2|3
        },
        {
          "id": "8",
          "name": "Piatto4",
          "type": 1|2|3
        }
      ],
      "date": "aaaa-mm-gg",
      "moment": "lunch" | "dinner",
      "hour": "hh:mm" | null,
    },
}
```



### DELETE /reservation/:reservationID

Cancella l'elemento con _id_ specificato dall'array delle prenotazioni.

#### Risposta:

```json
{ ok: true | false }
```



## Lista di utenti

### GET /users

```json
[
    {
      "id": "1",
      "name": "Carla de Carli"
    },
    {
      "id": "2",
      "name": "Pippo Baudo"
    }
]
```



## Pasti disponibili in una giornata a paranzo/cena

### GET /daymenu?date=aaaa-mm-gg&moment={lunch|dinner}

Ritorna il menù proposto del giorno specificato in 'date' (utile sia lato studente che prenota, sia lato admin che deve aggiungere una prenotazione per uno studente e ha bisogno di sapere quali sono le opzioni disponibili)

```json
[
    {
      "name": "Pasta al pomodoro",
      "type": 1,
      "description": "Pasta con pomodoro siciliano",
      "id": "1"
    },
    {
      "name": "Pasta al pesto",
      "type": 1,
      "description": "Pasta con pesto e noci",
      "id": "2"
    }
]
```



## Lista di tutti i piatti disponibili

### GET /dishes

Ritorna tutti i piatti nel DB (per gestione lato admin)

```json
[
    {
      "name": "Nome piatto",
      "type": 2,
      "description": "Ingredienti e descrizione",
      "id": "13"
    },
    {
      "name": "Nome piatto 2",
      "type": 2,
      "description": ".... descrizione ... ",
      "id": "15"
    }
]
```

### POST /dishes

Aggiunge un piatto alla lista. Il body è il seguente:

```json
{
    "name": "Nuovo piatto nome",
    "type": 1|2|3,
    "description": "Descrizione",
    "id": "ID_del_piatto"
}
```

### DELETE /dishes/:dishID

Rimuove dall'elenco di piatti quello con l'_id_ specificato.

#### Risposta:

```json
{ ok: true | false }
```



## Login

### GET /login

Utilizza Basic authentication. L'header sarà composto da:

```json
{ 
    "Authorization": "Basic base64EcodedStringOf(username:password)",
}
```

Il body della richiesta sarà ovviamente vuoto.

Dove `base64EcodedStringOf(username:password)` è la codifica `base64` della stringa composta dalle credenziali utente concatenate nel seguente modo: `username:password`.

Il server **deve rispondere** con il seguente oggetto:

```json
{
    token: "Esempio_di-token.sadjksajdksad.asdsakdjsadjhsada.dasdsadsada" (Token JWT)
}
```



La **decodifica** del token JWT permette di ottenere questo oggetto:

```json
{
    name: "Nome cognome utente",
    admin: true|false
}
```

