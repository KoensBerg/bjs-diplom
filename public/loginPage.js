"use strict";

const userForm = new UserForm();

// Авторизация
userForm.loginFormCallback = data => {
  ApiConnector.login(data, response => {
    if (response.success) {
      location.reload();
      return;
    }
    
    return userForm.setLoginErrorMessage(response.error);
  });
}

// Регистрация
userForm.registerFormCallback = data => {
  ApiConnector.register(data, response => {
    if (response.success) {
      location.reload();
      return;
    }

    return userForm.setRegisterErrorMessage(response.error);
  });
}