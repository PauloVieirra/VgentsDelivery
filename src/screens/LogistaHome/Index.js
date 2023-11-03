import React,{useState} from 'react';
import './style.css';
import { useAuth } from '../../Context/AuthContext';
import LogoutButton from '../../Components/Logout';
import { userData, form } from '../../Components/localStorageComponent';
import FormularioComplementoLogista from '../../Components/FormcomplitLogista/Index';




export default function LogistaHome() {
  const {user} = useAuth();
  const formenvio = form;
  
 

 return (
   <div className='contlogista'>
   <p>Logista Home</p> 
   <LogoutButton/>
   {formenvio === false &&(
    <FormularioComplementoLogista/>
   )}
    </div>
  );
}