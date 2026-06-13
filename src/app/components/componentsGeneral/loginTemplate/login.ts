import { Component, inject } from "@angular/core";
import { LoginService, LoginUserDto } from "../../../services/hostinger/loginSerivece";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector:'app-login',
    standalone:true,
    templateUrl: './login.html',
    styleUrls: ['./login.css'],
    imports: [ReactiveFormsModule]
})
export class LoginComponent{

    private loginService = inject(LoginService);
    private router = inject(Router);

    fb = inject(FormBuilder);
    form = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });

    tryLoggin(){
        if (this.form.invalid){
            alert("Formulario inválido. Por favor, completá todos los campos.");
            return;
        }
        const dto: LoginUserDto = {
            email: this.form.value.email!,
            password: this.form.value.password!
        };

        this.loginService.userValidator(dto).subscribe({
            next: (res) => {
                localStorage.setItem('token', res.token);
                alert("Login exitoso");
                this.router.navigate(['/admin']);
            },
            error: (err) => {
                if(err.status === 401){
                    alert("Usuario o contraseña incorrectos");
                }else{
                    alert("Error del servidor");
                }
            }
        });
    }
}