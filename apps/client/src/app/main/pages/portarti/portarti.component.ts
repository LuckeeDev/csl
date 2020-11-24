import { Component, OnInit } from '@angular/core';
import { CommissioniService } from '@global/services/commissioni/commissioni.service';
import { Observable } from 'rxjs';
import { ICommissione } from '@csl/shared';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'csl-portarti',
  templateUrl: './portarti.component.html',
  styleUrls: ['./portarti.component.scss'],
})
export class PortartiComponent implements OnInit {
  portarti$: Observable<ICommissione>;

  constructor(
    private commissioni: CommissioniService,
    private afs: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.portarti$ = this.commissioni.getPage('portarti').pipe(
      map((res) => res.data),
      map((portarti) => {
        if (portarti && portarti.page) {
          portarti.page.blocks.map(async (block) => {
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

        return portarti;
      })
    );
  }
}
