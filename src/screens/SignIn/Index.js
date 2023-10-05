import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './style.css';
import logobtn from '../../images/google-icon.png';
import motodriver from '../../images/mototax.gif';

const ConnectionStatusModal = () => {
  return (
    <div className="connection-modal">
      <p>Você está sem conexão com a internet. Aguarde até que a conexão seja restabelecida.</p>
    </div>
  );
};

const SignIn = () => {
  const { signInWithEmailAndPassword, signInWithGoogle, getFriendlyErrorMessage } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [connectError, setConnectError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const navigate = useNavigate();

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  useEffect(() => {
    const savedUserFormulario =
      localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).formulario;
    // setUserFormulario(savedUserFormulario || ''); // Comentado, pois não está definido no código
  }, []);

  const handleEmailClick = () => {
    setEmailError(null);
    setIsEmailFocused(true);
  };

  const handlePasswordClick = () => {
    setPasswordError(null);
    setIsPassFocused(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setEmailError(null);
      setPasswordError(null);
      setConnectError(null);
      if (!isOnline) {
        setConnectError('Sem conexão com a internet');
        return;
      }


      const signInResult = await signInWithEmailAndPassword(email, password, []);

      const userType = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).tipo;
      const userForm = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).formulario;

      if (userType === 'cliente' && userForm === false) {
        navigate('/ConfirmationPage', { state: { cartItems: [] } });
      } else if (userType === 'cliente' && userForm === true) {
        navigate('/', { state: { cartItems: [] } });
      } else if (userType === 'logista' && userForm === false) {
        navigate('/ConfirmationPage');  
      } else if (userType === 'logista' && userForm === true) {
        navigate('/');
      } else {
        console.error('Tipo de usuário não reconhecido:', userType);
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
        setEmailError(getFriendlyErrorMessage(error.code));
      } else if (error.code === 'auth/wrong-password') {
        setPasswordError(getFriendlyErrorMessage(error.code));
      } else if (error.code === 'auth/network-request-failed') {
        setConnectError(getFriendlyErrorMessage(error.code));
      } else {
        console.error('Erro no login:', error.message);
      }
    }
  };

  const handleSignUp = () => {
    const storedCartItems = localStorage.getItem('cartItems');
    const cartItems = JSON.parse(storedCartItems || '[]');
    navigate('/SignUp', { state: { cartItems } });
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Erro no login com o Google:', error.message);
    }
  };

  return (
    <div className='containerlogin'>
      <div className='contleft'>
      {connectError && <ConnectionStatusModal />}
     
      <img src={motodriver} alt="" className='imgdriver' />
      </div>
      
      <div className='divform'>
      <div className='conttittle'> </div>
        <form onSubmit={handleSubmit}>
          <div className='continput'>
            {emailError && <div style={{ color: 'red', marginTop: '10px' }}>{emailError}</div>}
            {isEmailFocused && (
              <div style={{ height: '20px' }}>
                <label htmlFor="email" className='labeldescript'>Informe seu email:</label>
              </div>
            )}
            <input
              type="email"
              id="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              onClick={handleEmailClick}
            />
          </div>
          <div className='continput'>
            {passwordError && <div style={{ color: 'red', marginTop: '10px' }}>{passwordError}</div>}
            {isPassFocused && (
              <div style={{ height: '20px' }}>
                <label htmlFor="email" className='labeldescript'>Informe sua senha:</label>
              </div>
            )}
            <input
              type="password"
              id="password"
              placeholder='Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPassFocused(true)}
              onBlur={() => setIsPassFocused(false)}
              onClick={handlePasswordClick}
            />
          </div>
          <div style={{ marginTop: '40px' }}>
            <button type="submit" className='buttonprimary'>Entrar</button>
          </div>
          <div style={{ marginTop: '16px' }}>
            <button onClick={handleSignUp} className='buttonsecundary'> Criar conta </button>
          </div>
          <div className='conttitle'>Ou, use uma conta abaixo!</div>
          <div onClick={handleSignInWithGoogle} className='google-button'>
            <div className='google-icon'>
              <img src={logobtn} alt="" className='google-icon-cont'/>
            </div>
            <div className='google-text'>
              Entrar com o Google
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
