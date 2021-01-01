import { Component, OnInit } from '@angular/core';
import { CommissioniService } from '@global/services/commissioni/commissioni.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ICommissione } from '@csl/shared';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'csl-asl',
  templateUrl: './asl.component.html',
  styleUrls: ['./asl.component.scss'],
})
export class AslComponent implements OnInit {
  asl$: Observable<ICommissione>;

  constructor(
    private commissioni: CommissioniService,
    private afs: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.asl$ = this.commissioni.getPage('asl').pipe(
      map((res) => res.data),
      map((asl) => {
        if (asl) {
          if (asl.page) {
            asl.page.blocks.map(async (block) => {
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

          if (asl.files.length > 0) {
            asl.files.map(async (file) => {
              const url: string = await this.afs
                .ref(`commissioni/pdf/asl/${file}`)
                .getDownloadURL()
                .toPromise();

              return url;
            });
          }
        }

        return asl;
      })
    );
  }
}
