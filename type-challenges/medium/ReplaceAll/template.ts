type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' 
  ? S
  : S extends `${infer U}${From}${infer V}`
    ? `${U}${To}${ReplaceAll<V,From,To>}`
    : S

type replacedAll = ReplaceAll<'atayapaeasa', 'a', ''> // expected to be 'types'
type replacedAll1 = ReplaceAll<'tayapaeasa', 'a', ''> // expected to be 'types'
