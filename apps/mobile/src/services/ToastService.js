import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
class ToastService {
    static success(message) {
        toast.success(message, { position: 'top-right', autoClose: 3000 });
    }
    static error(message) {
        toast.error(message, { position: 'top-right', autoClose: 3000 });
    }
    static info(message) {
        toast.info(message, { position: 'top-right', autoClose: 3000 });
    }
}
export default ToastService;
