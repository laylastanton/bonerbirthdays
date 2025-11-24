/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string | null): string {
	if (!phone) return '';

	// Remove all non-digit characters
	const digits = phone.replace(/\D/g, '');

	// Format based on length
	if (digits.length === 10) {
		return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
	} else if (digits.length === 11 && digits[0] === '1') {
		return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
	}

	// Return original if format is unusual
	return phone;
}

/**
 * Validate phone number
 */
export function isValidPhoneNumber(phone: string): boolean {
	const digits = phone.replace(/\D/g, '');
	return digits.length === 10 || (digits.length === 11 && digits[0] === '1');
}

