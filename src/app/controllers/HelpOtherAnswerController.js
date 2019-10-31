import * as Yup from 'yup';
import HelpOther from '../models/HelpOthers';
import Queue from '../../lib/Queue';
import AnswerMail from '../jobs/AnswerMail';
import Student from '../models/Students';

class HelpOtherAnswer {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string()
        .required()
        .max(255),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;

    const helpOther = await HelpOther.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!helpOther) {
      return res.status(401).json({ error: 'Request does not exist' });
    }

    req.body.answer_at = new Date();

    const helpOtherAnswer = await helpOther.update(req.body);

    Queue.add(AnswerMail.key, { helpOther });

    return res.json(helpOther);
  }
}

export default new HelpOtherAnswer();
