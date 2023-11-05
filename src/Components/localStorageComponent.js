const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;

const email = userData ? userData.email : null;
const name = userData ? userData.name : null;
const local = userData ? userData.cidade : null;
const form = userData ? userData.formulario : null;
const userimage = userData ? userData.img : null;
const identidade = userData ? userData.UID : null;
console.log(identidade);

export { userData, local, userimage, name, email, identidade, form };