import EncryptedStorage from "react-native-encrypted-storage";

const setEncryptStorage = async<T>(key: string, value: T) => {
    await EncryptedStorage.setItem(key, JSON.stringify(value));
}

const getEncryptStorage = async(key: string) => {
    const value = await EncryptedStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

const removeEncryptStorage = async(key: string) => {
    const data = await getEncryptStorage(key);
    if (data) {
        await EncryptedStorage.removeItem(key);
    }
}


export { getEncryptStorage, removeEncryptStorage, setEncryptStorage };

