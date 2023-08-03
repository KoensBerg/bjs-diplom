"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = data => {
  console.log(data);

  ApiConnector.login(data, responce => {
    console.log(responce);

    if (responce.success) {
      location.reload();
      return;
    }
    throw new Error(`${responce.error}`);
  });
}

userForm.registerFormCallback = data => {
  console.log(data);

  ApiConnector.register(data, responce => {
    if (responce.success) {
      location.reload();
      return;
    }
    throw new Error(`${responce.error}`);
  });
}