import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup = this.fb.group({});
  authProviders = AuthProvider;

  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create Account'
  };

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private authService: AuthService, private fb: FormBuilder, private overlayService: OverlayService) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get name(): FormControl {
    return <FormControl>this.authForm.get('name');
  }

  get email(): FormControl {
    return <FormControl>this.authForm.get('email');
  }

  get password(): FormControl {
    return <FormControl>this.authForm.get('password');
  }

  changeAuthAction(): void{
    this.configs.isSignIn = !this.configs.isSignIn;
    const{isSignIn} = this.configs;
    this.configs.action = isSignIn ? 'Login': 'Sign Up';
    this.configs.actionChange = isSignIn ? 'Create Account': 'Already have an account';
    !isSignIn ? this.authForm.addControl('name', this.nameControl): this.authForm.removeControl('name');
  }

  async onSubmit(provider: AuthProvider): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
      console.log('Autenticado: ', credentials)
      console.log('Redirecting...');
    } catch (error) {
      const errMessage = (error as Error).message;
      console.log('Auth error: ', errMessage)   
      await this.overlayService.toast({
        message: errMessage
      });
    } finally {
      loading.dismiss();
    }
  }

}
