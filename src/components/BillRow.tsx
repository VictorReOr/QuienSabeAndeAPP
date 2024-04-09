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
        if (inputName.current) {
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
        <div className={index % 2 ? "grid grid-flow-row auto-rows-auto bg-gray-50" : "grid grid-flow-row auto-rows-auto bg-gray-100"}>
            <div className="w-max flex justify-between cursor-pointer">
                <button className="w-fit p-4" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg> : < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                    }
                </button>
                <div className={index % 2 ? "w-fit p-4 bg-gray-50" : "w-fit p-4 bg-gray-100"} key={bill.name} onClick={() => methods.selectBill(bill)}>
                    <div className="flex items-center">
                        <div className="relative flex-shrink-0">
                            <i className={"fa-solid fa-wallet " + (selectedBill === bill.name ? "text-blue-500" : "dark:text-gray-400")} ></i>
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                            <p className={"flex text-sm font-medium truncate " + (selectedBill === bill.name ? "text-blue-500 dark:text-blue-500 font-bold" : "text-gray-900 dark:text-white")}>
                                {!isEditing ? <span className='truncate max-w-28'>{billName.current}</span> : <input name='Nombre cuenta' ref={inputName} defaultValue={billName.current} type='text' onBlur={blurHandler} />}
                                <span className={"pl-4 " + (selectedBill === bill.name ? "text-blue-600 dark:text-blue-300" : "text-gray-700 dark:text-gray-500")}>{moment(bill.date).format('DD/MM/YYYY HH:mm')}</span>
                                <span className="pl-4 hidden">{selectedBill === bill.name ? 'Actual' : ''}</span>
                            </p>
                        </div>
                        <div className="min-w-20 text-right text-base font-semibold text-gray-900 dark:text-white">
                            {bill.total} €
                        </div>
                        <div className={"min-w-20 text-right text-base font-semibold text-green-700 dark:text-green-500 " + (!user.isPatner && 'hidden')}>
                            {bill.total - (bill.total * 0.2)} <span className="text-green-800">€</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button className={index % 2 ? "w-fit p-4 bg-gray-50" : "w-fit p-4 bg-gray-100"} onClick={() => setIsEditing(!isEditing)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                    <button className={index % 2 ? "w-fit p-4 bg-gray-50" : "w-fit p-4 bg-gray-100"} onClick={handleDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>


            </div >
            <div className={index % 2 ? " bg-gray-50" : " bg-gray-100"}>
                <div className={(isExpanded ? 'flex justify-start' : 'hidden ')}>

                    <ul className="ml-2 w-fit divide-y divide-gray-200 dark:divide-gray-700">
                        {groupedProducts && Object.keys(groupedProducts).map((name: string) => (
                            <li className='p-2 text-sm font-medium truncate text-gray-900 dark:text-white' key={name}>
                                <div className="grid grid-cols-4 grid-flow-col gap-4 text-left">
                                    <p className='col-span-2'>{name}</p>
                                    <p className='col-span-1'>x{groupedProducts[name].length}</p>
                                    <p className='col-span-1 w-fit	font-semibold'>{groupedProducts[name].length * groupedProducts[name][0].price} €</p>
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