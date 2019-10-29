import * as Yup from 'yup';
import Enrollment from '../models/Enrollments';
import Student from '../models/Students';

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

    const enrollment = await Enrollment.create(req.body);

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
