import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ICommissione } from '@csl/shared';
import { CommissioniService } from '@global/services/commissioni/commissioni.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'csl-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
})
export class ConsultaComponent implements OnInit {
  consulta$: Observable<ICommissione>;

  constructor(
    private commissioni: CommissioniService,
    private afs: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.consulta$ = this.commissioni.getPage('consulta').pipe(
      map((res) => res.data),
      map((consulta) => {
        if (consulta && consulta.page) {
          consulta.page.blocks.map(async (block) => {
            if (block.type === 'image') {
              block.data.file.firebaseURL = await this.afs
                .ref(`${block.data.file.firebasePath}`)
                .getDownloadURL()
                .toPromise();

              return block;
            } else {
              return block;
            }
          });
        }

        return consulta;
      })
    );
  }
}
