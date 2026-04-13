// import products from '../data/products.json';
import { DataSource, DatasourceConfiguration, IndexedCatalogs, Product } from '../types';
import { LocalStorageService } from './local-storage-service';

export class DaoService {

    static DATASOURCE: string = 'billing-datasource';

    /**
     * Get all catalogs.
     *
     * @returns {Promise<IndexedCatalogs>} Indexed catalogs.
     */
    public static async getFirstCatalog(): Promise<Product[]> {
        const catalogs = await DaoService.getCatalogs();
        return catalogs[Object.keys(catalogs)[0]] || [];
    }

    /**
     * Get all catalogs.
     *
     * @param {boolean} cache Use cache.
     * @returns {Promise<IndexedCatalogs>} Indexed catalogs.
     */
    public static async getCatalogs(cache: boolean = true): Promise<IndexedCatalogs> {
        const datasource = await DaoService.getFromCacheOrRemote(cache);
        return datasource.catalogs || {};
    }

    /**
     * Get configuration groups.
     *
     * @param {boolean} cache Use cache.
     * @returns {Promise<DatasourceConfiguration['groups']>} Configuration groups.
     */
    public static async getConfigGroups(cache: boolean = true): Promise<DatasourceConfiguration['groups']> {
        const datasource = await DaoService.getFromCacheOrRemote(cache);
        return datasource?.configuration?.groups || [];
    }

    /**
     * Get all catalogs from cache or remote.
     *
     * @param {boolean} cache Use cache.
     * @returns {Promise<DataSource>} Data source.
     */
    static async getFromCacheOrRemote(cache: boolean = true): Promise<DataSource> {
        let datasource = cache ? LocalStorageService.get(DaoService.DATASOURCE) : null;
        try {
            if (!datasource) {
                const response = await fetch('https://script.google.com/macros/s/AKfycbw332ZHhmoORiYFRNtFyLrtM8dU8p8cFgeqViZmT4sDdmYXmhVWRYK7CHkRcb8jeGcrkQ/exec');
                datasource = await response.json();
                LocalStorageService.set(DaoService.DATASOURCE, datasource);
            }
        } catch (err) {
            console.error(err);
        }
        return datasource || {};
    }
}
