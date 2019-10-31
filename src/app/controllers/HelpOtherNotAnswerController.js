import * as Yup from 'yup';
import HelpOthers from '../models/HelpOthers';
import Student from '../models/Students';

class HelpOtherNotAnswer {
  async index(req, res) {
    const helpOther = await HelpOthers.findAll({
      where: {
        answer: null,
      },
    });

    return res.json(helpOther);
  }
}

export default new HelpOtherNotAnswer();
