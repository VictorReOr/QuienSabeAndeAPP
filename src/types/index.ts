export interface UserConfiguration {
    /**
     * User name.
     */
    selectedBill?: string;
    /**
     * User is patner.
     */
    isPatner?: boolean;
}

export interface Product {
    name: string;
    description: string;
    group: string;
    price: number;
    category: string;
}

export interface IndexedCatalogs {
    [key: string]: Product[];
}

export interface DataSource {
    catalogs?: IndexedCatalogs;
}

export interface Bill {
    /**
     * Bill name.
     */
    name: string;
    /**
     * Bill date.
     */
    date: string;
    /**
     * Products in the bill.
     */
    products: Product[];
    /**
     * Total price.
     */
    total: number;
}