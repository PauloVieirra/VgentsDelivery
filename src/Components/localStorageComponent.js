const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;

const local = userData ? userData.complemento.cidade : null;
const userimage = userData ? userData.img : null;

export { userData, local, userimage };