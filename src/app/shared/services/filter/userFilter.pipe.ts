
import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../../models/user.model';

@Pipe({ name: 'usersFilter' })
export class UsersFilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param users
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(users: User[], searchText: string): User[] {

    if (!users) {
      return [];
    }
    if (!searchText) {
      return users;
    }

    searchText = searchText.toLocaleLowerCase();

    return users.filter(function(it) {
      return it.lastName.toLocaleLowerCase().includes(searchText);
    });
  }
}
