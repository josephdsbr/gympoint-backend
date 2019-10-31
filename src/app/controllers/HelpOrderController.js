/** Libraries Imports */
import * as Yup from 'yup';
/** Models Imports */
import HelpOrder from '../models/HelpOrders';
import Student from '../models/Students';

class HelpOrderController {
  /**
   * List specific Student's HElpOrder
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    /**
     * Student validation
     */
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const studentExists = await Student.findByPk(studentId);

    if (!studentExists) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    /**
     * Returning List of HelpOrders
     */

    const helpOrder = await HelpOrder.findAll({
      where: {
        student_id: studentId,
      },
    });

    return res.json(helpOrder);
  }

  /**
   * Store a HelpOrder
   * @param {*} req
   * @param {*} res
   */

  async store(req, res) {
    /**
     * Request validator
     */
    const schema = Yup.object().shape({
      question: Yup.string()
        .max(255)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Student validation
     */

    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ error: 'Validation fails ' });
    }

    const studentExists = await Student.findByPk(studentId);

    if (!studentExists) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    /**
     * Creating and Returning HelpOrder
     */

    req.body.student_id = studentId;

    const helpOrder = await HelpOrder.create(req.body);

    return res.json({ helpOrder });
  }
}

export default new HelpOrderController();
