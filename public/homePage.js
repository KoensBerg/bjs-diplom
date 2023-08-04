"use strict";

// Выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload();
      return;
    }
  });
}

// Получение информации о пользователе
ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function getExchangeRates() {
  ApiConnector.getStocks(response => {

    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}

getExchangeRates();

setInterval(() => {
  getExchangeRates();
}, 60000);

// — — — — — — — — — — — — — — — — — — —
// Операции с деньгами
// — — — — — — — — — — — — — — — — — — —

const moneyManager = new MoneyManager();

// Пополнение баланса
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    let message = '';

    if (response.success) {
      ProfileWidget.showProfile(response.data);
      message = `Счёт пополнен на ${data.amount} ${data.currency}`;
    } else {
      message = response.error;
    }

    moneyManager.setMessage(response.success, message);
  });
}

// Конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    let message = '';

    if (response.success) {
      ProfileWidget.showProfile(response.data);
      message = `Конвертировали ${data.fromAmount} ${data.fromCurrency} в ${data.targetCurrency}`;
    } else {
      message = response.error;
    }

    moneyManager.setMessage(response.success, message);
  })
}

// Перевод валюты
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    let message = '';

    if (response.success) {
      ProfileWidget.showProfile(response.data);
      message = `Перевели ${data.to} ${data.amount} в ${data.currency}`;
    } else {
      message = response.error;
    }

    moneyManager.setMessage(response.success, message);
  })
}