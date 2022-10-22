import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { IContact } from '../contact/contact.model';
import { ContactService } from '../contact/contact.service';
@Component({
    selector: 'new-contact',
    templateUrl: './new-contact.component.html'
})
export class NewContactsComponent implements OnInit {

    title = 'List of contacts';
    contacts: IContact[];
    selectedContact: IContact;
    navigated: boolean;
    gettingEdited: boolean;
    contact: IContact = {} as any;
    constructor(
            private contactService: ContactService,
            private router: Router,
            private route: ActivatedRoute
            ) { }

    ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
        if (params['id'] !== undefined) {
          this.gettingEdited = true;
          this.contact = this.contactService.activeContact;
          this.navigated = true;
        } else {
          this.gettingEdited = false;
          this.navigated = false;
          this.contact = new IContact();
        }
      });
    }

    /**
    * @description Add the new contact to the
    **/
    add(contact: IContact) : void {
      this.contactService.addNewContact(contact);
      this.router.navigate(['/contacts']);

    }

    edit(contact: IContact): void {
      this.contactService.editContact(contact);
      this.router.navigate(['/contacts']);

    }

    cancel(ev: any) {
    this.router.navigate(['/contacts']);
    console.log(ev);
    }

}
