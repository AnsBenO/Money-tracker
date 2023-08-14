export function formatPrice(number: number) {
	const formatedPrice = Math.abs(number).toFixed(2);
	return `${number < 0 ? "-$" : "+$"}${formatedPrice}`;
}

export function formatDate(datetimeStr: string): string {
	const inputDate = new Date(datetimeStr);

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	};

	const formattedDate = inputDate.toLocaleDateString("en-US", options);
	return formattedDate;
}
