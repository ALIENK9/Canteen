const ip = '192.168.30.102';
const port = '9004';

const baseURL = {
  // HEROKU

  /*
  users: 'https://loginmensa.herokuapp.com/api/public/users',
  auth: 'https://loginmensa.herokuapp.com/api/login',
  menus: 'https://menumensa.herokuapp.com/api/menuplan',
  reservations: 'https://reservationsmensa.herokuapp.com/api/reservations',
  dishes: 'https://dishmensa.herokuapp.com/api/dishes',
  // report: 'https://reservationsmensa.herokuapp.com/api/report/download',
  */

  // report: 'http://192.168.43.126:9003/api/report/download',
  // auth: `http://${ip}:9000/api/login`,


  // RETE LOCALE
  users: `http://${ip}:${port}/authentication/api/public/users`,
  auth: `http://${ip}:${port}/authentication/api/login`,
  menus: `http://${ip}:${port}/menu/api/menuplan`,
  reservations: `http://${ip}:${port}/reservation/api/reservations`,
  dishes: `http://${ip}:${port}/dish/api/dishes`,
  report: `http://${ip}:${port}/reservation/api/report/download`,
};

export default baseURL;
