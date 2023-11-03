import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../constants'
import { User } from '../../models/user.model';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = BASE_API_URL

  async getAllUsers(): Promise<Pick<User, 'id' | 'name' | 'email'>[]> {
    const data = await fetch(`${this.url}/users`);
    return await data.json() ?? [];
  }

  async getUserById(id: string): Promise<User> {
    const data = await fetch(`${this.url}/users/${id}`)
    return await data.json() ?? {}
  }

  async updateUser(userId: string, user: Partial<User>): Promise<User> {
    const { data } = await axios.patch<User>(`${this.url}/users/${userId}`, user)
    return data
  }
  
  async createUser(user: Partial<User>): Promise<User> {
    const { data } = await axios.post<User>(`${this.url}/users`, user)
    return data
  }
}
