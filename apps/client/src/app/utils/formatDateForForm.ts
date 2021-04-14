/**
 * Used to turn a date's hours and minutes into the `hh:mm`
 * format to work with forms.
 * @param date the date to format
 */
export function formatHourForForm(date: Date): string {
	const minutes = date.getMinutes().toString();
	const minutesLength = minutes.length;
	const minutesString = minutesLength === 1 ? `0${minutes}` : minutes;

	const hours = date.getHours().toString();
	const hoursLength = hours.length;
	const hoursString = hoursLength === 1 ? `0${hours}` : hours;

	const result = `${hoursString}:${minutesString}`;

	return result;
}
