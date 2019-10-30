import * as Yup from 'yup';
import Checkin from '../models/Checkins';

class CheckinController {
  async index(req, res) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const checkin = await Checkin.findAll({ where: { user_id: userId } });

    return res.json(checkin);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Validation if Student is more then 5 times in the last 7 current days
     */

    const checkin = await Checkin.create(req.body);

    return res.json(checkin);
  }
}

export default new CheckinController();
