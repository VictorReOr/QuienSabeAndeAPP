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
                    <h1 className="flex-grow text-2xl text-[#2D6A27] font-feria border-b-2 border-[#DFC48A]">Histórico de cuentas</h1>
                    <div className="flex-none">
                        <button type="button"
                            onDoubleClick={onRemove}
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-[#E8628A] border border-[#E8628A] rounded-full hover:bg-[#E8628A] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#E8628A]/30"
                        >
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Pruduct list */}
            <div className="overflow-y-auto flew-grow">
                <div className="flex-grow mb-4 overflow-y-auto bg-white border border-[#DFC48A] rounded-lg shadow-sm">
                    <div className="divide-y divide-[#DFC48A]/40">
                        {bills && bills?.map((bill: Bill, index: number) => (
                            <BillRow key={bill.name} bill={bill} index={index} selectedBill={selectedBill} methods={{ selectBill, removeBill }} />
                        ))}
                        {bills?.length === 0 && <div className="p-4 text-center text-[#2D6A27]">No hay cuentas disponibles</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
