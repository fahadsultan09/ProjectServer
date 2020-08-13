

const express = require('express');
const app = express();
const router = express.Router();

let Student = require('../model/Student');


/*
Student Routes
1.Defualt
2.Create Student
3.Read Student
4.Update Student
5.Delete Student
*/

// Default Student
router.route('/').get((res, req, next) => {
  Student.find((error, data) => {
      if (error) {
          return next(error);
      }
      else {
          res.json(data)
      }
  })
})
// ADD Student
router.route('/add-student').post((req, res, next) => {

    Student.create(req.body, (error, data => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }))
})

// READ student
router.route('/read-student/:id').get((req, res) => {
    Student.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  // update student
  router.route('/update-student/:id').put((req, res, next) => {
    Student.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Student successfully updated!')
      }
    })
  })
  
  // Delete student
  router.route('/delete-student/:id').delete((req, res, next) => {
    Student.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })
  
  module.exports = router;