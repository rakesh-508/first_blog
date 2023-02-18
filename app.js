const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
const app = express();
const homeStartingContent = "This is Rakesh Ande and i am very happy to share my knowledge with you and all the people who has been watching and going towards my blog . In our past life everyone have been the problems and those problems are not very big problems as we compared to the problems faced by our parents and our god ,so be happy 😊 with your life wwhat ever happen and accept every thing that would come into our life.";
const aboutContent = "I am here to share my journey till now, I was born on january 26 which has being celebrated as the REPUBLC DAY of our most beautiful county INDIA 🕉️✝️☪️.I have awared with A.P.J ABDUL KALAM PRATHIBA AWARD in 10th class for grtting best result in SSC and i am very much thankful to all our my Hindu School staff for encouraging me  and that was my fist millestone 😍  i have reached, after that i completed my +1 and +2 in sri chaitanya jr college in guntur with good result and i am currently persuing my b.tech in Prasad v potuliti siddhartha institute of technology,vijayawada in the stream of c.s.e and i hope every thing will be fine if we keep on going with hard work.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      "
const contactContent = "Name: Ande Rakesh, s/o :Ande Gananandam , Permanent address: Bellam konda vari palem , Ngulavaram post, Macherla md , palanadu dt, phone no: 8688989462,mail id:rakeshande99@gmail.com";
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://20501a0508:994893232@cluster0.xndxzre.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      homeStartingContent: homeStartingContent,
      compose_data: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;
  Post.findOne({id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});






