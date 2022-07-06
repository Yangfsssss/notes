export type Trunc<S extends string | number> = `${S}` extends `${infer U}.${infer V}` ? U : `${S}`;

//same as Trim

type A = Trunc<12.34>; // 12
