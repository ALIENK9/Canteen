import fetchDefaults from 'fetch-defaults';

class FetchDefaults {
  constructor() {
    this.fetch = fetch;
  }

  setFetch(headers) {
    this.fetch = fetchDefaults(fetch, { headers });
  }

  getFetch() { return this.fetch; }
}
