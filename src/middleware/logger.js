const logger = (store) => (next) => (action) => {
console.log(action.type);
console.log('The action: ', action);
const returnedValue = next(action)
console.log('The new state: ', store.getState());
console.groupEnd();
return returnedValue;

}

export default logger;