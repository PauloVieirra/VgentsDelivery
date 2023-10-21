import React,{useState} from 'react';
import iconbarmenuclose from '../../images/closemenu.png';
import LogoutButton from '../Logout';
import { userData, userimage, name, email } from '../localStorageComponent';
import './style.css';

export default function SideMenu() {
   
  

 return (
  <div className='menu-lateral'>
  <div
    style={{
      display: 'flex',
      width: '100%',
      height: '160px',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '20px',
    }}
  >
   
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width:'100%',
        height: '300px',
        alignItems: 'center',
      }}
    >
      <div className='contimgperson'>
      <img src={userimage} className='imguserinit'/>
      </div>
      <div style={{width:'100%', height:'80px'}}/>
      <div style={{  fontWeight: '600', fontSize:'20px'}}>
        {localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).name}
      </div>
      <div style={{ fontSize: '16px' }}>{localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).email}</div>
    </div>
  </div>
  <div style={{ display: 'flex', position: 'absolute', bottom: '20px', left: '20px' }}>
    <LogoutButton />
  </div>
</div>
  );
}