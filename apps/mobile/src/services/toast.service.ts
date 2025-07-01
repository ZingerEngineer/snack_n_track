import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

class ToastService {
  static success(message: string) {
    toast.success(message, { position: 'top-right', autoClose: 3000 })
  }

  static error(message: string) {
    toast.error(message, { position: 'top-right', autoClose: 3000 })
  }

  static info(message: string) {
    toast.info(message, { position: 'top-right', autoClose: 3000 })
  }
}

export default ToastService
