module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'gympassdocker',
  database: 'gympoint',
  port: 6000,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
