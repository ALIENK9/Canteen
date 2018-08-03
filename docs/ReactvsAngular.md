# Un confronto fra React.Js e Angular

## Introduzione

Questo documento mira ad evidenziare le principali differenze fra il framework _Angular v6.1.1_ e la libreria JavaScript _React.Js v16.4.2_. Questi sono fra gli strumenti oggi maggiormente utilizzati per la creazione di interfaccie per applicazioni web. 

React.Js ha una storia più recente di Angular. La prima release è stata pubblicata a Marzo 2013, mentre la primissima versione di angular (Angular.Js o Angular 1.x) risale ad Ottobre 2010. Nel 2015 fu rilasciato Angular 2.0.0, una nuova versione di Angular.Js completamente riscritto in TypeScript e incompatibile con la precedente versione. 

Da quel momento in poi con _Angular_ si intende qualunque versione del framework dalla versione 2 in poi, mentre con _Angualr.Js_ si identifica la vecchia versione 1.x.

Nel presente documento le parole _Angular_ e _React.Js_ si riferiscono alle versioni sopra indicate. Per brevità userò la parola _React_ come sinonimo di _React.Js_.

#### Potenzialità diverse

Essendo Angular un framework e React una semplice libreria essi hanno una grado di completezza ben differente. Per la precisione Angular è un framework MVC-MVVM e offre un insieme di strumenti da utilizzare assieme per far fronte ad ogni esigenza di uno sviluppatore. React è una libreria con poche funzionalità rispetto al primo. Di conseguenza per effettuare un confronto signifiativo assumerò l'utilizzo si React sia complementato da un certo numero di librerie che lo rendano paragonabile ad Angular.

[Remind]:

- Redux
- Reselect
- React-router
- (Css modules)
- (Redux-persist)

## Architettura a componenti

In Angular e React si basano sul concetto di `Component`, che rappresentano i tasselli con la quale è costruita una pagina web. Si tratta quindi di blocchi di codice HTML potenziati con funzioni JavaScript o TypeScript che implementano una certa funzionalità.

Vi sono due differenze concettuali su come React e Angular organizzano il lavoro.

_Angular_ distingue i **servizi** dai **componenti**. La documentazione ufficiale dice che un servizio è un'insieme di funzionalità di cui un'applicazione necessita. Il componente dovrebbe solamente abilitare la presentazione dei contenuti e l'interazione con l'utente, ma dovrebbe delegare il 'come farlo' ad uno o più servizi.

In _React-redux_ solitamente si distinguono i _dumb components_ spesso chiamati solo **components** dagli _smart component_, solitamente chiamati (Redux) **containers**. Un container è un component connesso al Redux store (precisamente è un component 'decorato' con i dati dal redux store). Tale componente diventa 'smart' perchè è consapevole di quali dati sta visualizzando e di quali funzioni chiamare per effettuare il dispatch di azioni. I components invece gestiscono la visualizzazione dei dati, ma sono inconsapevoli della sorgente del dato e non effettuano su di esso alcun controllo. Possono essere _stateful_ o _stateless_ e solitamente sono le 'maschere' visibili all'utente.

Mentre in Angular ad un Component corrisponde sempre del codice HTML, in React non è così. Un component potrebbe funzionare da semplice wrapper,  per esempio effettuando dei controlli prima di mostrare altri componenti, e in generale decorandoli di funzionalità.

```
Esempio di SERVICE: no c'è già sotto (e anche container)   !!!!!!!!!!!!!!
```

<!-- In entrambi i casi non è il caso che tutti i componenti siano consapevoli della fonte dei dati da mostrare. Perchè siano riutilizzabili ci si affida al passsaggio di `proprietà` da un componente padre ai figli. Questo permette rendere il componente completamente inconsapevole di che tipo di dati stia manipolando, e quindi creare template comuni per visualizzare dati simili (ad esempio si pensi alle liste). -->



### Cosa serve in React.js vs Angular

Segue una lista di strumenti che sono da considerarsi indispensabili per sviluppare con entrambi gli approcci. Ovviamente Angular è un framework e pertanto include tutto quello che serve al suo interno. React.js, invece fornisce solo gli strumenti per costruire il componente `View` di un MVC. Per applicazioni più costruite diventa necessario utilizzare altri pacchetti, in modo di estrarre la logica e posizionarla all'esterno dei component, che hanno scopo presentazionale.

#### 1. Gestione dello stato

React.Js implementa un one-way data binding nel quale il flusso dei dati scende seguendo la gerarchia di componenti. Nei casi in cui serva interazione dell'utente con i componenti è però spesso necessario avere un modo di far fluire i dati nella direzione opposta, quindi dalla view, verso lo stato interno dell'applicazione. Utilizzando solamente React (senza Redux) questo si può fare solamente con un meccanismo di callback: un componente (tipicamente il _Closest Common Ancestor_) mantiene lo stato locale e i componenti al suo interno (detti figli) gestiscono la presentazione dei dati all'utente. Il componente che contiene lo stato passa come proprietà ai figli i dati da visualizzare e le funzioni da invocare quando sia necessario effettuare un'operazione sui dati. Pertanto queste funzioni sono in realtà metodi appartenenenti all'oggetto padre che esso `presta` ai figli, utilizzando le funzionalità di binding di JavaScript per 'legare il contesto di invocazione' (_this_) alla funzione prestata. 

![Flusso dei dati in React vs React-Redux](/home/alessandro/stagedev/dolphin/docs/img/state-store.svg)

**Fig. 1 Gestione dello stato in React.js con e senza Redux**

Sebbene sia quindi possibile 'spezzettare' lo stato fra i componenti questo può portare a una gerarchia di componenti difficilemtnte mantenibile, nel quale i dati devono essere passati verso il basso per diversi livelli prima di essere usati. Una scelta molto popolare è utilizzare sistemi di gestione centralizzati, come Flux e un suo derivato, Redux. Redux offre un'unico stato che contiene tutti i dati dell'applicazione. La 'connessione' dei componenti allo store di Redux viene gestita automaticamente dal pacchetto `react-redux`, che implementa un pattern `Observer` nel quale i compoennti vengono aggiornati automaticamente al cambiamento dei dati dello store.

**Angular** invece sente meno la necessità di un sistema di gestione come quelli appena descritti (sebbene sia perfettamente possibile utilizzare Flux o Redux in Angular). L'approccio che viene consigliato nel tutorial di Angular è di delegare l'ottenimento dei dati ai servizi (`services`) e utilizzare la Dependency Injection per rendere disponibile tali servizi ai componenti. I componenti, quando istanziati, poi utilizzeranno il servizio per ottenere i dati da visualizzare. Dunque non c'è bisogno di centralizzare lo stato in quanto ogni componente gestisce tramite servizi i dati che lo riguardano.

![Interazione fra componenti e servizi in Angular](/home/alessandro/stagedev/dolphin/docs/img/observable-service-data-flow.svg)



**Fig 2. Interazione fra componenti e servizi in Angular**

Nella figura sopra si vede come i componenti si interfaccino con i servizi per effettuare operazioni sui dati.

L'approccio a servizi è solitamente usato anche in React.js + Redux, anche se viene implementato in modo diverso, anche per la mancanza del meccanismo di Dependency Injection di Angular. Solitamente ogni componente ha accesso a un numero ristretto di 'azioni' di cui è possibile fare il dispatch verso lo store. Queste azioni sono l'equivalente dei metodi esposti da ogni servizio in Angular.



Link: 

- https://kuanhsuh.github.io/2017/09/28/What-s-Redux-and-how-to-use-it/
- https://medium.com/@ttemplier/angular2-decorators-and-class-inheritance-905921dbd1b7

### Redux actions e Angular services

#### Perchè serve Redux?

React e Redux sono due librerie separate e mantenute da team differenti che non devono necessariamente essere utilizzate assieme. Tuttavia l'utilizzo di React-redux rende molto semplice ed efficiente `iscrivere` i component ai 'pezzetti di stato' di cui hanno bisogno. Sarebbe tuttavia possibile seguire un apporccio simile ad Angular utilizzando RxJs utilizzando il middleware `redux-observable`.

#### React e Redux

Con React-Redux tutto lo stato dell'applicazione, i dati da visualizzare e lo stato della UI, può essere salvato all'interno del Redux store. L'unico modo di apportare modifiche a questo oggetto è effettuare il _dispatch_ di _actions_ che contengono le 'istruzioni' di cosa cambiare e come farlo. Una action non è altro che un oggetto che normalmente ha la seguente struttura:

```javascript
const typicalAction = {
	type: 'REMOVE_OBJECT' // dichiara cosa vuole fare l'azione
    payload: id 		  // eventuali parametri necessari per completare l'azione
}
```

Quando una azione viene 'mandata' verso lo store questa viene processata da un _REDUCER_. Il reducer è una funzione _pura_ che dato lo stato precedente e l'azione da compiere ritorna lo stato successivo (non modifica lo stato precedente, ma fa una _deep copy_ dell'oggetto, lo altera e lo restituisce). 

Il meccanismo ad azioni può essere sfruttato anche per 'popolare' lo store con i dati, che spesso sono inviati da un server, e quindi devono essere ottenuti tramite chiamate REST, che sono asincrone. Quindi in questo caso le azioni dovrebbero attendere che i dati arrivino. Il reducer non può sapere di questa attesa e si aspetta un risultato immediato. È possibile gestire tale asinconia utilizzando un _middleware_, che è semplicemente una funzione che attende il completamento di un'azione asincrona prima di effettuare il dispatch dell'azione appropriata verso il reducer. Questo permette di attendere risposta dal server e poi effettuare il dispatch corretto in caso di successo, oppure di errore. Per React esistono vari middleware che svolgono questo compito. Uno molto famoso e molto semplice è 'redux-thunk' (che io utilizzo). ve ne sono altri, come 'redux-saga' e `redux-promise-middleware` che offrono maggiori funzionalità, desiderabili nel caso di grosse applicazioni.

![Interazione fra azioni e stato in React-redux](/home/alessandro/stagedev/dolphin/docs/img/react-redux-flow.gif)

**Fig. 3 Interazione fra Componenti (view), azioni e stato in React-redux **



Una volta definite delle azioni asincrone che utilizzano un middleware  esse vanno rese disponibili al componente perchè le possa chiamare (ad esempio al caricamento del component). L' _injection_ avviene sfruttando le funzionalità di _react-redux_. Esso mette a disposizione la funzione `connect()`.

Tale funzione decora, utilizzando il pattern _decorator_ un component iniettando in esso delle proprietà. Serve però indicare a Redux come trasporre il suo _state_ in proprietà, fornendo solo quello che serve ad un componente. Per questa ragione si definiscono i seguenti due metodi (i nomi sono arbitrari, ma convenzionalmente sono sempre questi):

- `mapStateToProps`: definisce come lo stato di Redux deve essere trasformato nelle proprietà  che sono passate al component. In questo metodo è possibile accedere a tutto lo stato, ma difficilemente ogni sua parte sarà utile ad un componente, che avrà bisogno solo di un preciso sottoinsieme.
- `mapDispatchToProps`: nella sua implementazione base rende disponibile la funzione `dispatch` al component, permettendogli di operare azioni sullo stato, che altrimenti  non sarebbe accessibile. È però usanza comune definire anche in questo caso proprietà che corrispondono ad azioni (quindi a funzioni), anche per maggiore chiarezza.

In genere questi componenti 'connessi' allo store di Redux sono chimati _container_ perchè potendovi accedere acquisiscono la capacità di ottenere dati e modificarli.

Un esempio di _container_ è il seguente.

```javascript
import { connect } from 'react-redux'
import { someAction } from './actions'
import MyComponent from './MyComponent'

const mapStateToProps = state => ({
    prop1: state.prop1,
    prop2: state.prop2,
});

const mapDispatchToProps = dispatch => ({
    fun: () => dispatch(someAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

Nell'esempio la `connect` rende disponibile al component `MyComponent` le proprietà `prop1`, `prop2` e `fun` che è una funzione, per esempio da invocare all'avvenire di qualche evento. Questa è la maniera con cui in React è possibile separare componenti puramente presentazionali (*component*) dal meccanismo di ottenimento dei dati da visualizzare (del quale si occupa il _container_).

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

### React-router vs Angular router

In una web application non ci sono veri e propri cambi di pagina così come non si effettuano refresh.  Inoltre sarebbe impossibile utilizzare un link tradizionale perchè non si potrebbe specificare una pagina di destinazione in `<a href="">` in quanto una web app in Angular o React è una composizione di Component, e non esiste il concetto di 'pagina'. Il _routing client-side_ serve quindi a simulare la navigazione in pagine diverse permettendo di sostituire un component con un'altro component, senza effettivamente cambiare pagina o effettuare redirezioni. Il routing abilita inoltre l'utente a salvare tra i preferiti una specifica pagina dell'applicazione e ad utilizzare i pulsanti back/forward del browser nell'applicazione.

React.Js non possiede mecanismi di routing intergrati, in quanto è solo una libreria. Al contrario Angular integra il suo router tramite il pacchetto `@Angular/router`.  Vi sono varie soluzioni per React, ma la più utilizzata e una delle meglio documentate è `React-router.`

L'unica significativa differenza riguarda il funzionamento "sotto il cofano" dei due pacchetti, non tanto l'agio di utilizzo. _Angular router_ usa **routing statico**. Ovvero le route sono dichiarate in un file che viene caricato durante l'inizializzazione dell'app, prima che qualunque componente sia mostrato.

Invece in _React-router_ (dalla versione 4 in poi) il routing avviene direttamente quando viene mostrata l'applicazione, non all'avvio dell'app. Questo perchè ogni pezzo di react-router è un component, che 'decide' cosa mostrare quando esso viene caricato nell'app. In questo caso si parla di **routing dinamico**.

Per fare un esempio rapido, in React ogni _route_ viene definita da un componente `Route`. Per una route definita come `<Route path="/path" component={Component}>`, essa mostra il componente 'Component' solo se l'indirizzo del browser è '/path'. Altrimenti non mostra nulla.

React-router quindi segue l'approccio dichiarativo di React.js, nel quale ogni cosa è un componente. Angular router invece usa un approccio più tradizionale. Ad ogni modo sono diponibili pacchetti per effettuare il routing statico anche con React.

### Ciclo di sviluppo e mantenimento

Per gli sviluppatori è importante avere una versione di riferimento e sapere che il loro lavoro non sarà buttato dopo qualche mese per un aggiornamento del framework che rende inutile tutto quello che avevano fatto.

**Angular** è mantenuto dal team di sviluppo di Google. Una versione di angular è identificata dal formato `x.y.z`.

- x: _major release_ che continene nuove funzionalità e può rimuoverne di esistenti. È previsto possa dover essere fatta della manutenzione al codice dopo l'aggiornamento.
- y: _minor release_ che può introdurre nuove funzionalità, e mantiene campleta compatibilità con quelle esistenti. Non è previsto nessun 'adattamento' alle nuove aggiunte, ma potrebbe essere necessario imparare nuove API.
- z: _patch_: aggiornamento di sicurezza senza rischi associati. Corregge bug e non è necessario alcuno sforzo.

#### Frequenza

- 1 major release ogni 6 mesi
- 1-3 minor release ogni major release (quindi in circa 6 mesi)
- una patch release circa ogni settimana

#### Support & Deprecation policy

All'uscita di una nuova major release, la versione precedente entra nelle fase LTS, nella quale saranno fornite solo patch di aggiornamento per fix e per la sicurezza. Il supporto LTS ha la durata di 12 mesi. Quindi ogni versione resta supportata e aggiornata per circa 18 mesi (6 attiva + 12 LTS).

Ogni fuzionalità deprecata è listata nei changelog di ogni versione. Viene sempre fornito supporto proponendo soluzioni consigliate per aggiornare il codice rimuovendo le funzionalità deprecate. Ogni funzionalità deprecata viene supportata almeno nelle due major release successive.

Info: https://angular.io/guide/releases



**React** segue lo stesso schema di nomenclatura per la versione, ma non ha una frequenza di aggiornamento definita come Angular. Gli aggiornamenti hanno in media una cadenza mensile, ma vengono rilasciati anche più in fretta se necessario per correggere bug.

Anche in questo caso solo le major release possono introdurre cambiamenti radicali rimuovendo o deprecando funzionalità, che restano comunque supportate fino almeno alla versione successiva. La documentazione non aggiunge dettagli più precisi su questo aspetto.

Info: https://github.com/facebook/react/releases



 ## Differenze

### Data binding

Una delle differenze più evidenti è il modo di collegare il modello dei dati alle view. React è spiccatamente `one way data binding`, ovvero dal modello verso le view.

Angular, anche se può essere utilizzato allo stesso modo, rende molto conveniente collegare anche fa rispecchiare i cambiamenti sulla view (es un `<input>` modificato) direttamente al modello

`ngModel` è la direttiva che permette di collegare un certo elemento direttamente con la sorgente del dato che esso visualizza. Qui sotto uno snippet di codice **Angular** per collegare un input testuale al modello. Vi sarebbe un file contenente il seguente pezzo di HTML.

```html
<input type="text" [(ngModel)]="data.property">
```

E il corrispondente codice TypeScript in `Component.ts` sarebbe:

```typescript
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
class HeroesComponent implements OnInit {
  data: Type = {
    id: 1,
    property: 'some value'
  };
 
  constructor() { }
 
  ngOnInit() { }
 
}
```

In **React.js** invece questo va implementato 'a mano', quindi nel seguente modo.

```jsx
class Component extends React.Component {
    this.state = {
		value: ''        
    }

    handleChange(e) {
        const { value } = e.target
        this.setState({
            value,
        })
    }

    render() {
		return (
        	<input type="text" onChange={e => this.handleChange(e)} />
        )
    }
}
```

In entrambi i casi modificando il testo nella casella di input cambierebbe il valore anche nel component.

### TypeScript vs JavaScript

La nuova versione di Angular (2+) è pensata per l'utilizzo con TypeScript, con tutti i vantaggi che conseguono. La quasi totalità dei tutorial usano questo linguaggio.

React.js, invece, è più orientata a JavaScript, sebbene sia anche possibile utilizzarlo con TypeScript. La maggior parte dei progetti esistenti usa JavaScript + JSX.

Valutare se sia meglio utilizzare l'uno rispetto all'altro dipende dallo scopo così come da preferenze individuali. Quello che è certo è che dischiarare i tipi può aiutare a scriverre codice più leggibile e anche a produrre della buona documentazione.

###  Separazione fra codice HTML e JavaScript

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

### *ngFor e direttive in HTML

Comunemente si devono visualizzare liste e quindi è necessario iterare su un'array di elementi. Angular utilizza l'attributo speciale `*ngFor="let item of listItems"`, per accedere ad ogni elemento. In React.js il codice HTML corrispondente ad un componente è inserito all'interno del metodo `render()` della classe Javascript del componente. 



... mettere esempi ...



## 



### Design Pattern

Entrambi implementano il MVVM. 

- Rx.Js: Observable Pattern





### Bibliografia

- https://medium.com/dailyjs/react-and-angular-a-contrast-b19210c3fe89
- 



