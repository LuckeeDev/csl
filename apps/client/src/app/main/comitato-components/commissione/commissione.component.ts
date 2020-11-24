import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommissioniService } from '@global/services/commissioni/commissioni.service';
import { ICommissione } from '@csl/shared';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'csl-commissione',
  templateUrl: './commissione.component.html',
  styleUrls: ['./commissione.component.scss'],
})
export class CommissioneComponent implements OnInit {
  commissione$: Observable<ICommissione>;
  id: string;

  constructor(
    private activated: ActivatedRoute,
    private commissioni: CommissioniService,
    private afs: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.commissione$ = this.activated.paramMap.pipe(
      switchMap((params) => this.commissioni.getPage(params.get('id'))),
      map((res) => res.data),
      map((commissione) => {
        if (commissione && commissione.page) {
          commissione.page.blocks.map(async (block) => {
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

        return commissione;
      })
    );
  }
}
