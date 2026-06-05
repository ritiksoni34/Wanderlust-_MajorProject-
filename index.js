const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const port = 3000;
const ejsMate = require("ejs-mate"); 
const Listing = require('./models/listing.js');
const methodOverride = require('method-override');

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

main()
.then(()=>{
    console.log("connected with database")
})
.catch((err)=>{
    console.log(err)
});

//mongoose connection
async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//home route
app.get("/",(req,res)=>{
    res.render("listings/root");
});

//index(listings) route
app.get("/listings",async(req,res)=>{
   let allListing = await Listing.find({});
   res.render("listings/index.ejs",{allListing});
})

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})

//save to database
app.post("/listings",async (req,res)=>{
    let listing = req.body.listing;
    const newlisting = new Listing(listing);
    await newlisting.save();
    res.redirect("listings");
})

//Edit route
app.get("/listings/:id/eidtis",async (req,res)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{ listing });
})

//update route
app.put("/listings/:id",(req,res)=>{
    let { id } = req.params;
    Listing.findByIdAndUpdate(id , {...req.body.listing})
    res.redirect(`/listings/${id}`);
})

//delete route
app.delete("/listings/:id", async (req,res)=>{
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})


//show route
app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{ listing });
})


// app.get("/test",(req,res)=>{
//     let testSchema = new Listing({
//         title:"My new villa",
//         descreption:"By the beach",
//         price:200000,
//         location:"calanguate, Goa",
//         country:"India"
//     });
//     testSchema.save().then(()=>{
//         console.log("schema saved")
//     }).catch((err)=>{
//         console.log(err);
//     })
//     res.send("saved");
// })

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})