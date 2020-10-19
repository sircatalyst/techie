import { CreateStudentDTO } from "src/student/dto/student";

export function mean(data: CreateStudentDTO): number {
	let total = 0;
	let counter = 0;
	for (const key in data) {
		total += data[key];
		counter += 1;
	}
	return total / counter;
}

export function median(data: CreateStudentDTO): number {
	const array: any = Object.values(data);
	if(array.length === 0) return 0;

	array.sort((a, b) => {
	  return a - b;
	});

	const divide = Math.floor(array.length / 2);

	if (array.length % 2) {
		return array[divide];
	}

	return (array[divide - 1] + array[divide]) / 2.0;
}

export function mode(data: CreateStudentDTO): [] {
	const array = Object.values(data);
	const modes: any = [];
	const count = []; 
	let i: any;
	let number: any; 
	let maxIndex: any = 0;

	for (i = 0; i < array.length; i += 1) {
		number = array[i];
		count[number] = (count[number] || 0) + 1;
		if (count[number] > maxIndex) {
			maxIndex = count[number];
		}
	}
	for (i in count) {
		if (count.hasOwnProperty(i)) {
			if (count[i] === maxIndex) {
				modes.push(Number(i));
			}
		}
	}
	return modes;
}
