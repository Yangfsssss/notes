//** A nice way to write more readable functions */
//tinyblog.dev/blog/2020-07-13-javascript-roro-pattern/

//RORO pattern: Receive an Object, Return an Object.
//functions should always accept an object as their parameters and they should always return an object as their result.
//We will then destructure the arguments and the return to have more expressive way of knowing what goes in and out of a function.
async function testReceiveAnObject() {
  async function getItemFromCollection(id: number, collectionName: string) {
    return [id, collectionName];
  }

  const item = await getItemFromCollection(54391, 'shop');

  async function ROROgetItemFromCollection({ id, collectionName }: { id: number; collectionName: string }) {
    return [id, collectionName];
  }

  const ROROitem = await ROROgetItemFromCollection({ id: 54391, collectionName: 'shop' });

  //-------------------------------------------------------------------------------------------------------------------
  function someFunctionCall(boolean: Boolean) {
    return boolean;
  }

  someFunctionCall(false);

  function ROROsomeFunctionCall({ booleanPurpose }: { booleanPurpose: Boolean }) {
    return booleanPurpose;
  }

  ROROsomeFunctionCall({ booleanPurpose: false });
}

async function testReturnAnObject() {
  async function runProcessName({ processName }) {
    const result = 'result';
    const wasCached = false;

    return { result, wasCached };
  }

  const { result, wasCached } = await runProcessName({ processName: 'k' });

  if (wasCached) {
    console.log('cached');
  }
}
