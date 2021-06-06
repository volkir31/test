const dropdown = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.dropdown__menu');
const burger = document.querySelector('.header__burger');
const inp = document.querySelectorAll('.inp');
const send = document.querySelector('.send');
const inputs = document.querySelectorAll('.input');
if (dropdown) {
	dropdown.addEventListener('click', e => {
		e.preventDefault();
		dropdownMenu.classList.toggle('active');
	});
}
if (burger) {
	burger.addEventListener('click', e => {
		burger.classList.toggle('active');
	});
}
window.addEventListener('scroll', () => {
	let scroll = window.scrollY;
	let menuLink = document.querySelectorAll('.menu__link');
	let header = document.querySelector('.header');
	let third = document.querySelector('.third');
	let burger = document.querySelector('.header__burger');
	let fourth = document.querySelector('.fourth');
	if (scroll + header.offsetHeight + 50 >= third.offsetTop) {
		burger.classList.add('black');
		menuLink.forEach(elem => {
			elem.classList.add('active');
		});
	} else {
		burger.classList.remove('black');
		menuLink.forEach(elem => {
			elem.classList.remove('active');
		});
	}
	if (scroll + header.offsetHeight + 50 >= fourth.offsetTop) {
		menuLink.forEach(elem => {
			elem.classList.remove('active');
		});
		burger.classList.remove('black');
	}
});
inp.forEach(function (elem) {
	elem.addEventListener('focus', () => {
		elem.classList.add('active');
	});
	elem.addEventListener('blur', () => {
		if (!elem.value) {
			elem.classList.remove('active');
		}
	});
});

send.addEventListener('click', e => {
	e.preventDefault();
});

// phone validation

var phoneInputs = document.querySelectorAll('input[data-tel-input]');
var getInputNumbersValue = function (input) {
	// Return stripped input value — just numbers
	return input.value.replace(/\D/g, '');
};

var onPhonePaste = function (e) {
	var input = e.target,
		inputNumbersValue = getInputNumbersValue(input);
	var pasted = e.clipboardData || window.clipboardData;
	if (pasted) {
		var pastedText = pasted.getData('Text');
		if (/\D/g.test(pastedText)) {
			// Attempt to paste non-numeric symbol — remove all non-numeric symbols,
			// formatting will be in onPhoneInput handler
			input.value = inputNumbersValue;
			return;
		}
	}
};

var onPhoneInput = function (e) {
	var input = e.target,
		inputNumbersValue = getInputNumbersValue(input),
		selectionStart = input.selectionStart,
		formattedInputValue = '';
	if (!inputNumbersValue) {
		return (input.value = '');
	}
	if (input.value.length != selectionStart) {
		// Editing in the middle of input, not last symbol
		if (e.data && /\D/g.test(e.data)) {
			// Attempt to input non-numeric symbol
			input.value = inputNumbersValue;
		}
		return;
	}
	if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
		if (inputNumbersValue[0] == '9')
			inputNumbersValue = '7' + inputNumbersValue;
		var firstSymbols = inputNumbersValue[0] == '8' ? '8' : '+7';
		formattedInputValue = input.value = firstSymbols + ' ';
		if (inputNumbersValue.length > 1) {
			formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
		}
		if (inputNumbersValue.length >= 5) {
			formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
		}
		if (inputNumbersValue.length >= 8) {
			formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
		}
		if (inputNumbersValue.length >= 10) {
			formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
		}
	} else {
		formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
	}
	input.value = formattedInputValue;
};

var onPhoneKeyDown = function (e) {
	// Clear input after remove last symbol
	var inputValue = e.target.value.replace(/\D/g, '');
	if (e.keyCode == 8 && inputValue.length == 1) {
		e.target.value = '';
	}
};
for (var phoneInput of phoneInputs) {
	phoneInput.addEventListener('keydown', onPhoneKeyDown);
	phoneInput.addEventListener('input', onPhoneInput, false);
	phoneInput.addEventListener('paste', onPhonePaste, false);
}



