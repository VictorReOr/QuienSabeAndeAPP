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
            <div className="flex items-center justify-between cursor-pointer">
                {/*Botón de expandir contraer*/}
                <button className="flex-none w-fit dark:text-gray-300 text-2xl px-4" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
                </button>
                {/*Zona de datos*/}
                <div className="min-w-52 w-52 p-4" key={bill.name} onClick={() => methods.selectBill(bill)}>
                    {/*Icono cartera*/}
                    <div className="flex items-center justify-start">
                        <div className="relative flex-shrink-0">
                            <i className={"fa-solid fa-wallet " + (selectedBill === bill.name ? "text-blue-500" : "dark:text-gray-400")} ></i>
                        </div>
                        {/*Nombre y fecha*/}
                        <div className="flex max-w-40 ms-4">
                            <p className={"text-sm font-medium truncate " + (selectedBill === bill.name ? "text-blue-500 dark:text-blue-500 font-bold" : "text-gray-900 dark:text-white")}>
                                {!isEditing && billName.current}
                                {isEditing && <input ref={inputName} onBlur={blurHandler} defaultValue={billName.current} />}
                                {' - '}
                                {moment(bill.date).format('DD/MM/YYYY')}
                            </p>
                        </div>
                    </div>
                </div>
                {/*Total de cuenta*/}
                <div className={"py-4 font-semibold text-right min-w-10 dark:text-gray-400"}>
                    {bill.total.toFixed(2)} €
                </div>
                <div className={"min-w-20 text-right text-base font-semibold text-green-700 dark:text-green-500 " + (!user.isPatner && 'hidden')}>
                    {totalDiscount.toFixed(2)} <span className="text-green-800">€</span>
                </div>
                {/*Botones de editar y borrar*/}
                <div className="flex dark:text-gray-400 px-2">
                    <button className="w-fit py-4 p-2" onClick={() => setIsEditing(!isEditing)}>
                        <i className="fa-regular fa-pen-to-square text-xl"></i>
                    </button>
                    <button className="w-fit py-4 p-2" onClick={handleDelete}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div >
            {/*Productos de la cuenta*/}
            <div className="w-max">
                <div className={(isExpanded ? 'p-4 w-full' : 'hidden ')}>
                    <ul className="w-full ml-2 divide-y divide-gray-200 dark:divide-gray-700">
                        {groupedProducts && Object.keys(groupedProducts).map((name: string) => (
                            <li className='w-full p-2 text-sm font-medium text-gray-900 truncate dark:text-white' key={name}>
                                <div className="flex justify-between text-left">
                                    <p className='w-1/3 min-w-48'>{name}</p>
                                    <p className='w-1/3 min-w-12'>x{groupedProducts[name].length}</p>
                                    <p className='w-1/3 font-semibold min-w-12 '>{groupedProducts[name].length * groupedProducts[name][0].price} €</p>
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
