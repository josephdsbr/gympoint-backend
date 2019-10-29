import * as Yup from 'yup';
import Plan from '../models/Plans';

class PlanController {
  async index(req, res) {
    const plan = await Plan.findAll();

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .min(0)
        .required(),
      price: Yup.number()
        .min(0)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number()
        .integer()
        .min(0),
      price: Yup.number().min(0),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(401).json({ error: 'Identification not provided ' });
    }

    const planExists = await Plan.findOne({ where: { id } });

    if (!planExists) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    const plan = await Plan.update(req.body, { where: { id } });
    const updatedPlan = await Plan.findOne({ where: { id } });

    return res.json(updatedPlan);
  }

  async delete(req, res) {
    const { id } = req.params;

    const planExists = await Plan.findOne({ where: { id } });

    if (!planExists) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    await Plan.destroy({ where: { id } });
    return res.json({ message: `Plan ${id} was removed!` });
  }
}

export default new PlanController();
