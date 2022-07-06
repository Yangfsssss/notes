interface Options<D, C, M> {
  data: (this: {}) => D;
  computed: C & ThisType<D>;
  methods: M &
    ThisType<
      M &
        D & {
          [K in keyof C]: C[K] extends (...args: any[]) => any ? ReturnType<C[K]> : never;
        }
    >;
}

//对象类型中的this：ThisType<T>
//函数中的this：(this:T) => unknown

export declare function SimpleVue<D, C, M>(options: Options<D, C, M>): unknown;

const instance = SimpleVue({
  data() {
    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    };
  },
  computed: {
    fullname() {
      return this.firstname + ' ' + this.lastname;
    },
  },
  methods: {
    hi() {
      alert(this.fullname.toLowerCase());
    },
  },
});
