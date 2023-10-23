import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { isValidEmail, isValidPassword, isValidName } from '../../Components/Helpers';
import './style.css';

const ErrorLabel = ({ error }) => (
  <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
);

const SignUp = () => {
  const { signUpWithEmailAndPassword } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Novo estado

  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      const timeoutId = setTimeout(() => {
        navigate('/'); // Redirecionar após 2 segundos
      }, 2000);

      // Limpar o timeout ao desmontar o componente
      return () => clearTimeout(timeoutId);
    }
  }, [successMessage, navigate]);

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError(isValidEmail(value) ? null : 'Email inválido. Por favor, insira um email válido.');
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError(isValidPassword(value) ? null : 'Senha inválida. A senha deve conter pelo menos 6 caracteres com letras e números.');
  };

  const handleNameChange = (value) => {
    setName(value);
    setIsNameFocused(true);
    setEmailError(isValidName(value) ? null : 'Nome inválido. O nome deve conter apenas letras e espaços.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidName(name)) {
      setIsNameFocused(true);
      setEmailError('Nome inválido. O nome deve conter apenas letras e espaços.');
      return;
    }

    if (!isValidEmail(email)) {
      setIsEmailFocused(true);
      setEmailError('Email inválido. Por favor, insira um email válido.');
      return;
    }

    if (!isValidPassword(password)) {
      setIsPassFocused(true);
      setPasswordError('Senha inválida. A senha deve conter pelo menos 6 caracteres com letras e números.');
      return;
    }

    const tipo = 'cliente';
    const formulario = false;

    try {
      const storedCartItems = localStorage.getItem('cartItems');
      const cartItems = JSON.parse(storedCartItems || '[]');

      const signUpResult = await signUpWithEmailAndPassword(email, password, name, tipo, formulario, cartItems);

      if (signUpResult.redirectToConfirmation) {
        navigate('/ConfirmationPage', { state: { cartItems, tipo, formulario } });
      } else {
        setSuccessMessage('Cadastro feito com sucesso!');
      }
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        setPasswordError('Senha fraca. A senha deve conter pelo menos 6 caracteres com letras e números.');
      } else if (error.code === 'auth/email-already-in-use') {
        setEmailError('O email informado já está em uso por outra conta. Por favor, use outro email.');
      } else {
        alert('Erro no cadastro. Por favor, tente novamente mais tarde.'); // Você pode personalizar isso conforme necessário
      }
      console.error('Erro no cadastro:', error);
    }
  };

  const handlenavigate = () => {
    navigate('/SignIn');
  };

  return (
    <div className='containersignup'>
      <div className='divform'>
       
        <div className='divtitlelogindesk'>
          Crie uma conta
          <div style={{ display: 'flex', width: '70%', fontSize: '14px', fontWeight: '400' }}>
            Ao se cadastrar você confirma que leu e aceita os termos de uso e privacidade
          </div>
        </div>
        {successMessage ? (
          <div style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='continput'>
              {isNameFocused && <ErrorLabel error={emailError} />}
              {isNameFocused && (
                <div style={{ height: '20px' }}>
                  <label htmlFor="name" className='labeldescript'>Informe seu nome:</label>
                </div>
              )}
              <input
                type="text"
                id="name"
                placeholder='Nome'
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                onFocus={() => setIsNameFocused(true)}
                onBlur={() => setIsNameFocused(false)}
              />
            </div>
            <div className='continput'>
              {isEmailFocused && <ErrorLabel error={emailError} />}
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
                onChange={(e) => handleEmailChange(e.target.value)}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />
            </div>
            <div className='continput'>
              {isPassFocused && <ErrorLabel error={passwordError} />}
              {isPassFocused && (
                <div style={{ height: '20px' }}>
                  <label htmlFor="password" className='labeldescript'>Informe sua senha:</label>
                </div>
              )}
              <input
                type="password"
                id="password"
                placeholder='Senha'
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                onFocus={() => setIsPassFocused(true)}
                onBlur={() => setIsPassFocused(false)}
              />
            </div>
            <button type="submit" className='buttonprimary'>Cadastrar</button>
          </form>
        )}
        <div>Já tem uma conta? <Link to="/SignIn">Faça o login aqui</Link></div>
      </div>
    </div>
  );
};

export default SignUp;
