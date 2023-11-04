import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  userService: UsersService = inject(UsersService)
  @Input() isLoading: boolean = false

  user: User = {
    id: '',
    name: '',
    phone: '',
    email: '',
    birthdate: '',
    gender: ''
  };

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private toastr: ToastrService) {
    this.route.queryParamMap
      .subscribe((params) => {
        const userId = params.get('userId');
        if (userId) {
          this.userService.getUserById(userId).then(user => {
            this.user = user;
            this.form.setValue({
              birthdate: user.birthdate,
              email: user.email,
              gender: user.gender,
              name: user.name,
              phone: user.phone,
            });
          });
        }
      });
  }

  form = new FormGroup({
    name: new FormControl(this.user.name, {
      validators: [
        Validators.required
      ]
    }),
    email: new FormControl(this.user.email, {
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    phone: new FormControl(this.user.phone, {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^([0-9]{2,3})([\s.-]?)([0-9]{3,4})([\s.-]?)([0-9]{4})$/s),
      ],
    }),
    gender: new FormControl(this.user.gender, {
      validators: [
        Validators.required
      ]
    }),
    birthdate: new FormControl(this.user.birthdate, {
      validators: [
        Validators.required
      ]
    })
  });

  async onSubmit() {

    const newUser = {
      name: this.form.value.name ?? '',
      email: this.form.value.email ?? '',
      phone: this.form.value.phone ?? '',
      birthdate: this.form.value.birthdate ?? '',
      gender: this.form.value.gender ?? ''
    }

    if (this.user.id) {
      try {
        this.isLoading = true
        await this.userService.updateUser(this.user.id, newUser)
          .then(() => {
            this.toastr.success('Usuario actualizado correctamente')
            this.router.navigate(['/home'])
          })
          .finally(() => {
            this.isLoading = false
          })
      } catch (error: any) {
        this.toastr.error(error.response.data.message)
      }
    } else {
      try {
        this.isLoading = true
        await this.userService.createUser(newUser).then(() => {
          this.toastr.success('Usuario creado correctamente')
          this.router.navigate(['/home'])
        }).finally(() => {
          this.isLoading = false
        })
      } catch (error: any) {
        this.toastr.error(error.response.data.message)
      }
    }
  }
}