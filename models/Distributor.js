const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const DistributorSchema = new Schema({
    distName: {
        type: String,
        required: true
    },
    prefName: {
        type: String,
    },
    accountName: {
        type: String,
    },
    mainpk: {
        type: String,
        required: true
    },
    siteUrl: {
        type: String,
        required: true
    },
    rank: {
        type: String,
    },
    rankDate: {
        type: Date,
    },
    receivedRecog: {
        type: String
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
});

module.exports = Distributor = mongoose.model('distributors', DistributorSchema);