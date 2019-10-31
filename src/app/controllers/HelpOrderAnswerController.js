/** Libraries Imports */
import * as Yup from 'yup';
/** Models Imports */
import Student from '../models/Students';
import HelpOrder from '../models/HelpOrders';
/** Jobs */
import AnswerMail from '../jobs/AnswerMail';
/** Other */
import Queue from '../../lib/Queue';

class HelpOrderAnswer {
  /**
   * Store a answer to HelpOrder
   * @param {*} req
   * @param {*} res
   */

  async store(req, res) {
    /**
     * Request validator
     */

    const schema = Yup.object().shape({
      answer: Yup.string()
        .required()
        .max(255),
    });

    /** Request validation */

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;

    /**
     * HelpOrder validation
     */

    const helpOrder = await HelpOrder.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!helpOrder) {
      return res.status(401).json({ error: 'Request does not exist' });
    }

    /**
     * Updating, adding in Mail Job and returning answer
     */

    req.body.answer_at = new Date();

    await helpOrder.update(req.body);

    Queue.add(AnswerMail.key, { helpOrder });

    return res.json(helpOrder);
  }
}

export default new HelpOrderAnswer();
