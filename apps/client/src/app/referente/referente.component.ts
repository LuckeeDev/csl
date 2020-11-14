import { Component, OnInit } from '@angular/core';
import { AuthService } from '@global/services/auth/auth.service';
import { IDashboardLink, IUser } from '@csl/shared';
import { ActivatedRoute } from '@angular/router';

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
  commissione: string;

  constructor(private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.commissione = this.activated.snapshot.paramMap.get('commissione');
  }

}
