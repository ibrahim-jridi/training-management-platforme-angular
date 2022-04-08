import {
  
  FormGroup
} from '@angular/forms';
export class CustomValidators {
  static mustMatch(pwd: string, confPwd: string) {
    return (formGroup: FormGroup) => {
      const matchpwd = formGroup.controls[pwd];
      const matchConfPwd = formGroup.controls[confPwd];

      if (matchConfPwd.errors && !matchConfPwd.errors.mustMatch) {
        return;
      }

      // set error on matchingControl if validation fails
      if (matchpwd.value !== matchConfPwd.value) {
        matchConfPwd.setErrors({ mustMatch: true });
      } else {
        matchConfPwd.setErrors(null);
      }
      return null;
    };
  }
}
