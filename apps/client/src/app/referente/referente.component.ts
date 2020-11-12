import { Component, OnInit } from '@angular/core';
import { AuthService } from '@global/services/auth/auth.service';
import { IDashboardLink, IUser } from '@csl/shared';

@Component({
  selector: 'csl-referente',
  templateUrl: './referente.component.html',
  styleUrls: ['./referente.component.scss']
})
export class ReferenteComponent implements OnInit {
  links: IDashboardLink[] = [
    { title: 'Home', link: '.' },
    { title: 'Gestisci pagina', link: 'editor' },
  ]
  commissione: IUser['isReferente'];

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.commissione = user.isReferente;
    })
  }

}
