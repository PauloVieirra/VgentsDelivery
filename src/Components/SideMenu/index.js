import React,{useState} from 'react';
import iconbarmenuclose from '../../images/closemenu.png';
import LogoutButton from '../Logout';
import './style.css';

export default function SideMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar a exibição do menu
  

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Inverter o estado do menu ao clicar no ícone do menu
      };


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
            <img src={iconbarmenuclose} alt="" className='iconmenuclose' onClick={toggleMenu} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                alignItems: 'center',
                paddingTop: '80px',
              }}
            >
              <div className='imguserinit'>foto</div>
              <div style={{ fontSize: '18px', fontWeight: '600', marginTop: '8px' }}>
                {localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).name}
              </div>
              <div style={{ fontSize: '14px' }}>{localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).email}</div>
            </div>
          </div>
          <div style={{ display: 'flex', position: 'absolute', bottom: '20px', left: '20px' }}>
            <LogoutButton />
          </div>
        </div>
  );
}