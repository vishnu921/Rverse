module.exports = function (app) {
  app.use((req, res, next) => {
    res.status(404).json({
      success: false,
      message: 'Invalid Endpoint'
  });
    next();
  });

  app.use(async (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
      success: false,
      message: err.message,
    })
  })
}