import * as Yup from 'yup';
import HelpOthers from '../models/HelpOthers';
import Student from '../models/Students';

class HelpOtherController {
  async index(req, res) {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const studentExists = await Student.findByPk(studentId);

    if (!studentExists) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const helpOther = await HelpOthers.findAll({
      where: {
        student_id: studentId,
      },
    });

    return res.json(helpOther);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string()
        .max(255)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ error: 'Validation fails ' });
    }

    const studentExists = await Student.findByPk(studentId);

    if (!studentExists) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    req.body.student_id = studentId;

    const helpOther = await HelpOthers.create(req.body);

    return res.json({ helpOther });
  }
}

export default new HelpOtherController();
