import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { BillService } from '../services/bill-service';
import { UserService } from '../services/user-service';
import { Bill, Product } from '../types';

interface Props {
    bill: Bill;
    index: number;
    selectedBill: string | undefined;
    methods: {
        selectBill: (bill: Bill) => void;
        removeBill: (name: string) => void;
    }

}

export const BillRow: React.FC<Props> = ({ bill, index, selectedBill, methods }) => {
    const user = UserService.getUserConfiguration();
    const totalDiscount = bill.total - (bill.total * 0.2);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const inputName = useRef<HTMLInputElement>(null);
    const billName = useRef<string>(bill.name);

    useEffect(() => {
        if (isEditing) {
            inputName.current?.focus();
        }
    }, [isEditing]);

    const groupedProducts: { [name: string]: Product[] } = bill.products.reduce((acc: { [name: string]: Product[] }, product: any) => {
        const fixedPrice = product.price.toFixed(2);
        if (acc[product.name]) {

            acc[product.name].push({ ...product, price: fixedPrice });
        } else {
            acc[product.name] = [{ ...product, price: fixedPrice }];
        }
        return acc;
    }, {});

    const blurHandler = () => {
        if (inputName.current && inputName.current.value) {
            BillService.changeNameBill(billName.current, inputName.current.value);
            billName.current = inputName.current.value;
            methods.selectBill({ ...bill, name: billName.current });
        }
        setIsEditing(false);
    }
    const handleDelete = () => {
        methods.removeBill(bill.name);
    };

    return (
        <div className={index % 2 ? " bg-gray-50 dark:bg-gray-800" : " bg-gray-100 dark:bg-gray-900"}>
            <div className="flex items-center justify-between cursor-pointer gap-2 px-2">
                {/*Botón de expandir contraer*/}
                <button className={"flex-none dark:text-gray-300 text-2xl " + (bill.total > 0 ? '' : 'text-gray-300 dark:text-gray-600')} onClick={() => bill.total > 0 && setIsExpanded(!isExpanded)}>
                    {isExpanded ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
                </button>
                {/*Zona de datos*/}
                <div className="grow p-4" key={bill.name} onClick={() => methods.selectBill(bill)}>
                    {/*Icono cartera*/}
                    <div className="flex items-center justify-start">
                        <div className="relative flex-shrink-0">
                            <i className={"fa-solid fa-wallet " + (selectedBill === bill.name ? "text-blue-500" : "dark:text-gray-400")} ></i>
                        </div>
                        {/*Nombre y fecha*/}
                        <div className="flex max-w-40 ms-4">
                            <p className={"text-sm font-medium truncate " + (selectedBill === bill.name ? "text-blue-500 dark:text-blue-500 font-bold" : "text-gray-900 dark:text-white")}>
                                {!isEditing && billName.current + ' - ' + moment(bill.date).format('DD/MM/YYYY')}
                                {isEditing && <input ref={inputName} onBlur={blurHandler} defaultValue={billName.current} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />}
                            </p>
                        </div>
                    </div>
                </div>
                {/*Total de cuenta*/}
                <div className={"flex-none text-left font-semibold dark:text-gray-400"}>
                    {!user.isPatner && <span>{bill.total.toFixed(2).replace('.00', '')}<span className="text-gray-500">&nbsp;€</span></span>}
                    {user.isPatner && <span className="font-semibold text-green-700 dark:text-green-500">{totalDiscount.toFixed(2).replace('.00', '')}<span className="text-green-800">&nbsp;€</span></span>}
                </div>
                {/*Botones de editar y borrar*/}
                <div className="flex-none flex dark:text-gray-400 gap-2 pl-4">
                    <button className="w-fit py-4" onClick={() => setIsEditing(!isEditing)}>
                        <i className="fa-regular fa-pen-to-square text-xl"></i>
                    </button>
                    <button className="w-fit py-4" onClick={handleDelete}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div >
            {/*Productos de la cuenta*/}
            <div className="w-max">
                <div className={(isExpanded && bill.total > 0 ? 'p-4 w-full' : 'hidden ')}>
                    <ul className="w-full ml-2 divide-y divide-gray-200 dark:divide-gray-700">
                        {groupedProducts && Object.keys(groupedProducts).map((name: string) => (
                            <li className='w-full p-2 text-sm font-medium text-gray-900 truncate dark:text-white' key={name}>
                                <div className="flex justify-between text-left">
                                    <p className='w-1/3 min-w-40'>{name}</p>
                                    <p className='w-1/3 min-w-14 text-right'>x&nbsp;{groupedProducts[name].length}</p>
                                    <p className='w-1/3 font-semibold min-w-20 text-right'>
                                        {!user.isPatner && <span>{(groupedProducts[name].length * groupedProducts[name][0].price).toFixed(2)}<span className="text-gray-500">&nbsp;€</span></span>}
                                        {user.isPatner && <span className="font-semibold text-green-700 dark:text-green-500">{((groupedProducts[name].length * groupedProducts[name][0].price) * 0.8).toFixed(2)}<span className="text-green-800">&nbsp;€</span></span>}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    )
};

export default BillRow;
