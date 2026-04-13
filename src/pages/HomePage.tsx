import { useState, useEffect } from 'react';
import { ProductItem } from '../components/ProductItem';
import { PriceModal } from '../components/PriceModal';
import { Product } from '../types';
import { DaoService } from '../services/dao-service';
import { Loading } from '../components/Loading';
import { BillService } from '../services/bill-service';
import { UserService } from '../services/user-service';

export function Home() {

    const user = UserService.getUserConfiguration();
    const selectedBill = user.selectedBill || 'Cuenta 1';
    const bill = BillService.getBill(selectedBill) || BillService.addNew(selectedBill);

    const [products, setProducts] = useState(null as Product[] | null);
    const [productList, setProductList] = useState(bill.products);
    const [filteredProduct, setFilteredProducts] = useState([] as Product[]);
    const [selectedGroup, setSelectedGroup] = useState(null as string | null);
    const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

    const groups = [...new Set(products?.map(p => p.group))];

    useEffect(() => {
        DaoService.getFirstCatalog().then((products) => {
            setProducts(products);
            setFilteredProducts(products);
        });
    }, []);

    const total = productList.reduce((acc, product) => acc + (typeof product.price === 'number' ? product.price : 0), 0);
    const totalDiscount = total - (total * 0.2);
    const productCountByNames = productList.reduce((acc, product) => {
        acc[product.name] = (acc[product.name] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const addProduct = (product: Product) => {
        if (typeof product.price === 'string') {
            setPendingProduct(product);
            return;
        }
        BillService.addProductToBill(bill, product);
        setProductList(bill.products);
    };

    const confirmCustomPrice = (price: number) => {
        if (pendingProduct) {
            const definedProduct = { ...pendingProduct, price };
            BillService.addProductToBill(bill, definedProduct);
            setProductList(bill.products);
        }
        setPendingProduct(null);
    };

    const removeProduct = (product: Product) => {
        BillService.removeProductFromBill(bill, product);
        setProductList(bill.products);
    };

    const searchProduct = (search: string) => {
        return products?.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
    }

    const selectGroup = (group: string) => {
        const newSelectedGroup = group === selectedGroup ? null : group;
        setSelectedGroup(newSelectedGroup);
        const filtered = newSelectedGroup ? products?.filter((product) => product.group === group) : products;
        setFilteredProducts(filtered as Product[]);
    }

    return (
        <div className="flex flex-col h-full p-2">
            {/* Header: Search and total */}
            <h1 className="flex-none text-2xl text-[#2D6A27] font-feria border-b-2 border-[#DFC48A] mb-2 pb-2">{selectedBill}</h1>
            <div className="flex-none mb-2">
                <div className="flex">
                    <div className="relative flex-1">
                        <label htmlFor="search" className="sr-only">Buscar</label>
                        <input
                            id="search"
                            type="text"
                            placeholder="Buscar ..."
                            className="block pr-10 w-full px-4 py-2.5 rounded-lg border border-[#DFC48A] focus:ring-4 focus:ring-[#2D6A27]/30 focus:outline-none"
                            onChange={(e) => setFilteredProducts(searchProduct(e.target.value) || [])}
                        />
                        {/* Search icon */}
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                            <i className="text-gray-400 fa-solid fa-search"></i>
                        </div>
                    </div>
                    <div className="px-4 text-right min-w-32">
                        <span className='block text-xs text-[#DFC48A] font-bold'>Oficial</span>
                        <span className="text-2xl font-medium text-[#2D6A27] font-feria">
                            {total.toFixed(2)} <span className="text-caseta-verde">€</span>
                        </span>
                    </div>
                    <div className={"px-4 min-w-32 text-right " + (!user.isPatner && 'hidden')}>
                        <span className='block text-xs text-[#FFD700] font-bold'>Socio</span>
                        <span className="text-2xl font-medium text-[#FFD700]">
                            {totalDiscount.toFixed(2)} <span className="text-[#FFD700] brightness-75">€</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Header: Search and total */}
            <div className="flex-none mb-2 overflow-x-auto">
                <div className="flex">
                    {groups.map((group) => (
                        <button onClick={() => selectGroup(group)} key={group} type="button"
                            className={"flex-none text-center text-[#2D6A27] border border-[#2D6A27] font-medium rounded-lg text-xs px-3 py-1 me-2 mb-2 whitespace-nowrap " + ((selectedGroup === group) ? 'text-white bg-[#2D6A27]' : 'bg-white hover:bg-[#2D6A27]/10')}>
                            {group}
                        </button>
                    ))}
                </div>
            </div>

            {/* Pruduct list */}
            <div className="overflow-y-auto flew-grow">
                <div className="flex-grow mb-4 overflow-y-auto bg-white border border-[#DFC48A] rounded-lg shadow-sm">
                    <div className="divide-y divide-[#DFC48A]/40">
                        {products && filteredProduct?.map((product, index) => (
                            <div className={index % 2 === 0 ? 'p-4 bg-white' : 'p-4 bg-[#DFC48A]/10'} key={product.name}>
                                <ProductItem product={product} isPatner={user.isPatner} onAdd={addProduct} onRemove={removeProduct} total={productCountByNames[product.name]} />
                            </div>
                        ))}
                        {!products && <Loading />}
                    </div>
                </div>
            </div>

            {pendingProduct && (
                <PriceModal
                    product={pendingProduct}
                    onConfirm={confirmCustomPrice}
                    onCancel={() => setPendingProduct(null)}
                />
            )}
        </div>
    );
}
