
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

function checkCashRegister(price, cash, cid) {
  let changeObject = {};
  let totalCid = 0;
  let changeDue = cash - price;

  // Sum all money in cash
  cid.forEach( coin => {
    totalCid += coin[1];
  });

  if (totalCid < changeDue) {
    changeObject.status = 'INSUFFICIENT_FUNDS';
    changeObject.change = [];
  } else if ( totalCid == changeDue) {
    changeObject.status = 'CLOSED';
    changeObject.change = [...cid];
  } else {
    let reverseCid = cid.reverse();
    let numOfAvailableCoins = returnAmountOfCoins(reverseCid);
    let returnedChange = returnChangeArray(numOfAvailableCoins, changeDue);

    if (returnedChange.remaining > 0) {
      changeObject.status = 'INSUFFICIENT_FUNDS';
      changeObject.change = [];
    } else if (returnedChange.remaining == 0) {
      changeObject.status = 'OPEN';
      changeObject.change = returnedChange.change;
    }
  }

  // Here is your change, ma'am.
  return changeObject;
}

function returnAmountOfCoins(cid) {
  let coinValues = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

  return cid.map( (coin, index) => [coin[0], Math.floor(coin[1] / coinValues[index])] );
}

function returnChangeArray(arrayOfCoins, changeDue) {
  let coinValues = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let remainingCount = changeDue;
  let finalChange = [];

  arrayOfCoins.forEach( (coin, index) => {
    let requestedChangeCoins = Math.floor(remainingCount / coinValues[index]);
    let maxAvailableCoins = coin[1];
    // console.log('coins requested: ', requestedChangeCoins, ' maxAvailableCoins: ', maxAvailableCoins);
    if ( requestedChangeCoins >= 1 && maxAvailableCoins > 0) {

      if (maxAvailableCoins <= requestedChangeCoins) {
        remainingCount = (remainingCount - (maxAvailableCoins * coinValues[index])).toFixed(2);
        coin[1] = coin[1] * coinValues[index];
        finalChange.push(coin);
      } else {
        coin[1] = requestedChangeCoins * coinValues[index];
        remainingCount = (remainingCount - (requestedChangeCoins * coinValues[index])).toFixed(2);
        finalChange.push(coin);
      }
    }
  });

  return {
    remaining: remainingCount,
    change: finalChange
  };
}


const currentDrawer = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]

console.log('OPEN TEST');
console.log(checkCashRegister(3.26, 100, currentDrawer));
console.log('INSUFFICIENT FUNDS');
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))


module.exports.checkCashRegister = checkCashRegister;
module.exports.returnAmountOfCoins = returnAmountOfCoins;
module.exports.returnChangeArray = returnChangeArray;