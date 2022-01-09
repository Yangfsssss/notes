var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
function createDomStore() {
    var storedDoms = [];
    var workingDoms = [];
    var domStore = {
        getDoms: function () {
            return storedDoms;
        },
        getWorkingDoms: function () {
            return workingDoms;
        },
        setDoms: function (doms) {
            storedDoms = __spreadArray([], doms);
        },
        setWorkingDoms: function (doms) {
            workingDoms = __spreadArray([], doms);
        },
        firstRender: true,
    };
    return domStore;
}
export var domStore = createDomStore();
export var clearDom = function () {
    var workingDoms = domStore.getWorkingDoms();
    workingDoms.forEach(function (element) { return document.body.removeChild(element); });
};
