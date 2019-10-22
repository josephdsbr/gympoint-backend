import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  /* Taking informations from Request's Header */

  const authHeader = req.headers.authorization;

  /* Header validation */

  if (!authHeader) {
    return res.status(401).json({ entity: { error: 'Token not found' } });
  }

  /* Extracting token from header */

  const [, token] = authHeader.split(' ');

  try {
    /* Decoding token to get informations about user */

    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    /* Verifing if user is authorizated to make the Request */
    const { email } = decoded;

    if (!(email === authConfig.adminEmail)) {
      return res.status(401).json({ entity: { error: 'Not Authorized!' } });
    }

    /* Storing User ID */

    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.json(401).json({ entity: { error: err } });
  }
};
