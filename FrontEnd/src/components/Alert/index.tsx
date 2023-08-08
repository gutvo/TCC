import { ToastContainer } from 'react-toastify'

export function Alert() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      // pauseOnFocusLoss
      draggable
      // pauseOnHover
      theme="light"
    />
  )
}
