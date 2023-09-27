import React,{useState} from 'react';
import './style.css';
import { useAuth } from '../../Context/AuthContext';
import LogoutButton from '../../Components/Logout';
import FormularioComplementoLogista from '../../Components/FormcomplitLogista/Index';




export default function LogistaHome() {
  const {user} = useAuth();
 return (
   <div className='contlogista'>
   <p>Logista Home</p> 
   <LogoutButton/>
    {user.name}
   <FormularioComplementoLogista/>
  
    </div>
  );
}