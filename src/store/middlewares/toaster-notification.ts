import { toast } from 'react-toastify';
import { IToasterAction } from '../../models/interfaces/IActions';

const toasterMiddleware = (store: any) => (next: any) => (action: any | IToasterAction) => {
    try {
        var result = next(action);
        if (action && (action as IToasterAction)!.showToaster) {
            if(toast.isActive) 
                toast.dismiss();

            toast.success((action as IToasterAction)!.successMessage, {
                hideProgressBar: true,
                delay: 100
            });
        }
        return result;
    } catch (error) {
        if(toast.isActive) 
            toast.dismiss();

        toast.error((action as IToasterAction)!.errorMessage, {
            hideProgressBar: true,
            delay: 100
        });
     
        throw error;
    }
}

export default toasterMiddleware