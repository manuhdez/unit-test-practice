
/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as
the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid)
as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a
change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change
due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change
if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills,
sorted in highest to lowest order, as the value of the change key.
*/

function returnAmountOfCoins(cid) {
  const coinValues = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

  return cid.map((coin, index) => [coin[0], Math.floor(coin[1] / coinValues[index])]);
}

function returnChangeArray(arrayOfCoins, changeDue) {
  const coinValues = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let remainingCount = changeDue;
  const finalChange = [];

  arrayOfCoins.forEach((coin, index) => {
    const requestedChangeCoins = Math.floor(remainingCount / coinValues[index]);
    const maxAvailableCoins = coin[1];

    if (requestedChangeCoins >= 1 && maxAvailableCoins > 0) {
      if (maxAvailableCoins <= requestedChangeCoins) {
        remainingCount = (remainingCount - (maxAvailableCoins * coinValues[index])).toFixed(2);
        coin[1] *= coinValues[index];
        finalChange.push(coin);
      } else {
        coin[1] = requestedChangeCoins * coinValues[index];
        remainingCount = (remainingCount - (requestedChangeCoins * coinValues[index])).toFixed(2);
        finalChange.push(coin);
      }
    }
  });

  return {
    remaining: +remainingCount,
    change: finalChange,
  };
}

const checkCashRegister = (price, cash, cid) => {
  const changeObject = {};
  let totalCid = 0;
  const changeDue = cash - price;

  // Sum all money in cash
  cid.forEach((coin) => {
    totalCid += coin[1];
  });

  if (totalCid < changeDue) {
    changeObject.status = 'INSUFFICIENT_FUNDS';
    changeObject.change = [];
  } else if (totalCid === changeDue) {
    changeObject.status = 'CLOSED';
    changeObject.change = [...cid];
  } else {
    const reverseCid = cid.reverse();
    const numOfAvailableCoins = returnAmountOfCoins(reverseCid);
    const returnedChange = returnChangeArray(numOfAvailableCoins, changeDue);

    if (returnedChange.remaining > 0) {
      changeObject.status = 'INSUFFICIENT_FUNDS';
      changeObject.change = [];
    } else if (returnedChange.remaining === 0) {
      changeObject.status = 'OPEN';
      changeObject.change = returnedChange.change;
    }
  }

  // Here is your change, ma'am.
  return changeObject;
};

export default checkCashRegister;
