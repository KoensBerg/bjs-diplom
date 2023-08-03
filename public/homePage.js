"use strict";

const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout(responce => {
    console.log(responce);

    if (responce.success) {
      location.reload();
      return;
    }
    throw new Error(`${responce.error}`);
  });
}