interface IDefaultAction {
    type: string,
    payload: any
}

export interface IToasterAction extends IDefaultAction {
    showToaster?: boolean,
    successMessage?: string,
    errorMessage?: string
}


export default IDefaultAction;