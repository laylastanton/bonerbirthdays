import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from root .env file
dotenv.config({ path: '../.env' });

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	console.error('Error: SUPABASE_URL and SUPABASE_ANON_KEY must be set in .env file');
	process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface CSVRow {
	year: string;
	name: string;
	phone: string;
	birthdayFull: string;
	birthdayDisplay: string;
}

function parseBirthday(birthdayStr: string): string | null {
	if (!birthdayStr) return null;

	try {
		// Parse formats like "Jan 12, 2005", "January 12, 2005", "January 12"
		const parts = birthdayStr.trim().split(/[\s,]+/).filter(Boolean);
		
		const monthNames = [
			'January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'
		];
		const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		if (parts.length >= 2) {
			const monthStr = parts[0];
			const day = parseInt(parts[1]);
			let year = parts[2] ? parseInt(parts[2]) : 2000; // Default year

			const monthIndex = 
				monthNames.findIndex(m => m.toLowerCase() === monthStr.toLowerCase()) !== -1
					? monthNames.findIndex(m => m.toLowerCase() === monthStr.toLowerCase())
					: shortMonthNames.findIndex(m => m.toLowerCase() === monthStr.toLowerCase());

			if (monthIndex !== -1 && !isNaN(day)) {
				// Format as YYYY-MM-DD
				const month = String(monthIndex + 1).padStart(2, '0');
				const dayStr = String(day).padStart(2, '0');
				return `${year}-${month}-${dayStr}`;
			}
		}

		return null;
	} catch {
		return null;
	}
}

function formatBirthdayDisplay(birthdayStr: string): string | null {
	if (!birthdayStr) return null;

	try {
		const parts = birthdayStr.trim().split(/[\s,]+/).filter(Boolean);
		const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const monthNames = [
			'January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'
		];

		if (parts.length >= 2) {
			const monthStr = parts[0];
			const day = parseInt(parts[1]);

			let monthIndex = shortMonthNames.findIndex(m => m.toLowerCase() === monthStr.toLowerCase());
			if (monthIndex === -1) {
				monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthStr.toLowerCase());
			}

			if (monthIndex !== -1 && !isNaN(day)) {
				return `${shortMonthNames[monthIndex]} ${day}`;
			}
		}

		return birthdayStr;
	} catch {
		return birthdayStr;
	}
}

async function parseCSV(filePath: string): Promise<CSVRow[]> {
	const content = fs.readFileSync(filePath, 'utf-8');
	const lines = content.split('\n');
	const rows: CSVRow[] = [];

	// Target graduation years: 25s, 26s, 27s, 28s, 29s, gra
	const targetYears = ['25s', '26s', '27s', '28s', '29s', 'gra'];
	let currentYear = '';

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const columns = line.split(',');

		// Check if this is a year marker line
		if (columns[1] && targetYears.includes(columns[1].trim())) {
			currentYear = columns[1].trim();
			continue;
		}

		// Skip if we don't have a current year or if it's a header/empty line
		if (!currentYear || !columns[2] || columns[2].trim() === '' || columns[2].trim() === 'name') {
			continue;
		}

		const name = columns[2].trim();
		const phone = columns[3] ? columns[3].trim() : '';
		const birthdayFull = columns[4] ? columns[4].trim().replace(/"/g, '') : '';
		const birthdayDisplay = columns[5] ? columns[5].trim() : '';

		if (name) {
			rows.push({
				year: currentYear,
				name,
				phone,
				birthdayFull,
				birthdayDisplay
			});
		}
	}

	return rows;
}

async function migrateData() {
	console.log('Starting data migration...');

	// Find the CSV file
	const csvPath = path.join(process.cwd(), '..', 'Burton 1 Numbers and Birthdays - b1ner b1rths and d1g1ts.csv');
	
	if (!fs.existsSync(csvPath)) {
		console.error(`CSV file not found at: ${csvPath}`);
		process.exit(1);
	}

	console.log(`Reading CSV from: ${csvPath}`);
	const rows = await parseCSV(csvPath);
	console.log(`Found ${rows.length} members to migrate`);

	let successCount = 0;
	let errorCount = 0;

	for (const row of rows) {
		try {
			const birthday = parseBirthday(row.birthdayFull || row.birthdayDisplay);
			const birthdayDisplay = formatBirthdayDisplay(row.birthdayDisplay || row.birthdayFull);

		const { error } = await supabase.from('members').insert([
			{
				name: row.name,
				year_group: row.year,
				phone: row.phone || null,
				birthday_full: birthday,
				birthday_display: birthdayDisplay
			}
		]);

			if (error) {
				console.error(`Error inserting ${row.name}:`, error.message);
				errorCount++;
			} else {
				console.log(`✓ Migrated: ${row.name} (${row.year})`);
				successCount++;
			}
		} catch (error) {
			console.error(`Error processing ${row.name}:`, error);
			errorCount++;
		}
	}

	console.log('\n--- Migration Complete ---');
	console.log(`Successfully migrated: ${successCount} members`);
	console.log(`Errors: ${errorCount}`);
}

migrateData().catch(console.error);

