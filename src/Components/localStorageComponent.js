const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;

const email = userData ? userData.email : null;
const name = userData ? userData.name : null;
const local = userData ? userData.complemento.cidade : null;
const userimage = userData ? userData.img : null;
const identidade = userData ? userData.UID : null;

export { userData, local, userimage, name, email, identidade };