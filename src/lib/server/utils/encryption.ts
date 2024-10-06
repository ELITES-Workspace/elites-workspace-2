// IMPORTED DEP-MODULES
import CryptoJS from 'crypto-js';

// -- FUNCTIONS - //

export function encrypt(data: any, secretKey: string = import.meta.env.VITE_SECRET_KEY): string {
	return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

export function decrypt<T = any>(encrypted: string, secretKey: string = import.meta.env.VITE_SECRET_KEY): T | undefined {
	if (typeof encrypted === 'undefined') throw new Error('No encrypted data provided!');

	try {
		const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
		const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as T;
		return decrypted;
	} catch {
		return undefined;
	}
}
