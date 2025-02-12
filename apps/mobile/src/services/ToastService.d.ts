import 'vue3-toastify/dist/index.css';
declare class ToastService {
    static success(message: string): void;
    static error(message: string): void;
    static info(message: string): void;
}
export default ToastService;
