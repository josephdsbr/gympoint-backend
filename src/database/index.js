import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import User from '../app/models/Users';
import Student from '../app/models/Students';
import Plan from '../app/models/Plans';
import Enrollment from '../app/models/Enrollments';

const models = [User, Student, Plan, Enrollment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
