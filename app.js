const express=require("express")
const bodyParser=require("body-parser")
const ejs=require("ejs")
const app=express()
const mongoose=require("mongoose")
app.use(bodyParser.urlencoded({
    extended:true
}))
app.set('view engine','ejs')

mongoose.connect('mongodb+srv://Harsh:test123@cluster0.iqn1prm.mongodb.net/guptaopticals', {useNewUrlParser: true});
app.get("/",function(req,res){
    res.render("form")
})

const itemsSchema2 = new mongoose.Schema({
    Name: String,
    Mobile:Number,
    Address: String,
    Date: Date,
    Right_SPH: String  
});


const User = mongoose.model("user", itemsSchema2);
  app.post("/", function(req, res){
    const user=new User({
        Name: req.body.name,
        Mobile:req.body.Mobile,
        // Address: req.body.Address,
        // Date: req.body.Date,
        Right_SPH: req.body.Right_SPH
    })
    user.save()
    res.redirect('/')
  });

const port=process.env.PORT || 3000

app.listen(port,function(){
    console.log("connected to the port 3000")
})


