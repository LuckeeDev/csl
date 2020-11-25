// Main imports
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

// UI elements
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';

// Services
import { MembersService } from '@shared/services/members/members.service';
import { AuthService } from '@global/services/auth/auth.service';
import { ToastrService } from '@csl/ui';

import { IRole, TRole } from '@csl/shared';
import { Select, Store } from '@ngxs/store';
import { Classes, ClassState, ClassStateModel, Roles } from '@shared/store';

@Component({
  selector: 'csl-single-class',
  templateUrl: './single-class.component.html',
  styleUrls: ['./single-class.component.scss'],
})
export class SingleClassComponent implements OnInit {
  @Select(ClassState)
  state$: Observable<ClassStateModel>;

  classID: string;
  displayedColumns: string[];

  roleCtrl = new FormControl();

  allRoles: IRole[] = [
    {
      description: 'Rappresentante di classe',
      role: 'isRappreDiClasse',
    },
    { description: 'Direttore di QP', role: 'isQp' },
    { description: 'Referente Arte', role: 'isReferente[arte]' },
    { description: 'Referente ASL', role: 'isReferente[asl]' },
    { description: 'Referente Biblioteca', role: 'isReferente[biblioteca]' },
    { description: 'Referente Cinema', role: 'isReferente[cinema]' },
    { description: 'Referente Consulta', role: 'isReferente[consulta]' },
    { description: 'Referente Dibattito', role: 'isReferente[dibattito]' },
    { description: 'Referente Green', role: 'isReferente[green]' },
    { description: 'Referente Feste', role: 'isReferente[feste]' },
    { description: 'Referente LIR', role: 'isReferente[lir]' },
    { description: 'Referente Musica', role: 'isReferente[musica]' },
    { description: 'Referente Omnia', role: 'isReferente[omnia]' },
    { description: 'Referente PortArti', role: 'isReferente[portarti]' },
    { description: 'Referente Sport', role: 'isReferente[sport]' },
    { description: 'Referente Tutoring', role: 'isReferente[tutoring]' },
    { description: 'Referente VALE', role: 'isReferente[vale]' },
  ];

  filteredRoles: Observable<IRole[]>;

  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private activated: ActivatedRoute,
    public members: MembersService,
    private toastr: ToastrService,
    public auth: AuthService,
    private router: Router,
    private store: Store
  ) {
    if (this.router.url.includes('bar-admin')) {
      this.displayedColumns = ['email', 'credit', 'manage'];
    } else if (this.router.url.includes('vice')) {
      this.displayedColumns = ['email'];
    } else if (this.router.url.includes('rappre')) {
      this.displayedColumns = ['email', 'roles'];
    } else if (this.router.url.includes('admin')) {
      this.displayedColumns = ['email', 'roles'];

      this.allRoles.push(
        {
          role: 'isRappre',
          description: "Rappresentante d'Istituto",
        },
        {
          role: 'isBar',
          description: 'Barista',
        },
        {
          role: 'isVice',
          description: 'Vice',
        }
      );
    }

    this.filteredRoles = this.roleCtrl.valueChanges.pipe(
      map((value: string | null) =>
        value ? this._filter(value) : this.allRoles.slice()
      )
    );

    this.classID = this.activated.snapshot.paramMap.get('classID');
  }

  ngOnInit() {
    this.state$.pipe(take(1)).subscribe((state) => {
      if (state.classes) {
        this.store.dispatch(new Classes.GetCurrent(this.classID));
      } else {
        this.store.dispatch(new Classes.Get(this.classID));
      }
    });
  }

  selected(
    event: MatAutocompleteSelectedEvent,
    email: string,
    roles: IRole[]
  ): void {
    const value = event.option.viewValue;
    const role = this.allRoles.find((x) => x.description === value);

    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);

    if (roles.find((x) => x.role === role.role)) {
      this.toastr.show({
        message: 'Questo utente ha già questo ruolo!',
        color: 'accent',
      });
    } else if (roles.find((x) => x.role.includes('isReferente'))) {
      this.toastr.showError(
        'Impossibile aggiungere un altro ruolo da referente!'
      );
    } else {
      this.store.dispatch(new Roles.Add(role, email)).subscribe(() => {
        this.toastr.show({
          message: `Ruolo aggiunto a ${email}`,
          color: 'success',
          action: 'Chiudi',
          duration: 5000,
        });
      });
    }
  }

  remove(role: TRole, email: string): void {
    this.store.dispatch(new Roles.Remove(role, email)).subscribe(() => {
      this.toastr.show({
        message: `Ruolo rimosso da ${email}`,
        color: 'accent',
      });
    });
  }

  private _filter(value: string): IRole[] {
    const filterValue = value.toLowerCase();

    return this.allRoles.filter(
      (x) => x.description.toLowerCase().indexOf(filterValue) === 0
    );
  }

  // // Update user credit (for bar)
  // updateCredit(email: string, money: number) {
  //   this.dialogService
  //     .open({
  //       title: 'Sei sicuro?',
  //       text: 'Potrai comunque modificare il credito in seguito',
  //       color: 'primary',
  //       answer: 'Sì, modifica credito',
  //     })
  //     .subscribe((res) => {
  //       this.members
  //         .updateCredit(email, Number(money))
  //         .subscribe((res: any) => {
  //           if (res.success === true) {
  //             this.toastr.show({
  //               message: 'Credito modificato',
  //               action: `Chiudi`,
  //               duration: 5000,
  //             });
  //           } else if (res.success === false) {
  //             this.toastr.showError();
  //           }
  //         });
  //     });
  // }
}
