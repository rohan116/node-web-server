const express = require('express');
const path = require('path');
const hbs = require('hbs');
var app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('View Engine','hbs');

app.use((req,res,next) => {
  var now =  new Date().toString();
  var log = now + " : "+req.method + " " + req.url;
  console.log(log);
  fs.appendFile('server.log', log + '\n' ,(err) => {
    if(err){
      console.log('Unable to append file');
    }
  })
  next();
})

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
//   next();
// })

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('toUpperCase',(text) => {
  return text.toUpperCase();
});
// app.use(express.static(__dirname + '/Omnifood Website'));

app.get('/',(request,response) => {
  response.send({
    name: "Rohan",
    likes: ['Movies','Studying']
  });
})

app.get('/home',(request,response) => {
  response.render('home.hbs',{
    Page_Title: "Home Page by Rohan",
    Welcome_message : "This is my new page"
    //year : new Date().getFullYear()
  })
})

app.get('/about',(request,response) => {
  response.render('about.hbs',{
    Page_Title: "About Page",
    Welcome_message : "This is my new about page"
    //year : new Date().getFullYear()
  });
})

app.get('/projects',(req,res) => {
  res.render('projects.hbs',{
    Page_Title: "Projects Page",
    Welcome_message : "This is my new Projects page"
  })
});

app.get('/about/bad',(request,response) => {
  response.send({
    errorMessage : 'Unable to fetch this page, Please try again'
  });
})

app.listen(port);
