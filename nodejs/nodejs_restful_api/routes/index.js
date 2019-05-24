module.exports = (app)=>{
  // root
  app.get('/', (req, res)=>{
    // server storage
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');

  });

}