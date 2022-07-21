import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class NGXToastrService {
  constructor(public toastr: ToastrService) {}

  // Success Type
  typeSuccess(title?: string, message?: string) {
    this.toastr.success(message, title, {
      tapToDismiss: true,
      closeButton: true,
    });
  }

  // Info Type
  typeInfo(title?: string, message?: string) {
    this.toastr.info(message, title, { tapToDismiss: true, closeButton: true });
  }

  // Warning Type
  typeWarning(title?: string, message?: string, error?: string) {
    if (error) {
      message = message + error;
    }
    this.toastr.warning(message, title, {
      tapToDismiss: true,
      closeButton: true,
    });
  }

  // Error Type
  typeError(title?: string, message?: string, error?: string) {
    if (error) {
      message = message + error;
    }
    this.toastr.error(message, title, { tapToDismiss: true });
  }
}
