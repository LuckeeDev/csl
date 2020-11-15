import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { IClass, IHttpRes, IRole, TRole } from '@csl/shared';
import { MembersService } from '@shared/services/members/members.service';
import produce from 'immer';
import { ToastrService } from '@csl/ui';

export namespace Classes {
  export class Get {
    static readonly type = '[Classes] Get';
    constructor(public classID?: string) {}
  }

  export class GetCurrent {
    static readonly type = '[Classes] Get Current';
    constructor(public classID: string) {}
  }
}

export namespace Roles {
  export class Add {
    static readonly type = '[Roles] Add';
    constructor(public role: IRole, public email: string) {}
  }

  export class Remove {
    static readonly type = '[Roles] Remove';
    constructor(public role: TRole, public email: string) {}
  }
}

export interface ClassStateModel {
  classes: IClass[];
  currentClass: IClass;
}

@State<ClassStateModel>({
  name: 'class',
})
@Injectable()
export class ClassState {
  constructor(private members: MembersService, private toastr: ToastrService) {}

  @Action(Classes.Get)
  getClasses(ctx: StateContext<ClassStateModel>, action: Classes.Get) {
    this.members.getClasses().subscribe((classes) => {
      if (action.classID) {
        const currentClass = classes.find((x) => x.id === action.classID);

        currentClass.members = currentClass.members.map((member) => {
          if (member.roles) {
            member.roles = member.roles.map((role) => this.transformRole(role));
          }

          return member;
        });

        ctx.setState({
          classes,
          currentClass,
        });
      } else {
        ctx.setState({
          classes,
          currentClass: null,
        });
      }
    });
  }

  @Action(Classes.GetCurrent)
  getCurrentClass(
    ctx: StateContext<ClassStateModel>,
    action: Classes.GetCurrent
  ) {
    return ctx.setState(
      produce(ctx.getState(), (draft) => {
        const currentClass = draft.classes.find((x) => x.id === action.classID);

        currentClass.members = currentClass.members.map((member) => {
          if (member.roles) {
            member.roles = member.roles.map((role) => this.transformRole(role));
          }

          return member;
        });

        draft.currentClass = currentClass;
      })
    );
  }

  @Action(Roles.Add)
  addRole(ctx: StateContext<ClassStateModel>, action: Roles.Add) {
    this.members
      .addRole(action.email, action.role.role)
      .subscribe((res: IHttpRes<any>) => {
        if (res.success === true) {
          ctx.setState(
            produce(ctx.getState(), (draft) => {
              const i = draft.currentClass.members.findIndex(
                (x) => x.email === action.email
              );

              draft.currentClass.members[i].roles.push(action.role);
            })
          );
        } else {
          this.toastr.showError();
        }
      });
  }

  @Action(Roles.Remove)
  removeRole(ctx: StateContext<ClassStateModel>, action: Roles.Remove) {
    this.members.removeRole(action.email, action.role).subscribe((res) => {
      if (res.success === true) {
        ctx.setState(
          produce(ctx.getState(), (draft) => {
            const iMember = draft.currentClass.members.findIndex(
              (x) => x.email === action.email
            );

            const iRole = draft.currentClass.members[iMember].roles.findIndex(
              (role) => role.role === action.role
            );

            draft.currentClass.members[iMember].roles.splice(iRole, 1);
          })
        );
      } else {
        this.toastr.showError();
      }
    });
  }

  private transformRole(role: TRole) {
    switch (role) {
      case 'isVice':
        return {
          role,
          description: 'Vice',
        };
      case 'isQp':
        return { role, description: 'Direttore di QP' };
      case 'isRappre':
        return { role, description: "Rappresentante d'istituto" };
      case 'isRappreDiClasse':
        return { role, description: 'Rappresentante di classe' };
      case 'isReferente[arte]':
        return { role, description: 'Referente Arte' };
      case 'isReferente[asl]':
        return { role, description: 'Referente ASL' };
      case 'isReferente[biblioteca]':
        return { role, description: 'Referente Biblioteca' };
      case 'isReferente[cinema]':
        return { role, description: 'Referente Cinema' };
      case 'isReferente[consulta]':
        return { role, description: 'Referente Consulta' };
      case 'isReferente[dibattito]':
        return { role, description: 'Referente Dibattito' };
      case 'isReferente[feste]':
        return { role, description: 'Referente Feste' };
      case 'isReferente[green]':
        return { role, description: 'Referente Green' };
      case 'isReferente[lir]':
        return { role, description: 'Referente LIR' };
      case 'isReferente[musica]':
        return { role, description: 'Referente Musica' };
      case 'isReferente[omnia]':
        return { role, description: 'Referente Omnia' };
      case 'isReferente[portarti]':
        return { role, description: 'Referente PortArti' };
      case 'isReferente[sport]':
        return { role, description: 'Referente Sport' };
      case 'isReferente[tutoring]':
        return { role, description: 'Referente Tutoring' };
      case 'isReferente[vale]':
        return { role, description: 'Referente VALE' };
    }
  }
}
