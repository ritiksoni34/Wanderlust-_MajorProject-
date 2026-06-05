const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        required:true,
        type:String
    },
    description:String,
    img:{
        type:String,
        default:"https://www.travelandleisure.com/thmb/x8L30CdZCZAe8a1LmIOnJcBJXhQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-USE-header-exterior-sign-flat-iron-hotel-asheville-FLATIRONASH0524-28ee8bc1cfed48ae80f2db1ccf02a7fd.jpg",
        set:(v)=>v==="" ? "https://www.travelandleisure.com/thmb/x8L30CdZCZAe8a1LmIOnJcBJXhQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-USE-header-exterior-sign-flat-iron-hotel-asheville-FLATIRONASH0524-28ee8bc1cfed48ae80f2db1ccf02a7fd.jpg" : v
    },
    price:Number,
    location:String,
    country:String
})

const Listing = mongoose.model("Listing",listingSchema);

module.exports= Listing;