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
        default:"https://www.clipartmax.com/middle/m2i8H7H7b1b1A0d3_block-of-flats-cartoon/",
        set:(v)=>v==="" ? "https://www.clipartmax.com/middle/m2i8H7H7b1b1A0d3_block-of-flats-cartoon/" : v
    },
    price:Number,
    location:String,
    country:String
})

const Listing = mongoose.model("Listing",listingSchema);

module.exports= Listing;