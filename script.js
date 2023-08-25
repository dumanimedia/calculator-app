let bodyEl = document.querySelector('body');
let themeBtnEls = document.querySelectorAll('[data-theme]');
let calculatorOperantEl = document.querySelector('.calc_operant');
let digitBtnEls = document.querySelectorAll('[data-number]');
let operatorBtnEls = document.querySelectorAll('[data-operator]');
let deleteBtnEl = document.querySelector('[data-delete]');
let resetBtnEl = document.querySelector('[data-reset]');
let equalsBtnEl = document.querySelector('[data-equals]');

class Calculator {
	constructor(displayElement) {
		this.displayElement = displayElement;
		this.displayContent = '';

		this.prevNum = undefined;
		this.leftSideVals = '';
		this.rightSideVals = '';
		this.operator = undefined;
	}
	resetDisplay() {
		this.displayContent = '';
		this.leftSideVals = '';
		this.rightSideVals = '';
		this.operator = undefined;
		this.prevNum = undefined;

		this.displayElement.textContent = '';
	}
	appendDigit(e) {
		if (this.operator === undefined) {
			if (e === '.' && this.rightSideVals === '') {
				this.rightSideVals = '0.';
			}
			if (e === '.' && this.rightSideVals.includes('.')) {
				return;
			}
			if (this.rightSideVals.includes('.')) {
				if (this.rightSideVals.split('.')[1].length > 2) {
					return;
				}
			}
			this.rightSideVals += e;
		} else {
			if (e === '.' && this.leftSideVals === '') {
				this.leftSideVals = '0.';
			}
			if (e === '.' && this.leftSideVals.includes('.')) {
				return;
			}
			if (this.leftSideVals.includes('.')) {
				if (this.leftSideVals.split('.')[1].length > 2) {
					return;
				}
			}
			this.leftSideVals += e;
		}

		this.updateDisplay();
	}
	operate(e) {
		if (this.prevNum !== undefined) {
			this.rightSideVals = this.prevNum;
		} else {
			if (this.rightSideVals === '') return;
			if (this.operator !== undefined) return;
		}
		this.operator = e;

		this.updateDisplay();
	}
	updateDisplay() {
		if (this.operator === undefined) {
			this.displayElement.textContent = Number(
				this.rightSideVals
			).toLocaleString();
		} else if (this.operator !== undefined && this.leftSideVals === '') {
			this.displayElement.textContent = `${Number(
				this.rightSideVals
			).toLocaleString()} ${this.operator} `;
		} else {
			this.displayElement.textContent = `${Number(
				this.rightSideVals
			).toLocaleString()} ${this.operator} ${Number(
				this.leftSideVals
			).toLocaleString()}`;
		}
	}
	calculateVals() {
		if (
			this.leftSideVals === '' ||
			this.operator === undefined ||
			this.rightSideVals === ''
		) {
			return;
		}

		let rightSideDigits = Number(this.rightSideVals);
		let leftSideDigits = Number(this.leftSideVals);

		let answer = undefined;

		switch (this.operator) {
			case '+':
				answer = rightSideDigits + leftSideDigits;
				break;
			case '-':
				answer = rightSideDigits - leftSideDigits;
				break;
			case '×':
				answer = rightSideDigits * leftSideDigits;
				break;
			case '÷':
				answer = rightSideDigits / leftSideDigits;
				break;
		}
		this.rightSideVals = '';
		this.leftSideVals = '';
		this.operator = undefined;
		this.prevNum = String(answer);
		this.displayElement.textContent = answer.toLocaleString();
	}
}

let calculator = new Calculator(calculatorOperantEl);

document.addEventListener('DOMContentLoaded', () => {
	bodyEl.setAttribute(
		'data-theme_accent',
		String(Math.ceil(Math.random() * 3))
	);

	loadAndChangeTheme();
});

digitBtnEls.forEach((digitBtn) => {
	digitBtn.addEventListener('click', (e) =>
		calculator.appendDigit(e.target.innerText)
	);
});

operatorBtnEls.forEach((operatorBtn) => {
	operatorBtn.addEventListener('click', (e) =>
		calculator.operate(e.target.innerText)
	);
});

resetBtnEl.addEventListener('click', () => calculator.resetDisplay());

deleteBtnEl.addEventListener('click', () => calculator.resetDisplay());

equalsBtnEl.addEventListener('click', () => calculator.calculateVals());

function setthemeClass() {
	let theActiveTheme = bodyEl.dataset.theme_accent;
	themeBtnEls.forEach((themeBtn) => {
		themeBtn.classList.remove('active-theme');

		let themeValue = themeBtn.dataset.theme;
		if (theActiveTheme === themeValue) {
			themeBtn.classList.add('active-theme');
		} else {
			themeBtn.classList.remove('active-theme');
		}
	});
}
function loadAndChangeTheme() {
	themeBtnEls.forEach((themeBtn) => {
		themeBtn.addEventListener('click', (e) => {
			bodyEl.setAttribute('data-theme_accent', e.target.dataset.theme);

			setthemeClass();
		});
	});
	setthemeClass();
}
