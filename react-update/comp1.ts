import { useState } from './use-state';

export function Comp1() {
	const [number, setNumber] = useState('3');

	function CreateADisplayDiv() {
		const div1 = document.createElement('div');

		// div1.innerText = '3';
		div1.innerText = number.value;
		div1.style.width = '400px';
		div1.style.height = '400px';
		div1.style.border = '1px solid black';
		div1.style.fontSize = '48px';
		div1.style.textAlign = 'center';
		div1.style.lineHeight = '400px';

		return div1;
	}

	function CreateAControlButton() {
		const button1 = document.createElement('button');
		button1.innerText = 'Update2';

		button1.onclick = () => {
			// div.innerText = '5';
			setNumber(Math.random().toFixed(5));
		};

		return button1;
	}

	return [CreateADisplayDiv, CreateAControlButton];
}
