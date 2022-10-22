
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IContact } from './contact.model';
import { CONTACTS } from './mock-contacts';

@Injectable()
export class ContactService {
    public contacts: IContact[] = [];
    public noOfContacts: number = 0;
    private _activeContact : IContact;

    constructor (private http: HttpClient,
                 private route: ActivatedRoute) {

                 }

    getContacts(): Promise<IContact[]> {
    // if we already have the contacts don't make the api call
    if(this.contacts) {
      return Promise.resolve(this.contacts);
    }
    this.contacts = CONTACTS;

    var promise = new Promise<IContact[]>(function() {
        //  resolve(CONTACTS);
    }.bind(this));
        return promise;
    }

    generateContacts(numberOfContacts: number) : IContact[] {

      var contacts: IContact[] = [];
      // there are six contacts initially
      for(let i =0 ; i< Math.floor(numberOfContacts/6) ; i++) {
        contacts = contacts.concat(CONTACTS);
      }
    
      // add more contacts based on remainder
      for(let i=0; i< (numberOfContacts%6) ; i++ ) {
         contacts.push(CONTACTS[i]);
      }
      return contacts;
    }

    getContactList(noOfContacts: number):Observable<IContact[]> {
    var url = '/getContacts?no_of_contacts='+noOfContacts;
  //  return this.http.get(url)
  //    .map(response => response.json());

        return of(this.generateContacts(noOfContacts));
      }

    private extractData(res: Response) {
    let body: any = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body: any = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    // return throw new (errMsg);
  }

    addNewContact(contact: IContact) : void {
      // append one of the six image in the added contact
      var randomNumber = Math.floor(Math.random() * 6) + 1 ;
      contact.imageId = randomNumber;
      this.contacts.push(contact);
    }

    editContact(contact: IContact) : void {
       this.contacts = this.contacts.map(function(obj) {
           if(obj.id == contact.id) {
               return contact;
           }

           return obj;
       })
    }

    deleteContact(index: number) {
         this.contacts.splice(index, 1);
    }

    get activeContact(): IContact {
        return this._activeContact;
    }

    set activeContact(contact: IContact) {
        this._activeContact = contact;
    }

}
