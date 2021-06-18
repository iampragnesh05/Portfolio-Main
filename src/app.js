const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const port = process.env.PORT || 3000;
const _ = require('lodash');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


// Setting up Middleware
const publicDirectoryPath = path.join(__dirname, "/public");
app.use(express.static(publicDirectoryPath));
const viewsPath = path.join(__dirname, "templates/views");
const partialPath = path.join(__dirname, 'templates/partials');

app.set('view engine', 'ejs');
app.set("views", viewsPath);

const startingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
let posts = [];

app.get('/', (req,res) => {
   res.render('index')
});
app.get('/resume', (req, res) => {
    res.render('resume')
})
app.get('/blogs', (req, res) => {
    res.render('blogs', {
        startingContent: startingContent,
        posts: posts,
        storedTitle: _.kebabCase(_.lowerCase(posts.title))
    })
})
app.get('/compose', (req , res) => {
    res.render('compose')
})
app.get("/resources", (req, res) => {
    res.render('resouces')
})
app.get("/work", (req, res) => {
    res.render('work')
})

app.get("/contact", (req, res) => {
    res.render("contact")
})

app.get("/thanks", (req, res) => {
    res.render('thanks')
})

app.post("/compose", (req, res) => {
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    }
    posts.push(post);
     res.redirect("/")
})

app.post("/contact", (req, res) => {
    const name = req.body.name;
    res.render('thanks', {
        name: name
    })
      res.redirect("/thanks")
  })

app.get("/posts/:postName", (req,res) => {
    const reqTitle = req.params.postName

    posts.forEach(post => {
        const storedTitle = _.kebabCase(_.lowerCase(post.title));

        if(reqTitle === storedTitle){
            res.render('posts', {
                title: post.title,
                content: post.content
            })
        }else{
            console.log("Some problem")
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})