import React from 'react';
import { Button } from 'react-bootstrap';
import MyPanel from './Panel';


const ForbiddenPage = () => (
  <MyPanel title="Forbidden" className="center">
    <p>
      Non hai i permessi per accedere a questa pagina
      {' '}
    </p>
    <Button href="/home">
      Torna alla Homepage
    </Button>
  </MyPanel>
);

export default ForbiddenPage;
