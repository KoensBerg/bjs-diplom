"use strict";

// Выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload();
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

setInterval(getExchangeRates(), 60000);

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
      message = `Успешно выполнен перевод на сумму ${data.amount} ${data.currency}`;
    } else {
      message = response.error;
    }

    moneyManager.setMessage(response.success, message);
  })
}

// — — — — — — — — — — — — — — — — — — —
// Работа с Избранным
// — — — — — — — — — — — — — — — — — — —
const favoritesWidget = new FavoritesWidget();

// Запрашиваем список избранных пользователей
ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

// Добавление пользователя в Избранное
favoritesWidget.addUserCallback = (data) => {
  let message = '';

  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      message = `Пользователь "${data.name}" добавлен в Избранное`;
    } else {
      message = response.error;
    }

    favoritesWidget.setMessage(response.success, message);
  });
}

// Удаление пользователя из Избранного
favoritesWidget.removeUserCallback = (data) => {
  let message = '';

  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      message = `Пользователь удалён из Избранного`;
    } else {
      message = response.error;
    }

    favoritesWidget.setMessage(response.success, message);
  })
}