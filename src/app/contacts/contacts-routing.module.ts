import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'contacts', component: ContactsComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ContactsRoutingModule { }