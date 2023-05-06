const result = document.getElementById('result');

let isCalculating = false;

function numberInput(num) {

	if (result.value === "0" && num === "0") { return; }

	if (result.value === "0") {
		result.value = "";
	}

	if (num === "." && result.value.includes(".")) {
		document.getElementById("decimal-btn").classList.add("disabled");
		return;
	}

	result.value += num;
}

function getResult() {

	const operands = [];
	const operators = [];
	let operand = "";
	let lastCharWasOp = true;

	for (let i = 0; i < result.value.length; i++) {
		const char = result.value.charAt(i);
		if (char === "+" || char === "-" || char === "*" || char === "/") {
			if (lastCharWasOp && char === "-") {
				operand += char;
			} else {
				operators.push(char);
				operands.push(parseFloat(operand));
				operand = "";
				lastCharWasOp = true;
			}
		} else {
			operand += char;
			lastCharWasOp = false;
		}
	}

	operands.push(parseFloat(operand));

	let total = operands[0];

	for (let i = 0; i < operators.length; i++) {
		const operator = operators[i];
		const operand = operands[i + 1];
		if (operator === "+") {
			total += operand;
		} else if (operator === "-") {
			total -= operand;
		} else if (operator === "*") {
			total *= operand;
		} else if (operator === "/") {
			total /= operand;
		}
	}

	return total;
}

function operandInput(op) {

	if (result.value.endsWith('/0')) {
		alert("Sorry, can't divide by 0!");
		clearResult();
		return;
	}

	if (result.value.endsWith('/') || result.value.endsWith('+') || result.value.endsWith('-') || result.value.endsWith('*')) {
		result.value = result.value.slice(0, -1) + op;
	} else {
		if (!isCalculating) {
			result.value += op;
			isCalculating = true;
		} else {
			const currentValue = getResult();
			let formattedValue = currentValue.toFixed(4);
			formattedValue = formattedValue.replace(/\.?0+$/, '');
			if (formattedValue.indexOf('.') === -1) {
				result.value = formattedValue + op;
			} else {
				result.value = formattedValue + op;
			}
		}
	}
}

function calculate() {

	if (result.value === "") {
		alert("Sorry, there is nothing to calculate!");
	}
	else if (result.value.endsWith("/0")) {
		alert("Sorry, can't divide by 0!");
		clearResult();
	}
	else if (result.value.endsWith('/') || result.value.endsWith('+') || result.value.endsWith('-') || result.value.endsWith('*')) {
		alert("Sorry, please enter all of the numbers and operators!");
	}
	else {
		const currentValue = getResult();
		let formattedValue = currentValue.toFixed(4);
		formattedValue = formattedValue.replace(/\.?0+$/, '');
		result.value = formattedValue;

		isCalculating = false;
	}
}

function clearResult() {

	result.value = "0";
	isCalculating = false;
	document.getElementById("decimal-btn").classList.remove("disabled");
}

function backspace() {
	
	result.value = result.value.slice(0, -1);
}

document.addEventListener('keydown', keyboardInput);

function keyboardInput(event) {

	const key = event.key;

	if (/[0-9]/.test(key)) {
		numberInput(key);
	}
	else if (/[-+/*]/.test(key)) {
		operandInput(key);
	}
	else if (key === 'Enter') {
		calculate();
	}
	else if (key === 'Backspace') {
		backspace();
	}
	else if (key === 'c' || key === 'C') {
		clearResult();
	}
}