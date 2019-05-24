import db from '../db/db';

module.exports = (app) => {
  app.get('/api/foo', (_req, res)=>{
    res.status(200).send({
      success: 'true',
      message: "test retrieved successfully",
      test: db
    })
  });
}