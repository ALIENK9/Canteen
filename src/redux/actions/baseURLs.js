// const ip = '192.168.30.102';
const ip = '192.168.32.15';
const port = '9004';

const baseURL = {
  // RETE SYNCLAB
  users: `http://${ip}:${port}/authentication/api/public/users`,
  auth: `http://${ip}:${port}/authentication/api/login`,
  menus: `http://${ip}:${port}/menu/api/menuplan`,
  reservations: `http://${ip}:${port}/reservation/api/reservations`,
  dishes: `http://${ip}:${port}/dish/api/dishes`,
  report: `http://${ip}:${port}/reservation/api/report/download`,
};

export default baseURL;
