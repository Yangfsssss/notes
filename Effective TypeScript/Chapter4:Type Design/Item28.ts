/** Item28: 倾向选择总是代表有效状态的类型，Prefer Types That Always Represent Valid States*/
//A key to effective type design is crafting types that can only represent a valid state.

interface RequestPending {
  state: 'pending';
}

interface RequestError {
  state: 'error';
  error: string;
}

interface RequestSuccess {
  state: 'ok';
  pageText: string;
}

type RequestState = RequestPending | RequestError | RequestSuccess;

interface State {
  currentPage: string;
  requests: { [page: string]: RequestState };
}

function renderPage(state: State) {
  const { currentPage } = state;
  const requestState = state.requests[currentPage];

  switch (requestState.state) {
    case 'pending':
      return `Loading ${currentPage}...`;
    case 'error':
      return `Error! Unable to load ${currentPage}: ${requestState.error}`;
    case 'ok':
      return `<h1>${currentPage}</h1>\n${requestState.pageText}`;
  }
}

async function changePage(state: State, newPage: string) {
  state.requests[newPage] = { state: 'pending' };
  state.currentPage = newPage;

  function getUrlForPage(newPage: string): RequestInfo {
    throw new Error('Function not implemented.');
  }

  try {
    const response = await fetch(getUrlForPage(newPage));
    if (!response.ok) {
      throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
    }

    const pageText = await response.text();

    state.requests[newPage] = { state: 'ok', pageText };
  } catch (e) {
    state.requests[newPage] = { state: 'error', error: ' ' + e };
  }
}

//AirBus A330:Wrong,leftSideStick or rightSideStick is not valid.
interface CockpitControls {
  leftSideStick: number;
  rightSideStick: number;
}

function getStickSetting(controls: CockpitControls) {
  return (controls.leftSideStick + controls.rightSideStick) / 2;
}

//Right:stickAngle is valid.
interface CockpitControls1 {
  stickAngle: number;
}

function getStickSetting1(controls: CockpitControls1) {
  return controls.stickAngle;
}

//Things to Remember
//• Types that represent both valid and invalid states are likely to lead to confusing
//and error-prone code.
//• Prefer types that only represent valid states. Even if they are longer or harder to
//express, they will save you time and pain in the end!
