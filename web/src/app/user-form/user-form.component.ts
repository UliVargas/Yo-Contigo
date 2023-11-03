import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userService: UsersService = inject(UsersService)
  @Input() isLoading: boolean = false

  @Input() user: User = {
    id: '',
    name: '',
    phone: '',
    email: '',
    birthdate: '',
    gender: ''
  };

  userId: string | undefined = ''

  constructor(private readonly route: ActivatedRoute, private _snackBar: MatSnackBar) {
    this.route.queryParamMap
      .subscribe((params) => {
        this.userId = params.get('userId') ?? undefined;
      });

    if (this.userId) {
      this.userService.getUserById(this.userId).then(user => {
        this.user = user
      })
    }
  }

  applyForm = new FormGroup({
    name: new FormControl(this.user.name, {
      validators: [
        Validators.required
      ]
    }),
    email: new FormControl(this.user.email, {
      validators: [
        Validators.required
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


  async onSubmit({ name }: { name: string }) {

    const newUser = {
      name: this.applyForm.value.name ?? '',
      email: this.applyForm.value.email ?? '',
      phone: this.applyForm.value.phone ?? '',
      birthdate: this.applyForm.value.birthdate ?? '',
      gender: this.applyForm.value.gender ?? ''
    }

    if (name) {
      try {
        this.isLoading = true
        await this.userService.updateUser(this.user.id, newUser)
          .then(() => {
            this._snackBar.open('Usuario actualizado correctamente', '', {
              duration: 3000
            })
          })
          .finally(() => {
            this.isLoading = false
          })
      } catch (error: any) {
        this._snackBar.open(error.response.data.message, '', {
          duration: 3000
        })
      }
    } else {
      try {
        this.isLoading = true
        await this.userService.createUser(newUser).then(() => {
          this._snackBar.open('Usuario creado correctamente', '', {
            duration: 3000
          })
        }).finally(() => {
          this.isLoading = false
        })
      } catch(error: any) {
        this._snackBar.open(error.response.data.message, '', {
          duration: 3000
        })
      }
    }
  }
}