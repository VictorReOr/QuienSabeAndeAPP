import { Bill, Product } from '../types';
import { LocalStorageService } from './local-storage-service';

export class BillService {

    static KEY: string = 'billing-bills';
    static KEY_LAST_INDEX = 'billing-last-index';

    /**
     * Add a new bill.
     *
     * @param {Bill} newBill New bill.
     */
    public static add(newBill: Bill, lastIndex: number): Bill {
        const bills: Bill[] = BillService.getBills();
        bills.unshift(newBill);
        LocalStorageService.set(BillService.KEY, bills);
        LocalStorageService.set(BillService.KEY_LAST_INDEX, lastIndex + 1 || 0);
        return newBill;
    };

    /**
     * Add a new bill.
     *
     * @param {string} billName Bill name.
     */
    public static addNew(billName?: string): Bill {
        let lastIndex: number = LocalStorageService.get(BillService.KEY_LAST_INDEX) || 0;
        const name = billName || 'Cuenta ' + (lastIndex + 1);
        const newBill = { name, date: new Date().toISOString(), products: [], total: 0 };
        return BillService.add(newBill, lastIndex);
    };

    /**
     * Update bill.
     *
     * @param {Bill} bill Bill.
     */
    public static addProductToBill(bill: Bill, product: Product): Bill {
        bill.products.push(product);
        bill.total += product.price;
        BillService.updateBill(bill);
        return bill;
    }

    /**
     * Get current bill.
     *
     * @returns {Bill} Current bill.
     */
    public static getBill(name?: string): Bill {
        const bills = BillService.getBills();
        return name ? bills.find((bill: Bill) => bill.name === name) : bills[0];
    }

    /**
     * Get all bills.
     *
     * @returns {Bill[]} Bills.
     */
    public static getBills() {
        return LocalStorageService.get(BillService.KEY) || [];
    }

    /**
     * Remove product from bill.
     *
     * @param {Bill} bill Bill.
     * @param {Product} product Product.
     * @returns {Bill} Updated bill.
     */
    public static removeProductFromBill(bill: Bill, product: Product): Bill {
        const index = bill.products.findIndex((p) => p.name === product.name);
        if (index !== -1) {
            bill.products.splice(index, 1);
            bill.total -= product.price;
            BillService.updateBill(bill);
        }
        return bill;
    }

    /**
     * Update bill.
     *
     * @param {Bill} bill Bill.
     */
    public static updateBill(bill: Bill) {
        const bills = BillService.getBills();
        const index = bills.findIndex((b: Bill) => b.name === bill.name);
        if (index !== -1) {
            bills[index] = bill;
            LocalStorageService.set(BillService.KEY, bills);
        }
    }

    /**
     * Remove all bills.
     */
    public static removeAllBills() {
        LocalStorageService.remove(BillService.KEY);
        LocalStorageService.set(BillService.KEY_LAST_INDEX, 0);

    };

    /**
     * Remove all bills.
     */
    public static removeBill(name: string) {
        const storedBills = LocalStorageService.get(BillService.KEY);
        const updatedBills = storedBills.filter((bill: Bill) => bill.name !== name);
        LocalStorageService.set(BillService.KEY, updatedBills);
        return updatedBills
    };

    /**
     * Change the name of a bill.
     */
    public static changeNameBill(oldName: string, newName: string) {
        const storedBills = LocalStorageService.get(BillService.KEY);
        const index = storedBills.findIndex((bill: Bill) => bill.name === oldName);
        if (index === -1) {
            return;
        }
        storedBills[index] = { ...storedBills[index], name: newName };
        LocalStorageService.set(BillService.KEY, storedBills);

    };
}