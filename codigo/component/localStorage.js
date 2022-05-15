const set = (name, obj) => localStorage.setItem(name, JSON.stringify(obj));
const clr = () => localStorage.clear();
const get = (name) => JSON.parse(localStorage.getItem(name));
const rmv = (name) => localStorage.removeItem(name);

function add(nameObjc, objAdd){
    const newObjc = get(nameObjc);
    rmv(nameObjc);
    newObjc.push(objAdd)
    set(nameObjc, newObjc);
}

export {set, clr, get, rmv, add}
