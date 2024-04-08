import { UserConfiguration } from '../types';
import { LocalStorageService } from './local-storage-service';

export class UserService {

    static USER_CONFIGURATION: string = 'billing-user-configuration';

    /**
     * Get user configuration.
     *
     * @returns {UserConfiguration} User configuration.
     */
    public static getUserConfiguration(): UserConfiguration {
        return LocalStorageService.get(UserService.USER_CONFIGURATION) || {};
    }

    /**
     * Update user configuration.
     *
     * @param {UserConfiguration} userConfiguration User configuration.
     * @returns {UserConfiguration} Updated user configuration.
     */
    public static updateUserConfiguration(userConfiguration: UserConfiguration): UserConfiguration {
        const config = { ...UserService.getUserConfiguration(), ...userConfiguration };
        LocalStorageService.set(UserService.USER_CONFIGURATION, config);
        return config;
    }
}