import eventEmitter from 'event-emitter'

const emitter = eventEmitter();

emitter.on('change',(value:string,...args:unknown[])=>{
  console.log('change1',value,...args);
});

emitter.on('change',()=>{
  console.log('change2');
});

emitter.on('change',()=>{
  console.log('change3');
});

emitter.emit('change','abc');
emitter.emit('change');
emitter.emit('change');