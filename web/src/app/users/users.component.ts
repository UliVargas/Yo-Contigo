import { Component, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  users: Pick<User, 'id' | 'name' | 'email'>[] = []
  userService: UsersService = inject(UsersService)

  constructor() {
    this.userService.getAllUsers().then((users: Pick<User, 'id' | 'name' | 'email'>[]) => {
      this.users = users;
      this.dataSource = users;
    });
  }

  displayedColumns: {
    key: string;
    header: string;
  }[] = [
    {
      key: 'id', header: 'ID'
    },
    {
      key: 'name', header: 'Nombre'
    },
    {
      key: 'email', header: 'Correo'
    },
    {
      key: 'actions', header: 'Acciones'
    }
  ];
  dataSource: any[] = [];

  selectedUser?: User;
  onSelect(user: User): void {
    this.selectedUser = user
  }
}