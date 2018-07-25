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
    "dinner": [
        {
            "name": "nome del piatto" (String),
            "id": "id_del_piatto" (String),
            "type": 1|2|3, 
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
        },
        {
            ...
        }
    ]
}
```



## Prenotazioni

### GET /reservations?date=aaaa-mm-gg&view=user&moment={lunch|dinner}

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
          "id": 1,
          "name": "Pasta al pomodoro"
        },
        {
          "id": 5,
          "name": "Polpettone"
        },
        {
          "id": 8,
          "name": "Insalata mista"
        }
      ],
      "hour": "12:56",
      "id": 6
    },
    {
        ...
    }
],
```

### GET /reservations?date=aaaa-mm-gg&view=meals&moment={lunch|dinner}

```json
[
    {
      "id": 0,
      "name": "Zucchine ai ferri",
      "type": 1|2|3,
      "reslist": [
        {
          "name": "Giovanni Cognome",
          "hour": "12:30"
        },
        {
          "name": "Paolo Rossi",
          "hour": "12:33"
        },
        {
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
          "id": 1,
          "name": "Piatto2"
        },
        {
          "id": 5,
          "name": "Piatto3"
        },
        {
          "id": 8,
          "name": "Piatto4"
        }
      ],
      "date": "aaaa-mm-gg",
      "moment": "lunch" | "dinner",
      "hour": "12:56",
    },
}
```



### DELETE /reservation/:id

Cancella l'elemento con _id_ specificato dall'array delle prenotazioni.

## Lista di utenti

### GET /users

```json
[
    {
      "id": 1,
      "name": "Carla de Carli"
    },
    {
      "id": 2,
      "name": "Pippo Baudo"
    }
]
```



## Pasti del giorno

### GET /daymenu?date=aaaa-mm-gg

Ritorna il menù del giorno specificato in 'date' (utile sia lato studente che prenota, sia lato admin che deve aggiungere una prenotazione)

```json
[
    {
      "name": "Pasta al pomodoro",
      "type": 1,
      "description": "Pasta con pomodoro siciliano",
      "id": 1
    },
    {
      "name": "Pasta al pesto",
      "type": 1,
      "description": "Pasta con pesto e noci",
      "id": 2
    }
]
```



## Lista di tutti i piatti disponibili

### GET /dishes

Ritorna tutti i piatti nel DB (per admin)

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
    "id": "dssds_ID"
}
```

### DELETE /dishes/:id

Rimuove dall'elenco di piatti quello con l'_id_ specificato.

## Login

### POST /login

```json
{
    identifier: "Nome utente | email | quel che è",
    password: "sdfghjkljhskjsasa" (eventualmente criptata)
}
```

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

