import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function FooterNavigation() {
    
 return (
   <div className='containerfooter' >
     <Link to={'/'}> <div className='btnmenu' style={{marginLeft:'30px'}}> Inicio </div></Link>
     <Link to={'/MeusPedidos'}> <div className='btnmenu' > Histor </div></Link>
     <Link to={'/CartModal'}> <div className='btnmenu'> Carr </div></Link>
     <Link to={'/'}> <div className='btnmenu' style={{marginRight:'30px'}} > Conta </div></Link>
   </div>
  );
}