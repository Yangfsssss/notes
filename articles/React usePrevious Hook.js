//Hooks are essential for the functional component pattern in React. One frequent logic comparison with class components was comparing a previous prop value with a current prop value via lifecycle methods. So what's an easy pattern for duplicating previous value comparisons in functional components?
//https://davidwalsh.name/react-useprevious-hook
//The useRef and useEffect hooks allow us manage that same functionality in functional components via a custom hook -- usePrevious:

import { useEffect, useRef } from 'react';

export function usePrevious(value) {
	//设置一个ref
	const ref = useRef();

	useEffect(() => {
		//将传入的value值置入ref中，当value改变时，置入新的value
		//因为useEffect的特性，可以将以上视为异步过程，即先返回value值，
		//再置入
		ref.current = value;
	}, [value]);

	//（返回置入ref中的value）
	return ref.current;
}

// Usage
export function MyComponent(props) {
	//从props中获得一个值name
	const { name } = props;
	//将name作为参数传入hook，
	//若hook是第一次被执行，则被储存至ref中，并返回undefined（先返回，后置值），
	//若hook是第n次被执行，则与上次置入的值对比
	//如果相同，则不执行置入操作，返回上次置入的值
	//如果不同，则返回上次置入的值，并将当前值置入（先返回，后置值）
	const previousName = usePrevious(name);

	if (name != previousName) {
		// Do something
	}
}

//I love this usePrevious hook, if only because I frequently forget to use the .current property and it helps avoid some boilerplate code. What are your thoughts on this pattern? Do you have any custom hooks you rely on?
