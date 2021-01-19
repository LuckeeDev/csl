import { Request, Response, Router } from 'express';
const router = Router();
import { isRappre, isBar, isPowerful } from '@common/auth';
import { addRole, removeRole, getRoles, updateCredit } from '@controllers/user';
import { getClasses } from '@controllers/classe';

// Get all members in classes
router.get('/', isPowerful, async (req: Request, res: Response) => {
  const classes = await getClasses();
  res.json(classes);
});

// Add a role to a member
router.post('/addrole', isRappre, async (req: Request, res: Response) => {
  const result = await addRole(req.body.email, req.body.role);
  res.json(result);
});

// Remove a role from a member
router.post('/removerole', isRappre, async (req: Request, res: Response) => {
  const result = await removeRole(req.body.email, req.body.role);
  res.json(result);
});

// Get all roles of a specific member
router.post('/getroles', isRappre, async (req: Request, res: Response) => {
  const roles = await getRoles(req.body.email);
  res.send(roles);
});

// Update credit of a user
router.patch(
  '/manage/credit/:email',
  isBar,
  async (req: Request, res: Response) => {
    const result = await updateCredit(req.params.email, req.body.money);
    res.json(result);
  }
);

export { router as users };
