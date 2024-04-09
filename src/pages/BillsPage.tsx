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
    }

    const removeBill = (name: string) => {
        setBills(BillService.removeBill(name));
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header: Search and total */}
            <div className="flex-none mb-4 p-2">
                <div className="flex content-center">
                    <h1 className="flex-grow dark:text-gray-400 text-2xl">Histórico de cuentas</h1>
                    <div className="flex-none">
                        <button type="button"
                            onDoubleClick={onRemove}
                            className="border border-gray-700 hover:bg-gray-700 text-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500"
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Pruduct list */}
            <div className="flew-grow overflow-y-auto">
                <div className="flex-grow overflow-y-auto mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {bills && bills?.map((bill: Bill, index: number) => (
                            <BillRow key={crypto.randomUUID()} bill={bill} index={index} selectedBill={selectedBill} methods={{ selectBill, removeBill }} />
                        ))}
                        {bills?.length === 0 && <div className="dark:text-gray-400 text-center">No hay cuentas disponibles</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
