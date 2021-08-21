const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload')
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zzdks.mongodb.net/${process.env.DB_DbNAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.PORT || 4050


const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false}));
// app.use(express.static('')));
// app.use(fileUpload());


client.connect(err => {
  const allServicesCollection = client.db("tripStudio").collection("photographyServices ");
//   const allReviewsCollection = client.db("eagleCourier").collection("allReview");
  const allUsersBookingCollection = client.db("tripStudio").collection("allUsersBooking");
  const allAdminCollection = client.db("tripStudio").collection("adminList");
    console.log('database connection success');

    // app.post('/addAllServices', (req, res) => {
    //   const allServices = req.body;
    //   allServicesCollection.insertMany(allServices)
    //   .then(result => {
    //     res.send(result)
    //   })
    // })


    app.get('/showAllServices', (req, res) => {
        allServicesCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })  

    app.get('/showAllServices/:id', (req, res) => {
        const serviceId = req.params.id;
        allServicesCollection.find({_id: ObjectId(serviceId) })
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    })


    app.post('/addUsersBooking', (req, res) => {
      const usersBooking = req.body;
      // console.log(usersOrder);
      allUsersBookingCollection.insertOne(usersBooking)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  
    })


    app.get('/showYourOwnOrders', (req, res) => {
      // console.log(req.query.email);
      allUsersBookingCollection.find({email: req.query.email})
          .toArray((err, documents) => {
              res.send(documents);
          })
  }) 


    app.get('/showAllBookings', (req, res) => {
    allUsersBookingCollection.find({})
      .toArray((err, documents) => {
          res.send(documents);
      })
}) 


  app.post('/addNewServices', (req, res) => {
    const newService = req.body;
    console.log(newService);
    allServicesCollection.insertOne(newService)
    .then(result => {
      res.send(result.insertedCount > 0)
    })

  })  


  app.get('/showAllBookings/:id', (req, res) => {
    const bookingId = req.params.id;
    // console.log(bookingId);
    allUsersBookingCollection.find({_id:bookingId})
        .toArray((err, documents) => {
            // console.log(documents);
            res.send(documents[0]);
        })
})

// app.post('/showAllBookingsOne', (req, res) => {
//     const bookingId = req.body;
//     console.log(bookingId);
//     allUsersBookingCollection.find({_id: ObjectId(bookingId) })
//         .toArray((err, documents) => {
//             console.log(documents);
//             res.send(documents);
//         })
// })


       // app.post('/addAllReviews', (req, res) => {
    //     const allReviews = req.body;
    //     allReviewsCollection.insertMany(allReviews)
    //     .then(result => {
    //       res.send(result.insertedCount > 0)
    //     })
    //   })

        // app.get('/showAllReviews', (req, res) => {
    //     allReviewsCollection.find({})
    //         .toArray((err, documents) => {
    //             res.send(documents);
    //         })
    // }) 


//   app.post('/addNewReview', (req, res) => {
//     const newReview = req.body;
//     console.log(newReview);
//     allReviewsCollection.insertOne(newReview)
//     .then(result => {
//       res.send(result.insertedCount > 0)
//     })

//   })  


//   app.post('/addNewServices', (req, res) => {
//     const newService = req.body;
//     console.log(newService);
//     allServicesCollection.insertOne(newService)
//     .then(result => {
//       res.send(result.insertedCount > 0)
//     })

//   })  




app.post('/addNewAdmin', (req, res) => {
  const newAdmin = req.body;
  allAdminCollection.insertOne(newAdmin)
  .then(result => {
    res.send(result)
  })

})



app.post('/isAdmin', (req, res) => {
  const email = req.body.email;
  allAdminCollection.find({ email: email })
      .toArray((err, admins) => {
          res.send(admins.length > 0);
      })
})


// app.patch('/updateStatus/:id', (req, res) => {
//   console.log( req.body.status);
//   allUsersParcelCollection.updateOne({_id: ObjectId(req.params.id)},
//   {
//     $set: {status: req.body.status}
//   })
//   .then(result => {
//     console.log(result);
//   })
// })


// app.delete('/deleteService/:id', (req, res) =>{
//   allServicesCollection.deleteOne({_id:ObjectId(req.params.id)})
//   .then((result) =>{
//       // console.log(result)
//       res.send(result.deletedCount > 0)
//   })
// })


    
   

});




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)