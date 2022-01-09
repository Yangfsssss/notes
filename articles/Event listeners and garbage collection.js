async function abortable(signal, promise) {
	if (signal.abort) {
		throw new DOMException('AbortError', 'AbortError');
	}

	return Promise.race([
		promise,
		new Promise((_, reject) => {
			signal.addEventListener('abort', () => {
				reject(new DOMException('AbortError', 'AbortError'));
			});
		}),
	]);
}

let controller;

async function showImageSize(url) {
	if (controller) {
		controller.abort();
	}

	try {
		const { signal } = (controller = new AbortController());
		const blob = await fetch(url, { signal }).then((r) => r.blob());
		const img = await abortable(signal, createImageBitmap(blob));

		updateUISomehow(img.width, img.height);
	} catch (err) {
		if (err.name === 'AbortError') {
			return;
		}

		throw err;
	}
}

btn1.onclick = () => showImageSize(url1);
btn2.onclick = () => showImageSize(url2);

function example1() {
	fetch(url1).then(
		() => console.log('resolved'),
		() => console.log('rejected')
	);
}

function example2() {
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', () => console.log('done'));
	xhr.addEventListener('error', () => console.log('error'));
	xhr.open();
	xhr.send();
}
