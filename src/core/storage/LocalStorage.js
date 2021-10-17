import { Storage } from './Storage';

export class LocalStorage extends Storage {
  get(key) {
    const localStorageData = localStorage.getItem(key);
    if (localStorageData) {
      return JSON.parse(localStorageData);
    }
    
    return null;
  }

  save(key, value) {
    let valueToSave = value;
    if (typeof value !== 'string') {
      valueToSave = JSON.stringify(value);
    }
    localStorage.setItem(key, valueToSave);
  }
}