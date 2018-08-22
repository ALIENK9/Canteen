### Cosa serve in React.js vs Angular

Segue una lista di strumenti che sono da considerarsi indispensabili per sviluppare con entrambi gli approcci. Ovviamente Angular è un framework e pertanto include tutto quello che serve al suo interno. React.js, invece fornisce solo gli strumenti per costruire il componente `View` di un MVC. Per applicazioni più costruite diventa necessario utilizzare altri pacchetti, in modo di estrarre la logica e posizionarla all'esterno dei component, che hanno scopo presentazionale.

#### 1. Gestione dello stato

React.js implementa un one-way data binding nel quale il flusso dei dati scende seguendo la gerarchia di componenti. Nei casi in cui serva interazione dell'utente con i componenti è però spesso necessario avere un modo di far fluire i dati nella direzione opposta, quindi dalla view, verso lo stato interno dell'applicazione. Utilizzando solamente React (senza Redux) questo si può fare solamente con un meccanismo di callback: un componente (tipicamente il _Closest Common Ancestor_) mantiene lo stato locale e i componenti al suo interno (detti figli) gestiscono la presentazione dei dati all'utente. Il componente che contiene lo stato passa come proprietà ai figli i dati da visualizzare e le funzioni da invocare quando sia necessario effettuare un'operazione sui dati. Pertanto queste funzioni sono in realtà metodi appartenenenti all'oggetto padre che esso `presta` ai figli, utilizzando le funzionalità di binding di JavaScript per 'legare il contesto di invocazione' (_this_) alla funzione prestata. 

![Flusso dei dati in React vs React-Redux](E:/docs/home/alessandro/stagedev/dolphin/docs/img/state-store.svg)

**Fig. 1 Gestione dello stato in React.js con e senza Redux**

Sebbene sia quindi possibile 'spezzettare' lo stato fra i componenti questo può portare a una gerarchia di componenti difficilemtnte mantenibile, nel quale i dati devono essere passati verso il basso per diversi livelli prima di essere usati. Una scelta molto popolare è utilizzare sistemi di gestione centralizzati, come Flux e un suo derivato, Redux. Redux offre un'unico stato che contiene tutti i dati dell'applicazione. La 'connessione' dei componenti allo store di Redux viene gestita automaticamente dal pacchetto `react-redux`, che implementa un pattern `Observer` nel quale i compoennti vengono aggiornati automaticamente al cambiamento dei dati dello store.

**Angular** invece sente meno la necessità di un sistema di gestione come quelli appena descritti (sebbene sia perfettamente possibile utilizzare Flux o Redux in Angular). L'approccio che viene consigliato nel tutorial di Angular è di delegare l'ottenimento dei dati ai servizi (`services`) e utilizzare la Dependency Injection per rendere disponibile tali servizi ai componenti. I componenti, quando istanziati, poi utilizzeranno il servizio per ottenere i dati da visualizzare. Dunque non c'è bisogno di centralizzare lo stato in quanto ogni componente gestisce tramite servizi i dati che lo riguardano.

![Interazione fra componenti e servizi in Angular](E:/docs/img/observable-service-data-flow.svg)



**Fig 2. Interazione fra componenti e servizi in Angular**

Nella figura sopra si vede come i componenti si interfaccino con i servizi per effettuare operazioni sui dati.

L'approccio a servizi è solitamente usato anche in React.js + Redux, anche se viene implementato in modo diverso, anche per la mancanza del meccanismo di Dependency Injection di Angular. Solitamente ogni componente ha accesso a un numero ristretto di 'azioni' di cui è possibile fare il dispatch verso lo store. Queste azioni sono l'equivalente dei metodi esposti da ogni servizio in Angular.



## Redux action vs angular services

#### Angular services

Anche in Angular i componenti non devono essere responsabili del processo di recupero dei dati dal server, ma dovrebbero avere solo funzione presentazionale. Questa separazione è concretizzata dall'utilizzo dei servizi: ogni componente che ha necessità di interfacciarsi con il server esporrà un servizio `@Injectable`. 

```typescript
@Injectable ({
    providedIn: 'component',
})
export class Service {
    constructor() {}
    
    fetchData() : DataType {
    	return fetch(...).then(...).catch(...);
	}
}
```

Un servizio quindi è un insieme di metodi che sono messi a disposizione di un component per effettuare operazioni sui dati visualizzati, incluse connessioni al server.

Nel componente poi, è necessario andare a fare l'_inject_ del servizio in modo che lo possa usare. In Angular è sufficiente inserire i giusti parametri al costruttore del componente e l'_injection_ sarà effettuata senza ulteriori sforzi.

Solitamente ogni componente espone una serie di metodi che rappresentano chiamate ai servizi, i quali si occupano di prelevare i dati o eseguire operazioni verso il server.

```typescript
@Component({
  selector: 'app-mycomponent',
  templateUrl: './mycomponent.component.html',
  styleUrls: [ './mycomponent.component.css' ]
})
export class MyComponent implements OnInit {

  constructor(private service: Service) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.service.fetchData();
  }
}
```

### Altre cose

### *ngFor e direttive in HTML

Comunemente si devono visualizzare liste e quindi è necessario iterare su un'array di elementi. Angular utilizza l'attributo speciale `*ngFor="let item of listItems"`, per accedere ad ogni elemento. In React.js il codice HTML corrispondente ad un componente è inserito all'interno del metodo `render()` della classe Javascript del componente. 



... mettere esempi ...

### Separazione fra codice HTML e JavaScript 

In Angular la tipica organizzazione dei file in un progetto è:

```
 app
│   ├── app.component.css
│   ├── app.component.html
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── app-routing.module.ts
│   ├── dashboard
│   │   ├── dashboard.component.css
│   │   ├── dashboard.component.html
│   │   └── dashboard.component.ts
│   ├── heroes
│   │   ├── heroes.component.css
│   │   ├── heroes.component.html
│   │   └── heroes.component.ts
```

L'angular CLI permette di generare automaticamente i file di un componente con `ng generate component nome_compoent`. Ogni component è quindi costituito da tre file (escludendo i test):

```
dashboard
│   ├── dashboard.component.css				// foglio di stile privato
│   ├── dashboard.component.html			// template HTML
│   └── dashboard.component.ts				// logica del component
```

Lo stesso progetto in React potrebbe essere questa struttura:

```
├── App.css
├── App.js
├── components
│   ├── dashboard.js									// HTML + logica
│   └── heroes.js
├── css
│   ├── dashboard.css									// usando CSS-modules
│   └── heroes.css
```

In React tutto è generalmente riunito sotto un unico file, quello dove è dichiarata la classe, o funzione che rappresenta il component. Come nell'esempio precedente la funzione che 'si occupa' del markup della pagina visualizzata è la funzione `render()`. Grazie a `JSX`, un superset di JavaScript che permette di includere codice HTML in mezzo al codice JavaScript, è estremamente immediato definire cosa quel componente dovrà visualizzare, utilizzando quindi semplice codice JavaScript per rendere liste, con `map()`, ecc. Nel metodo `render()` si possono inserire anche le classi CSS del foglio di stile globale. Alternativamente è possibile utilizzare fogli di stile separati, ad esempio utilizzando il pacchetto `css-modules`

[^1]: https://www.npmjs.com/package/react-css-modules

.

