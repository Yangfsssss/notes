/** Item41: 理解any演变，Understand Evolving any */

function rangeX(start: number, limit: number) {
  const out = [];

  // if (start === limit) {
  //   return out;
  // }

  for (let i = start; i < limit; i++) {
    out.push(i);
  }

  return out;
}

function makeSquares(start: number, limit: number) {
  const out = [];

  rangeX(start, limit).forEach((i) => out.push(i * i));

  // return out;
}

//Things to Remember
//• While TypeScript types typically only refine, implicit any and any[] types are
//allowed to evolve. You should be able to recognize and understand this construct where it occurs.
//• For better error checking, consider providing an explicit type annotation instead of using evolving any.
