const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//EXPRESS APP
const app = express();
const port = 3000;

//DB CONNECTION
const dbURI = 'mongo-database-url';
mongoose.connect(dbURI)
    .then((result) => {
        console.log('connected to MongoDB!');
        //LISTEN PORT
        app.listen(port);
        console.log(`listening on port ${port}`)
    })
    .catch((err) => { console.log(err) });

//REGISTER VIEW ENGINE
app.set('view engine', 'ejs');

//LET STATIC FILES USABLES IN PUBLIC FOLDER
app.use(express.static('public'));
app.use(express.json());

//FOR DATA FROM FORM
app.use(express.urlencoded({ extended: true }));


//ROUTES
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//BLOG ROUTES
app.use('/blogs', blogRoutes);

//404 (Two options - Both needs to be last)
app.get('/*', (req, res) => {
    res.render('404', { title: '404' });
})
// app.use((req, res)=>{
//     res.sendFile('./views/404.html', {root: __dirname});
// })