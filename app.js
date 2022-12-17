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
let length=1

mongoose.connect('mongodb+srv://Harsh:test123@cluster0.iqn1prm.mongodb.net/guptaopticals', {useNewUrlParser: true});
app.get("/",function(req,res){
    res.render("form",{newlength:length})
    alert(length)
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
    Left_SPH: String,
    Left_CYL: String,
    Left_Axis: String,
    Left_ADD: String,
    Left_VISION: String,
    Items: String,
    Description: String,
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
        Right_SPH: req.body.Right_SPH,
        Right_CYL: req.body.Right_CYL,
        Right_AXIS: req.body.Right_AXIS,
        Right_ADD: req.body.Right_ADD,
        Right_VISION: req.body.Right_VISION,
        Left_SPH: req.body.Left_SPH,
        Left_CYL: req.body.Left_CYL,
        Left_Axis: req.body.Left_Axis,
        Left_ADD: req.body.Left_ADD,
        Left_VISION: req.body.Left_VISION,
        Items:req.body.Items,
        Description:req.body.Description,
        Qty:req.body.Qty,
        Total:req.body.Total

    })
    user.save()
    res.redirect('/')
  })

  app.get("/about",function(req,res){
    res.render("about")
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
  
const port=process.env.PORT || 3000

app.listen(port,function(){
    console.log("connected to the port 3000")
})


