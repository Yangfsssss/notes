console.log('start');
setTimeout(() => {
  console.log('a');

  Promise.resolve().then(() => {
    console.log('c');
  });
});

Promise.resolve().then(() => {
  console.log('b');

  setTimeout(() => {
    console.log('d');
  });
});

console.log('end');

// b - a - c - d
