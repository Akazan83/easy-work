
import { Pipe, PipeTransform } from '@angular/core';
import {Ticket} from '../../models/ticket.model';

@Pipe({ name: 'ticketsFilter' })
export class TicketsFilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: Ticket[], searchText: string): Ticket[] {

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLocaleLowerCase();

    return items.filter(function(it){
      return it.id.toString().includes(searchText);
    });
  }


}
