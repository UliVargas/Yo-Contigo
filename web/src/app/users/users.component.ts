import { Component, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
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

  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  dataSource: Pick<User, 'id' | 'name' | 'email'>[] = [];

  selectedUser?: User;
  onSelect(user: User): void {
    this.selectedUser = user
  }
}