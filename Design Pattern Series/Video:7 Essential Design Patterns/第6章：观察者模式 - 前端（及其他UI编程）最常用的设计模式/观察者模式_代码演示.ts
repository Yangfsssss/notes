export class Subject {
  private state: number = 0;
  private observers: Observer[] = [];

  constructor() {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  setState(state: number) {
    this.state = state;
  }

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  private notify() {
    this.observers.forEach((observer) => {
      observer.update(this.state);
    });
  }
}

class Observer {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(state: number) {
    console.log(`${this.name} updated,state is ${state}`);
  }
}

const subject = new Subject();

const observer1 = new Observer('A');
subject.attach(observer1);

const observer2 = new Observer('B');
subject.attach(observer2);

subject.setState(1);
