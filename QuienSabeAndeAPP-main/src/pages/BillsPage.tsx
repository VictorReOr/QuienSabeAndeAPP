import { useState } from 'react';
import { BillService } from '../services/bill-service';
import { UserService } from '../services/user-service';
import { Bill } from '../types';
import BillRow from '../components/BillRow';

export function BillsPage() {
    const user = UserService.getUserConfiguration();
    const [bills, setBills] = useState(BillService.getBills());
    const [selectedBill, setSelectedBill] = useState(user.selectedBill);


    const onRemove = () => {
        BillService.removeAllBills();
        setBills([]);
        UserService.updateUserConfiguration({ selectedBill: undefined });
    };

    const selectBill = (bill: Bill) => {
        setSelectedBill(bill.name);
        UserService.updateUserConfiguration({ selectedBill: bill.name });
        setBills(BillService.getBills());
    }

    const removeBill = (name: string) => {
        setBills(BillService.removeBill(name));
    }
    return (
        <div className="flex flex-col h-full">
            {/* Header: Search and total */}
            <div className="flex-none p-2 mb-4">
                <div className="flex content-center">
                    <h1 className="flex-grow text-2xl dark:text-gray-400">Histórico de cuentas</h1>
                    <div className="flex-none">
                        <button type="button"
                            onDoubleClick={onRemove}
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 border border-gray-700 rounded-full hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500"
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Pruduct list */}
            <div className="overflow-y-auto flew-grow">
                <div className="flex-grow mb-4 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {bills && bills?.map((bill: Bill, index: number) => (
                            <BillRow key={bill.name} bill={bill} index={index} selectedBill={selectedBill} methods={{ selectBill, removeBill }} />
                        ))}
                        {bills?.length === 0 && <div className="p-4 text-center dark:text-gray-400">No hay cuentas disponibles</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
