export interface UserInterface {
    id: string;
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    classID: string;
    snackCredit: number;
    photoURL: string;
    stripeID: string;
    isVice?: boolean;
    isRappre?: boolean;
    isQp?: boolean;
    isRappreDiClasse?: boolean;
    isBar?: boolean;
    isAdmin?: boolean;
}
