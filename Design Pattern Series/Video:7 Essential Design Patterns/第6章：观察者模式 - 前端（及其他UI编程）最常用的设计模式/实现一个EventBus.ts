export class EventBus {
  private events:Map<string,((...args:any[])=>unknown)[]> = new Map();
  private onceEvents:Map<string,((...args:any[])=>unknown)[]> = new Map();

  on(eventName:string,cb:(...args:any[])=>unknown){
    if(this.events.get(eventName)?.length){
      this.events.get(eventName)?.push(cb);
    } else {
      this.events.set(eventName,[cb]);
    }
  };

  once(eventName:string,cb:(...args:any[])=>unknown){
    if(this.onceEvents.get(eventName)?.length){
      this.onceEvents.get(eventName)?.push(cb);
    } else {
      this.onceEvents.set(eventName,[cb]);
    }
  }

  off(eventName:string,fn:(...args:any[])=>unknown){
    const cbs = this.events.get(eventName);
    const onceCbs = this.onceEvents.get(eventName);

    if(!fn){
      if(cbs?.length) this.events.delete(eventName);
      if(onceCbs?.length) this.onceEvents.delete(eventName);
    } else {
      this.events.set(eventName,cbs?.filter(cb => cb !== fn) || [])
      this.onceEvents.set(eventName,onceCbs?.filter(cb => cb !== fn) || [])
    }
  }

  emit(eventName:string,...args:unknown[]){
    const cbs = this.events.get(eventName);
    const onceCbs = this.onceEvents.get(eventName);

    if(cbs?.length){
      for(const cb of cbs){
        if(typeof cb === 'function'){
          cb(...args);
        }
      }
    }

    if(onceCbs?.length){
      for(const cb of onceCbs){
        if(typeof cb === 'function'){
          cb(...args);
          this.onceEvents.delete(eventName);
        }
      }
    }
  }
} 

const bus = new EventBus();

bus.on('e1',()=>{
  console.log('e1 event1');
})
bus.on('e1',()=>{
  console.log('e1 event2');
})
bus.on('e2',()=>{
  console.log('e2 event1');
})
bus.on('e2',()=>{
  console.log('e2 event2');
})
bus.once('e3',()=>{
  console.log('once e3 ,event1');
})

const fn = (value:string)=>{
  console.log('once e3 ,event1',value);
}

bus.once('e3',fn)

bus.emit('e1');
bus.emit('e1');
bus.off('e3',fn)
bus.emit('e3',333);