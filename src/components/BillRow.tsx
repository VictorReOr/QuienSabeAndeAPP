import React, { useState, useRef, useEffect } from 'react';
import { UserService } from '../services/user-service';
import { BillService } from '../services/bill-service';
import { Product, Bill } from '../types';
import moment from 'moment';

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
        if (acc[product.name]) {
            acc[product.name].push(product);
        } else {
            acc[product.name] = [product];
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
        <div className={index % 2 ? " bg-gray-50" : " bg-gray-100"}>
            <div className="flex items-center justify-between cursor-pointer">
                {/*Botón de expandir contraer*/}
                <button className="p-2 w-fit" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg> : < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                    }
                </button>
                {/*Zona de datos*/}
                <div className={index % 2 ? "min-w-52 w-52  p-4 bg-gray-50" : "min-w-52 w-52 p-4 bg-gray-100"} key={bill.name} onClick={() => methods.selectBill(bill)}>
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
                <div className={"py-4  font-semibold text-right  min-w-10 " + (index % 2 ? "bg-gray-50" : "bg-gray-100")}>
                    {bill.total} €
                </div>
                <div className={"min-w-20 text-right text-base font-semibold text-green-700 dark:text-green-500 " + (!user.isPatner && 'hidden')}>
                    {bill.total - (bill.total * 0.2)} <span className="text-green-800">€</span>
                </div>
                {/*Botones de editar y borrar*/}
                <div className='flex'>
                    <button className={index % 2 ? "w-fit py-4 p-2 bg-gray-50" : "w-fit py-4 p-2 bg-gray-100"} onClick={() => setIsEditing(!isEditing)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                    <button className={index % 2 ? "w-fit py-4 p-2 bg-gray-50" : "w-fit py-4 p-2 bg-gray-100"} onClick={handleDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div >
            {/*Productos de la cuenta*/}
            <div className={index % 2 ? " bg-gray-50 w-max" : " bg-gray-100 w-max"}>
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