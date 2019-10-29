import * as Yup from 'yup';
import Student from '../models/Students';

class StudentController {
  async index(req, res) {
    const student = await Student.findAll();
    return res.json(student);
  }

  /* Creating a new Student in the database with the method Store() */

  async store(req, res) {
    /* Defining a Schema to ENTRY DATA VALIDATION */

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().min(0),
      height: Yup.number().min(0),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(401).json({ error: 'E-mail already used' });
    }

    const { id, name, email } = await Student.create(req.body);

    return res.json({
      entity: {
        student: {
          id,
          name,
          email,
        },
      },
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .integer()
        .positive()
        .required(),
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.integer().min(0),
      weight: Yup.double().min(0),
      height: Yup.double().min(0),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ entity: { error: 'Validation fails' } });
    }

    const { id } = req.body;

    const studentExists = await Student.findOne({ where: { id } });

    if (!studentExists) {
      return res.status(401).json({ entity: { error: 'Student not found' } });
    }

    const { name, email } = await Student.update(req.body);

    return res.json({
      entity: {
        user: { name, email },
      },
    });
  }
}

export default new StudentController();
