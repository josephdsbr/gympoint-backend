/** Models Imports */
import HelpOrder from '../models/HelpOrders';

class HelpOrderNotAnswer {
  /**
   * List not answered Help Orders
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const helpOrder = await HelpOrder.findAll({
      where: {
        answer: null,
      },
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderNotAnswer();
