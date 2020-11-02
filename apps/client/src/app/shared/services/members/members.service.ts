import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IClasse } from '@global/@types/classi';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MembersService {
  classes: any; // All classes
  currentClass: IClasse; // Class of the selected page

  constructor(private http: HttpClient) {}

  // Get all classes
  getClasses(): Observable<IClasse[]> {
    return this.http.get<IClasse[]>('/api/users').pipe(
      map((res: IClasse[]) => {
        return res.sort((a, b) => {
          const yearA = a.id.charAt(0).toString();
          const yearB = b.id.charAt(0).toString();

          const letterA = a.id.charCodeAt(1).toString();
          const letterB = b.id.charCodeAt(1).toString();

          const aCode = Number(yearA + letterA);
          const bCode = Number(yearB + letterB);

          return aCode - bCode;
        });
      })
    );
  }

  // Get the class of the selected page
  getCurrentClass(classID: string) {
    if (!this.classes) {
      this.http.get('/api/users').subscribe((res: IClasse[]) => {
        this.classes = res.sort((a, b) => {
          const yearA = a.id.charAt(0).toString();
          const yearB = b.id.charAt(0).toString();

          const letterA = a.id.charCodeAt(1).toString();
          const letterB = b.id.charCodeAt(1).toString();

          const aCode = Number(yearA + letterA);
          const bCode = Number(yearB + letterB);

          return aCode - bCode;
        });

        const currentClass: IClasse = this.classes.find(
          (obj) => obj.id == classID
        );

        currentClass.members.sort((a, b) => {
          if (a.email < b.email) {
            return -1;
          }
          if (a.email > b.email) {
            return 1;
          }
          return 0;
        });

        this.currentClass = currentClass;
      });
    } else {
      const currentClass: IClasse = this.classes.find(
        (obj) => obj.id == classID
      );

      currentClass.members.sort((a, b) => {
        if (a.email < b.email) {
          return -1;
        }
        if (a.email > b.email) {
          return 1;
        }
        return 0;
      });

      this.currentClass = currentClass;
    }
  }

  // Get roles of a specific user
  getRoles(email: string, callback): void {
    this.http.post('/api/users/getroles', { email }).subscribe(callback);
  }

  // Add a role to a user
  addRole(email: string, role: string): Observable<any> {
    return this.http.post('/api/users/addrole', {
      email,
      role,
    });
  }

  // Remove a role from a user
  removeRole(email: string, role: string): Observable<any> {
    return this.http.post('/api/users/removerole', {
      email,
      role,
    });
  }

  // Update credit on a user (for bar)
  updateCredit(email: string, money: number) {
    return this.http.patch(`/api/users/manage/credit/${email}`, { money }).pipe(
      tap((res: any) => {
        if (res.success === true) {
          const member = this.currentClass.members.find(
            (x) => x.email === email
          );
          const i = this.currentClass.members.indexOf(member);
          const snackCredit = member.snackCredit + money;

          this.currentClass.members[i] = {
            email,
            snackCredit,
          };
        }
      })
    );
  }
}
