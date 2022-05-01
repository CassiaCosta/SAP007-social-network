/*
* @jest-environment jsdom
*/
/* eslint-disable */
import signup from '../src/pages/signup.js';
import login from '../src/pages/login.js';
import { register, toLogIn } from '../src/services/authentication.js';

describe('register', () => {
  it('Deverá ser uma função', () => {
    expect(typeof register).toBe('function');
  });
});

describe('register', () => {
  it('Deverá registrar corretamente', () => {
    register.mockResolvedValueOnce();
        const name = 'Jesus Amado';
        const email = 'ajuda@deus.com';
        const password = '123456';
        const page = signup();
        const nameInput = page.querySelector('#name-input');
        const emailInput = page.querySelector('#email-input');
        const passwordInput = page.querySelector('#password-input');
        const btnRegister = page.querySelector('#register-button');

        nameInput.value = name;
        emailInput.value = email;
        passwordInput.value = password;
        
        btnRegister.dispatchEvent(new Event('click'));

    expect(register).toHaveBeenCalledWith(name, email, password);
    expect(register).toHaveBeenCalledTimes(1);
  });
});

describe('login', () => {
  it('Deverá ser uma função', () => {
    expect(typeof toLogIn).toBe('function');
  });
});

describe('login', () => {
  it('Deverá logar corretamente', () => {
    toLogIn.mockResolvedValueOnce();
        const email = 'ajuda@deus.com';
        const password = '123456';
        const page = login();
        const emailLogin = page.querySelector('#email-input');
        const passwordLogin = page.querySelector('#password-input');
        const btnLogin = page.querySelector('#enter-button');

        emailLogin.value = email;
        passwordLogin.value = password;
        
        btnLogin.dispatchEvent(new Event('click'));

    expect(toLogIn).toHaveBeenCalledWith(email, password);
    expect(toLogIn).toHaveBeenCalledTimes(1);
  });
});

jest.mock('../src/services/authentication.js');
jest.mock('../src/export.js');
