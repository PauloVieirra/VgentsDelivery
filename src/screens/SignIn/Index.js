import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import {ThreeDots} from 'react-loader-spinner';
import logobtn from '../../images/google-icon.png';
import './style.css';


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
  const [isLoading, setIsLoading] = useState(false);

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

      setIsLoading(true);

      // Agora, o tempo de espera está dentro do try para garantir que o loading apareça
      await new Promise(resolve => setTimeout(resolve, 3000));
      const signInResult = await signInWithEmailAndPassword(email, password, []);
      const userType = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).tipo;
      const userForm = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).formulario;
       console.log(userForm);
      // Adicione logs para depuração
      console.log('Tipo de usuário:', userType);
      console.log('Formulário do usuário:', userForm);

      if (userType === 'cliente' && userForm === false) {
        navigate('/ConfirmationPage', { state: { cartItems: [] } });
      } else if (userType === 'cliente' && userForm === true) {
        navigate('/', { state: { cartItems: [] } });
      } else if (userType === 'logista' && userForm === false) {
        navigate('/DeliveryConfLogista');
      } else if (userType === 'logista' && userForm === true) {
        navigate('/');
      } else {
        console.error('Tipo de usuário não reconhecido:', userType);
      }
    } catch (error) {
      // Trate os erros, se necessário
    } finally {
      setIsLoading(false);
    }
  };

  const handlenavegue = () => {
    navigate('/');
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
        {isLoading && (
              <div className='loading-overlay'>
               <ThreeDots 
                  height="80" 
                  width="80" 
                  radius="9"
                  color="#4fa94d" 
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                  />
              <div>Carregando...</div>
              </div>
            )}
      <div className='divform'>
        <div className='divtitlelogindesk'>
          Entre ou crie uma conta
          <div style={{ display: 'flex', width: '70%', fontSize: '14px', fontWeight: '400' }}>
            Ao se cadastrar você confirma que leu e aceita os termos de uso e privacidade
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='continput'>
            {emailError && <div style={{ color: 'red', marginTop: '10px' }}>{emailError}</div>}
            {isEmailFocused && (
              <div style={{ height: '20px' }}>
                <label htmlFor='email' className='labeldescript'>
                  Informe seu email:
                </label>
              </div>
            )}
            <input
              type='email'
              id='email'
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
                <label htmlFor='email' className='labeldescript'>
                  Informe sua senha:
                </label>
              </div>
            )}
            <input
              type='password'
              id='password'
              placeholder='Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPassFocused(true)}
              onBlur={() => setIsPassFocused(false)}
              onClick={handlePasswordClick}
            />
          </div>
          <div style={{ marginTop: '30px' }}>
            <button type='submit' className='buttonprimary'>
              Entrar
            </button>
          </div>
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleSignUp} className='buttonsecundary'>
              Criar conta
            </button>
          </div>
          <div className='conttitle'>Ou, use uma conta abaixo!</div>
          <div onClick={handleSignInWithGoogle} className='google-button'>
            <div className='google-icon'>
              <img src={logobtn} alt='' className='google-icon-cont' />
            </div>
            <div className='google-text'>Entrar com o Google</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
