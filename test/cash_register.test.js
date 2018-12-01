
import checkCashRegister from '../js/cash_register';

describe('CHECK CASH REGISTER', () => {
  it('should always return an object with "status" and "change" keys', () => {
    const cashTest = checkCashRegister(19.5, 20, [['PENNY', 0.01], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 0], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]);

    expect(typeof cashTest).toBe('object');
    expect(cashTest).toHaveProperty('status');
    expect(cashTest).toHaveProperty('change');
  });

  it('should return {status: "INSUFFICIENT_FUNDS" change: []} if cid is less than change due.', () => {
    const failDrawer = checkCashRegister(19.5, 20, [['PENNY', 0.01], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 0], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]);

    expect(failDrawer.status).toBe('INSUFFICIENT_FUNDS');
    expect(Array.isArray(failDrawer.change)).toBe(true);
    expect(failDrawer.change.length).toBe(0);
  });

  it('should return {status: "INSUFFICIENT_FUNDS" change: []} if you cannot return the exact change.', () => {
    const inexactChange = checkCashRegister(19.5, 20, [['PENNY', 0.01], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 1], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]);

    expect(inexactChange.status).toBe('INSUFFICIENT_FUNDS');
    expect(Array.isArray(inexactChange.change)).toBe(true);
    expect(inexactChange.change.length).toBe(0);
  });

  it('should return {status: "CLOSED", change: [...]} with cid as change if it is equal to the change due', () => {
    const closedDrawer = checkCashRegister(19.5, 20, [['PENNY', 0.5], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 0], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]);

    expect(closedDrawer.status).toBe('CLOSED');
    expect(Array.isArray(closedDrawer.change)).toBe(true);
    expect(closedDrawer.change.length).toBeGreaterThan(0);
    expect(closedDrawer.change).toEqual([['PENNY', 0.5], ['NICKEL', 0], ['DIME', 0], ['QUARTER', 0], ['ONE', 0], ['FIVE', 0], ['TEN', 0], ['TWENTY', 0], ['ONE HUNDRED', 0]]);
  });

  it('should return {status: "OPEN", change: [...]}, with the change due in coins and bills sorted in highest to lowest order', () => {
    const openDrawer = checkCashRegister(19.5, 20, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.1], ['QUARTER', 4.25], ['ONE', 90], ['FIVE', 55], ['TEN', 20], ['TWENTY', 60], ['ONE HUNDRED', 100]]);
    const secondOpenDrawer = checkCashRegister(3.26, 100, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.1], ['QUARTER', 4.25], ['ONE', 90], ['FIVE', 55], ['TEN', 20], ['TWENTY', 60], ['ONE HUNDRED', 100]]);

    // First open drawer
    expect(openDrawer.status).toBe('OPEN');
    expect(openDrawer.change).toEqual([['QUARTER', 0.5]]);
    // Second open drawer
    expect(secondOpenDrawer.status).toBe('OPEN');
    expect(secondOpenDrawer.change).toEqual([['TWENTY', 60], ['TEN', 20], ['FIVE', 15], ['ONE', 1], ['QUARTER', 0.5], ['DIME', 0.2], ['PENNY', 0.04]]);
  });
});
