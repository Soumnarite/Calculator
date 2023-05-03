const result = document.getElementById('result');

let isCalculating = false;

function numberInput(num){

    if(result.value === "0")
    {
        result.value = "";
    }

	if(num === "." && result.value.includes("."))
	{
        document.getElementById("decimal-btn").classList.add("disabled");
        return;
    }

    result.value += num;
}

function operandInput(op){

	if(result.value.endsWith('/0'))
	{
		alert("Sorry, can't divide by 0!");
		clearResult();
		return;
	}

	if(result.value.endsWith('/') || result.value.endsWith('+') || result.value.endsWith('-') || result.value.endsWith('*'))
    {
        result.value = result.value.slice(0, -1) + op;
    }
	else
	{
		if(!isCalculating)
		{
			result.value += op;
			isCalculating = true;
		}
		else
		{
			const currentValue = eval(result.value);

			if(currentValue % 1 !== 0)
			{
				result.value = currentValue.toFixed(2) + op;
			}
			else
			{
				result.value = currentValue + op;
			}
		}
	}
}

function calculate(){

    if(result.value === "")
    {
		alert("Sorry, there is nothing to calculate!");
    }
	else if(result.value.endsWith("/0"))
    {
		alert("Sorry, can't divide by 0!");
		clearResult();
    }
	else if(result.value.endsWith('/') || result.value.endsWith('+') || result.value.endsWith('-') || result.value.endsWith('*'))
    {
		alert("Sorry, please enter all of the numbers and operators!");
    }
    else
    {
        const currentValue = eval(result.value);

		if(currentValue % 1 !== 0)
		{
            result.value = currentValue.toFixed(2);
        }
		else
		{
            result.value = currentValue;
        }

		isCalculating = false;
    }
}

function clearResult(){

    result.value = "0";
	isCalculating = false;
	document.getElementById("decimal-btn").classList.remove("disabled");
}

function backspace(){

	result.value = result.value.slice(0, -1);
}

document.addEventListener('keydown', keyboardInput);

function keyboardInput(event){

	const key = event.key;

	if(/[0-9]/.test(key))
	{
        numberInput(key);
    }
    else if(/[-+/*]/.test(key))
	{
        operandInput(key);
    }
    else if(key === 'Enter')
	{
        calculate();
    }
    else if(key === 'Backspace')
	{
        backspace();
    }
    else if(key === 'c' || key === 'C')
	{
        clearResult();
    }
}