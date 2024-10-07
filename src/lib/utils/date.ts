// -- FUNCTIONS -- //

export function formatTimeDisplay(date: Date | string): string {
	if (typeof date === 'string') date = new Date(date);

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	const formattedHours = hours % 12 === 0 ? '12' : (hours % 12).toString();
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
	const formatttedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

	return formatttedTime;
}

export function formatDateDisplay(date: Date | string): string {
	if (typeof date === 'string') date = new Date(date);

	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const day = daysOfWeek[date.getDay()];

	return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ` (${day})`;
}

export function formatDateTimeDisplay(date: Date | string): string {
	if (typeof date === 'string') date = new Date(date);

	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const day = daysOfWeek[date.getDay()];

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	const formattedHours = hours % 12 === 0 ? '12' : (hours % 12).toString();
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

	const formattedDateTime = `${formatDateDisplay(date)}  | ${formattedHours}:${formattedMinutes} ${ampm}`;

	return formattedDateTime;
}

export function formatDateTimeValue(date: Date | string): string {
	if (typeof date === 'string') date = new Date(date);

	const pad = (num: number) => (num < 10 ? '0' : '') + num;

	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1);
	const day = pad(date.getDate());

	let hour = date.getHours();
	const minute = pad(date.getMinutes());
	const period = hour >= 12 ? 'PM' : 'AM';

	hour = hour % 12;
	hour = hour ? hour : 12;

	return `${year}-${month}-${day} | ${hour}:${minute} ${period}`;
}

export function revertDateTimeValue(dateTimeValue: string): PHDate {
	const [datePart, timePart] = dateTimeValue.split(' | ');
	const [year, month, day] = datePart.split('-').map(Number);
	const [time, period] = timePart.split(' ');

	let [hour, minute] = time.split(':').map(Number);

	if (period === 'PM' && hour !== 12) {
		hour += 12;
	} else if (period === 'AM' && hour === 12) {
		hour = 0;
	}

	return new PHDate(year, month - 1, day, hour, minute);
}

export function formatDateToYYYYMMDD(date: Date, separator = '-'): string {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	return year + separator + month + separator + day;
}

export function convertTo24HourFormat(time: string): string {
	const [hour, period] = time.split(' ');
	const [hoursStr, minutesStr] = hour.split(':');
	let hours = Number(hoursStr);
	let minutes = Number(minutesStr);

	if (isNaN(hours) || isNaN(minutes)) {
		throw new Error('Invalid time format');
	}

	if (period === 'PM' && hours !== 12) {
		hours += 12;
	} else if (period === 'AM' && hours === 12) {
		hours = 0;
	}

	const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

	const paddedHours = hours < 10 ? `0${hours}` : hours;

	return `${paddedHours}:${paddedMinutes}`;
}

export function toISOStringWithTimezone(date: Date): string {
	const pad = (num: number) => (num < 10 ? '0' : '') + num;

	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1);
	const day = pad(date.getDate());
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());
	const milliseconds = (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5);

	const timezoneOffset = date.getTimezoneOffset();
	const offsetSign = timezoneOffset > 0 ? '-' : '+';
	const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60));
	const offsetMinutes = pad(Math.abs(timezoneOffset) % 60);

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
}

export function getDayDifference(startDate: Date, endDate: Date): number {
	const startUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
	const endUTC = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
	const diffInMs = endUTC - startUTC;
	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

	return diffInDays;
}

export function getHourDifference(startDate: PHDate, endDate: PHDate): number {
	const startUTC = Date.UTC(
		startDate.getFullYear(),
		startDate.getMonth(),
		startDate.getDate(),
		startDate.getHours(),
		startDate.getMinutes(),
	);
	const endUTC = Date.UTC(
		endDate.getFullYear(),
		endDate.getMonth(),
		endDate.getDate(),
		endDate.getHours(),
		endDate.getMinutes(),
	);
	const diffInMs = endUTC - startUTC;
	const diffInHours = diffInMs / (1000 * 60 * 60);

	return diffInHours;
}

export function timeStringToDate(timeString: string): Date {
	let [time, period] = timeString.split(' ');
	let [hour, minute] = time.split(':').map(Number);

	if (period === 'PM' && hour !== 12) {
		hour += 12;
	} else if (period === 'AM' && hour === 12) {
		hour = 0;
	}

	const now = new Date();
	now.setHours(hour, minute, 0, 0);

	return now;
}

export function dateToTimeString(date: Date): string {
	const pad = (num: number) => (num < 10 ? '0' : '') + num;

	let hour = date.getHours();
	const minute = pad(date.getMinutes());

	const period = hour >= 12 ? 'PM' : 'AM';
	hour = hour % 12;
	hour = hour ? hour : 12;

	return `${pad(hour)}:${minute} ${period}`;
}

export function calculateAge(birthDate: Date): number {
	const today = new Date();
	const birth = new Date(birthDate);

	if (isNaN(birth.getTime())) throw new Error('Invalid birth date');

	let age = today.getFullYear() - birth.getFullYear();
	const monthDifference = today.getMonth() - birth.getMonth();

	if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) age--;

	return age;
}

export function addTimeToDate(date: Date, hours: number, min: number, sec: number = 0, ms: number = 0) {
	date.setHours(hours, min, sec, ms);
	return date;
}

export function addDayToTime(timeString: string): Date {
	const [time, period] = timeString.split(' ');
	const [hours, minutes] = time.split(':').map(Number);

	const currentDate = new Date();

	let hours24 = hours;
	if (period.toUpperCase() === 'PM' && hours < 12) {
		hours24 += 12;
	}
	if (period.toUpperCase() === 'AM' && hours === 12) {
		hours24 = 0;
	}

	currentDate.setHours(hours24, minutes, 0, 0);

	const resultDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

	return resultDate;
}

export function isWithinDateRange(date: PHDate, startDate: PHDate, endDate: PHDate): boolean {
	return date >= startDate && date <= endDate;
}

export class PHDate extends Date {
	private static PH_TIMEZONE = 'Asia/Manila';
	private static PH_OFFSET = -480;

	constructor(...args: any[]) {
		// @ts-ignore
		super(...args);
		this.ensurePHTimezone();
	}

	private ensurePHTimezone(): void {
		const currentOffset = this.getTimezoneOffset();
		if (currentOffset !== PHDate.PH_OFFSET) {
			const phDate = new Date(this.getTime() + (PHDate.PH_OFFSET - currentOffset) * 60 * 1000);
			this.setTime(phDate.getTime());
		}
	}

	static now(): number {
		return new PHDate().getTime();
	}

	static fromISOString(isoString: string): PHDate {
		return new PHDate(isoString);
	}

	toISOString(): string {
		const options = { timeZone: PHDate.PH_TIMEZONE, hour12: false };
		const formatter = new Intl.DateTimeFormat('en-US', options);
		const parts = formatter.formatToParts(this);

		const datePart = parts.find((part) => part.type === 'day')?.value || '';
		const monthPart = parts.find((part) => part.type === 'month')?.value || '';
		const yearPart = parts.find((part) => part.type === 'year')?.value || '';
		const hourPart = parts.find((part) => part.type === 'hour')?.value || '';
		const minutePart = parts.find((part) => part.type === 'minute')?.value || '';
		const secondPart = parts.find((part) => part.type === 'second')?.value || '';

		return `${yearPart}-${monthPart}-${datePart}T${hourPart}:${minutePart}:${secondPart}`;
	}
}

export function getDayName(date: PHDate): string {
	const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
	return date.toLocaleDateString('en-US', options);
}

export function getCurrentDayName(): string {
	return getDayName(new PHDate());
}
