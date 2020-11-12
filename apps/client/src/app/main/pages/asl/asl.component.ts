import { Component, OnInit } from '@angular/core';
import { CommissioniService } from '@global/services/commissioni/commissioni.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICommissione } from '@csl/shared';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'csl-asl',
  templateUrl: './asl.component.html',
  styleUrls: ['./asl.component.scss'],
})
export class AslComponent implements OnInit {
  asl$: Observable<ICommissione>;

  constructor(private commissioni: CommissioniService, private afs: AngularFireStorage) {}

  ngOnInit(): void {
    this.asl$ = this.commissioni.getPage('asl').pipe(
      map((res) => res.data),
      map((asl) => {
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

        return asl;
      })
    );
  }
}
