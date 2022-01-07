//** A nice way to write more readable functions */
//tinyblog.dev/blog/2020-07-13-javascript-roro-pattern/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//RORO pattern: Receive an Object, Return an Object.
//functions should always accept an object as their parameters and they should always return an object as their result.
//We will then destructure the arguments and the return to have more expressive way of knowing what goes in and out of a function.
function testReceiveAnObject() {
    return __awaiter(this, void 0, void 0, function* () {
        function getItemFromCollection(id, collectionName) {
            return __awaiter(this, void 0, void 0, function* () {
                return [id, collectionName];
            });
        }
        const item = yield getItemFromCollection(54391, 'shop');
        function ROROgetItemFromCollection({ id, collectionName }) {
            return __awaiter(this, void 0, void 0, function* () {
                return [id, collectionName];
            });
        }
        const ROROitem = yield ROROgetItemFromCollection({ id: 54391, collectionName: 'shop' });
        //-------------------------------------------------------------------------------------------------------------------
        function someFunctionCall(boolean) {
            return boolean;
        }
        someFunctionCall(false);
        function ROROsomeFunctionCall({ booleanPurpose }) {
            return booleanPurpose;
        }
        ROROsomeFunctionCall({ booleanPurpose: false });
    });
}
function testReturnAnObject() {
    return __awaiter(this, void 0, void 0, function* () {
        function runProcessName({ processName }) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = 'result';
                const wasCached = false;
                return { result, wasCached };
            });
        }
        const { result, wasCached } = yield runProcessName({ processName: 'k' });
        if (wasCached) {
            console.log('cached');
        }
    });
}
