const express=require("express")
const bodyParser=require("body-parser")
const ejs=require("ejs")
const app=express()
const mongoose=require("mongoose")
app.use(bodyParser.urlencoded({
    extended:true
}))
app.set('view engine','ejs')
app.use(express.static("public"))

mongoose.connect('mongodb+srv://Harsh:test123@cluster0.iqn1prm.mongodb.net/guptaopticals', {useNewUrlParser: true});
app.get("/",function(req,res){
    res.render("form")
})

const itemsSchema2 = new mongoose.Schema({
    Name: String,
    Mobile:Number,
    Address: String,
    Date: Date,
    Right_SPH: String,
    Right_CYL: String,
    Right_AXIS: String,
    Right_ADD: String,
    Right_VISION: String,
    Right_SPH: String,
    Right_CYL: String,
    Right_ADD: String,
    Right_VISION: String,
    Items: String,
    Items_Description: String,
    Qty: Number,
    Total: Number
});


const User = mongoose.model("user", itemsSchema2)
  app.post("/", function(req, res){
    const user=new User({
        Name: req.body.Name,
        Mobile:req.body.Mobile,
        Address: req.body.Address,
        Date: req.body.Date,
        // Right_SPH: req.body.Right_SPH
    })
    user.save()
    res.redirect('/')
  })

  app.get("/search",function(req,res){
    res.render("search")
  })


  app.post("/search", function(req, res){
    
    const search= req.body.Search
    User.find({Name:{$regex:search,$options:'$i'}},function(err,data){
      res.render("form2",{newlist:data})
    })
  })
  let length=1

  app.post("/submit", function(req, res){
    length=length+1

    
    
  });

  


const port=process.env.PORT || 3000

app.listen(port,function(){
    console.log("connected to the port 3000")
})


