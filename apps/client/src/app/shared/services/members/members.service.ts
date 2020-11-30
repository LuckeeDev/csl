import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAccount, IClass, IHttpRes } from '@csl/shared';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MembersService {
  classes: IClass[];
  currentClass: IClass;

  constructor(private http: HttpClient) {}

  getClasses(): Observable<IClass[]> {
    return this.http.get<IClass[]>('/api/users').pipe(
      map((res: IClass[]) => {
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

  getCurrentClass(classID: string) {
    if (!this.classes) {
      this.http.get('/api/users').subscribe((res: IClass[]) => {
        this.classes = res.sort((a, b) => {
          const yearA = a.id.charAt(0).toString();
          const yearB = b.id.charAt(0).toString();

          const letterA = a.id.charCodeAt(1).toString();
          const letterB = b.id.charCodeAt(1).toString();

          const aCode = Number(yearA + letterA);
          const bCode = Number(yearB + letterB);

          return aCode - bCode;
        });

        const currentClass: IClass = this.classes.find(
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
      const currentClass: IClass = this.classes.find(
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

  createAccount(account: IAccount): Observable<IHttpRes<any>> {
    return this.http.post<IHttpRes<any>>('/api/admin/accounts', { account });
  }

  removeAccount(email: string): Observable<IHttpRes<any>> {
    return this.http.delete<IHttpRes<any>>(`/api/admin/accounts/${email}`);
  }

  getRoles(email: string, callback): void {
    this.http.post('/api/users/getroles', { email }).subscribe(callback);
  }

  addRole(email: string, role: string): Observable<any> {
    return this.http.post('/api/users/addrole', {
      email,
      role,
    });
  }

  removeRole(email: string, role: string): Observable<any> {
    return this.http.post('/api/users/removerole', {
      email,
      role,
    });
  }

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
