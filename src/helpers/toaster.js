import toastr from "toastr"
import "toastr/build/toastr.min.css"

toastr.options = {
    positionClass:"toast-bottom-right",
    timeOut: 5000,
    extendedTimeOut: 1000,
    closeButton: false,
    debug: false,
    progressBar: false,
    preventDuplicates: false,
    newestOnTop: true,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    showDuration: 300,
    hideDuration: 1000
}

// type: success, info, warning, error,
export function showToastMessage(type='success', message, title = "") {
  toastr[type](message,title);
}