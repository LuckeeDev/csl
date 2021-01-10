import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, ToastrService } from '@csl/ui';
import { OrientamentoService } from '@global/services/orientamento/orientamento.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'csl-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  url: string;
  cover: File;

  event = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    preview: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    cover: new FormControl('', Validators.required),
    signup: new FormControl('', [
        Validators.required,
        Validators.pattern(
          // Accept only valid URLs
          'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)'
        )])
  });

  constructor(
    private dialog: DialogService,
    private toastr: ToastrService,
    private orientamento: OrientamentoService,
    private afs: AngularFireStorage,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  uploadFile(e) {
    this.cover = e.target.files[0];

    this.event.patchValue({
      cover: `${Date.now()}_${this.cover.name}`,
    });

    this.url = URL.createObjectURL(this.cover);
  }

  createEvent(formElement: HTMLFormElement) {
    this.dialog.open({
      title: `Creare evento?`,
      text: `Se confermi, l'evento "${this.event.value.title}" sarà creato e non potrà più essere modificato`,
      answer: 'Crea evento',
      color: 'primary',
    }).subscribe(() => {
      this.afs
        .upload(`orientamento/covers/${this.event.value.cover}`, this.cover)
        .then(() => {
          this.orientamento
            .createEvent(this.event.value)
            .subscribe((res) => {
              if (res.success) {
                this.toastr.show({
                  message: `Evento creato con successo`,
                  color: 'basic',
                });

                this.event.reset();
                formElement.reset();
                this.url = null;

                this.router.navigate(['..', 'rappre', 'orientamento']);
              } else {
                this.toastr.showError();
              }
            });
        })
    });
  }

}
