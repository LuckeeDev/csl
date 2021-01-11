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
      switchMap((params) => {
        this.id = params.get('id');
        return this.commissioni.getPage(this.id);
      }),
      map((res) => res.data),
      map((commissione) => {
        if (commissione) {
          if (commissione.page) {
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

          // if (commissione.files.length > 0) {
          //   commissione.files.forEach(async (file, index: number) => {
          //       commissione.files[index] = await this.afs
          //         .ref(
          //         `commissioni/pdf/${this.id}/${file}`
          //         )
          //         .getDownloadURL()
          //         .toPromise();
          //     }
          //   );
          // }
        }

        return commissione;
      })
    );
  }
}
