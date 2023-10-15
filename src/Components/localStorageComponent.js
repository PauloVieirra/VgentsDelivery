const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;


const cidade = userData ? userData.complemento.cidade : null;
const endereco = userData ? userData.complemento.bairro : null;
const numero = userData ? userData.complemento.numero : null;

export { userData, cidade,endereco, numero };