import * as Yup from 'yup';
import Enrollment from '../models/Enrollments';
import Student from '../models/Students';

import InfoMail from '../jobs/InfoMail';
import Queue from '../../lib/Queue';
import Plan from '../models/Plans';

class EnrollmentController {
  async index(req, res) {
    const enrollment = await Enrollment.findAll();

    return res.json(enrollment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .positive()
        .required(),
      plan_id: Yup.number()
        .integer()
        .positive()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const enrollmentExists = await Enrollment.findOne({
      where: { student_id: req.body.student_id },
    });

    if (enrollmentExists) {
      return res
        .status(401)
        .json({ error: 'Student already has an enrollment' });
    }

    const { id } = await Enrollment.create(req.body);

    const enrollment = await Enrollment.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['duration', 'title'],
        },
      ],
    });
    await Queue.add(InfoMail.key, { enrollment });

    return res.json(enrollment);
  }

  /**
   * Asyncronus HTTP Request to update Enrollment values
   * @param {*} req
   * @param {*} res
   */

  async update(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .positive(),
      plan_id: Yup.number()
        .integer()
        .positive(),
      start_date: Yup.date(),
    });

    const enrollment = await Enrollment.findByPk(id);

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const newEnrollment = await enrollment.update(req.body);

    return res.json(newEnrollment);
  }

  async delete(req, res) {
    const { id } = req.params;

    const enrollmentExists = await Enrollment.findByPk(id);

    if (!enrollmentExists) {
      return res.status(400).json({ error: 'Register does not exist' });
    }

    await Enrollment.destroy({ where: { id } });

    return res.json({ message: 'Register was removed' });
  }
}

export default new EnrollmentController();
