import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAccount, IClass, IHttpRes } from '@csl/shared';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MembersService {
  constructor(private http: HttpClient) {}

  getClasses(): Observable<IClass[]> {
    return this.http
      .get<IClass[]>('/api/users', {
        headers: {
          ignoreLoadingBar: '',
        },
      })
      .pipe(
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

  createAccount(account: IAccount): Observable<IHttpRes<any>> {
    return this.http.post<IHttpRes<any>>(
      '/api/admin/accounts',
      { account },
      {
        headers: {
          ignoreLoadingBar: '',
        },
      }
    );
  }

  removeAccount(email: string): Observable<IHttpRes<any>> {
    return this.http.delete<IHttpRes<any>>(`/api/admin/accounts/${email}`, {
      headers: {
        ignoreLoadingBar: '',
      },
    });
  }

  addRole(email: string, role: string): Observable<any> {
    return this.http.post(
      '/api/users/addrole',
      {
        email,
        role,
      },
      {
        headers: {
          ignoreLoadingBar: '',
        },
      }
    );
  }

  removeRole(email: string, role: string): Observable<any> {
    return this.http.post(
      '/api/users/removerole',
      {
        email,
        role,
      },
      {
        headers: {
          ignoreLoadingBar: '',
        },
      }
    );
  }

  // updateCredit(email: string, money: number) {
  //   return this.http.patch(`/api/users/manage/credit/${email}`, { money }).pipe(
  //     tap((res: any) => {
  //       if (res.success === true) {
  //         const member = this.currentClass.members.find(
  //           (x) => x.email === email
  //         );
  //         const i = this.currentClass.members.indexOf(member);
  //         const snackCredit = member.snackCredit + money;

  //         this.currentClass.members[i] = {
  //           email,
  //           snackCredit,
  //         };
  //       }
  //     })
  //   );
  // }
}
