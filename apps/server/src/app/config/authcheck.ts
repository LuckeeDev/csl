import { Response, NextFunction } from 'express';
import { ICommissione, IRequest } from '@csl/shared';

function unauthorized(res: Response) {
  res.status(403).end();
}

// Checks if a user is admin
export const isAdmin = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is either vice, rappre or bar
export const isPowerful = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && (req.user.isVice || req.user.isRappre || req.user.isBar)) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is Vice
export const isVice = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isVice) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is rappre
export const isRappre = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isRappre) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is Qp
export const isQp = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isQp) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is the bar admin
export const isBar = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isBar) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is a Rappre di Classe
export const isRappreDiClasse = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.isRappreDiClasse) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user isReferente of the referred commissione
export const isReferente = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const params: any = req.params;
  const commissione: ICommissione['id'] = params.id;

  if (
    req.user &&
    ((commissione === 'comitato' && req.user.isRappre) ||
      req.user.isReferente === commissione)
  ) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is logged in and, if not, sends unauthorized response
export const authCheck = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user) {
    next();
  } else {
    unauthorized(res);
  }
};

// Checks if a user is logged in and, if not, sends a null response
export const profileCheck = (
  req: IRequest,
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
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    res.redirect('../dashboard');
  } else {
    next();
  }
};
