import { Bill, Product } from '../types';
import { LocalStorageService } from './local-storage-service';

export class BillService {

    static KEY: string = 'billing-bills';

    /**
     * Add a new bill.
     *
     * @param {Bill} newBill New bill.
     */
    public static add(newBill: Bill): Bill {
        const bills: Bill[] = BillService.getBills();
        bills.unshift(newBill);
        LocalStorageService.set(BillService.KEY, bills);
        return newBill;
    };

    /**
     * Add a new bill.
     *
     * @param {string} billName Bill name.
     */
    public static addNew(billName?: string): Bill {
        const bills: Bill[] = BillService.getBills();
        const name = billName || 'Cuenta ' + (bills.length + 1);
        const newBill = { name, date: new Date().toISOString(), products: [], total: 0 };
        return BillService.add(newBill);
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
    };
}