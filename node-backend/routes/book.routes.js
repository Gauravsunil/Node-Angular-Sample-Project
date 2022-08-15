const express = require('express');
const Book = require('../model/Book');
const app = express();

const bookRoute = express.Router();

bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body, (error, data)=>{
        if(error){
            return next(error);
        }
        else{
            res.json(data);
        }
    });
});

bookRoute.route('/').get((req, res) => {
    Book.find((error , data) => {
        if(error){
            return next(error);
        }
        else{
            res.json(data);
        }
    })
})

bookRoute.route('/read-book/:id').get((req, res) => {
    Book.findById(req.params.id, (error , data) => {
        if(error){
            return next(error);
        }
        else{
            res.json(data);
        }
    })
})

bookRoute.route('/update-book/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
        $set: req.body}
        ,(error, data) => {
        if(error){
            return next(error);
        }
        else{
            res.status(200).json({
                msg:data
            })
        }
    })
})

bookRoute.route('/delete-book/:id').get((req, res) => {
    Book.findByIdAndRemove(req.params.id, (error , data) => {
        if(error){
            return next(error);
        }
        else{
            res.json(data);
        }
    })
})

module.exports = bookRoute;