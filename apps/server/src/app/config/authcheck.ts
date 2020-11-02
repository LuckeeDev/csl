import { Request, Response, NextFunction } from 'express';
import { IReqUser } from '../models/user/model';

function unauthorized(res: Response) {
  res.status(403).end();
}

// Checks if a user is either vice, rappre or bar
export const isPowerful = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IReqUser = req.user!;

  if (req.user && (user.isVice || user.isRappre || user.isBar)) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is Vice
export const isVice = (req: Request, res: Response, next: NextFunction) => {
  const user: IReqUser = req.user!;

  if (user && user.isVice) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is rappre
export const isRappre = (req: Request, res: Response, next: NextFunction) => {
  const user: IReqUser = req.user!;

  if (user && user.isRappre) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is Qp
export const isQp = (req: Request, res: Response, next: NextFunction) => {
  const user: IReqUser = req.user!;

  if (user && user.isQp) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is the bar admin
export const isBar = (req: Request, res: Response, next: NextFunction) => {
  const user: IReqUser = req.user!;

  if (user && user.isBar) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is a Rappre di Classe
export const isRappreDiClasse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IReqUser = req.user!;

  if (user && user.isRappreDiClasse) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is logged in and, if not, sends unauthorized response
export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is logged in and, if not, sends a null response
export const profileCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    next();
  } else {
    res.send(null);
  }
};

// Checks if a user is not yet logged in
export const notAuthCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    res.redirect('../dashboard');
  } else {
    next();
  }
};
