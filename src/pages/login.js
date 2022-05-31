import { toLogIn, loginGoogle, redefinePassword } from '../services/authentication.js';
import { footerItems } from './components/footer.js';

export default () => {
  const footer = document.querySelector('.root-footer');
  const loginArea = document.querySelector('.root');
  // const loginArea = document.createElement('section');
  // loginArea.classList.add('login');

  loginArea.innerHTML = `
    <section class="main-login">
      <picture>
        <img src="img/logo.png" alt="Logo Laboriam" class="logo">
      </picture>
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="E-mail" id="email-input">
        <input type="password" placeholder="Senha" id="password-input">
        <p id="error-message" class="error-message"></p>
        <button type="button" id="enter-button" class="enter-button">
          <a href="/#feed">Entrar</a>
        </button>
      </form>
      <a id="redefine-password" class="redefine-password">Esqueceu a senha?</a>
      <section class="login-alternative">
        <div></div>
        <p>OU</p>
        <div></div>
      </section>
      <section class="buttons">
        <button class="google" id="google">
          <img src="img/icon-google.png" alt="Ícone do Google" class="google-icon">
        </button>
      </section>
      <p class="createAnAccount">Não tem uma conta? <a href="./#signup">Criar conta</a></p>
    </section>
    <picture>
      <img src="img/templateFeed.png" alt="Imagem ilustrativa de celulares" class="phones-image">
    </picture>
`;

  footer.innerHTML = footerItems;

  const emailInput = loginArea.querySelector('#email-input');
  const passwordInput = loginArea.querySelector('#password-input');
  const googleButton = loginArea.querySelector('#google');
  const enterButton = loginArea.querySelector('#enter-button');
  const errorMessage = loginArea.querySelector('#error-message');
  const resetPasswordButton = loginArea.querySelector('#redefine-password');

  enterButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (emailInput.value && passwordInput.value) {
      toLogIn(emailInput.value, passwordInput.value);
    } else if (emailInput.valor === '' || passwordInput.value === '') {
      errorMessage.innerHTML = ' Preencher todos os campos!';
    } else {
      errorMessage.innerHTML = ' Ocorreu algum erro! Tente novamente mais tarde.';
    }
  });

  googleButton.addEventListener('click', (e) => {
    e.preventDefault();
    loginGoogle(errorMessage);
  });

  resetPasswordButton.addEventListener('click', (e) => {
    e.preventDefault();
    redefinePassword(emailInput.value, errorMessage);
  });

  return loginArea;
};
