import IDefaultAction from "../../models/interfaces/IActions";

const logger = (store: any) => {
    return (next: any) => {
        return (action: any | IDefaultAction) => {
            if (typeof action === 'function') {
                return action(store.dispatch, store.getState);
            }
            return next(action);
        };
    };
};

export default logger;
