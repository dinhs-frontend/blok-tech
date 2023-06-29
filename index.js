//*  Index.js *//
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const { engine } = require('express-handlebars');
var PORT = 8080;
// const Eten = require('./models/eten')
// const etens = []

require('dotenv').config();
 
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));

// const url = process.env.DB_CONNECTION_STRING;

// let result;

// async function connectToMongoDB() {
//   try {
//     const client = new MongoClient(url);
//     await client.connect();

//     console.log('Verbonden met de database.');

//     const db = client.db('dataName');
//     const collection = db.collection('eten');

//     // await collection.insertMany(etenData);
//     result = await collection.find({}).toArray();
    
//     client.close();
//     console.log('Verbinding met de database');
//   } catch (error) {
//     console.error('Er is een fout opgetreden bij het verbinden met de database:', error);
//   }

// }

//-------------TEST------------------------------------------------------------------///
// Maak verbinding met MongoDB
const url = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(url);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Verbonden met de database.');
  } catch (error) {
    console.error('Er is een fout opgetreden bij het verbinden met de database:', error);
  }
}

// Endpoint om data naar MongoDB te sturen
app.post('/topics', async (req, res) => {
  // const likedUser = req.body.like;

 
  try {
    const db = client.db('dataName');
    const collection = db.collection('eten');

    const likedUser = { _id: new ObjectId(), name: req.body.like };
    await collection.insertOne(likedUser);

  

    console.log('Gegevens succesvol toegevoegd aan MongoDB.');

    res.redirect('/topics');
  } catch (error) {
    console.error('Er is een fout opgetreden bij het toevoegen van de gegevens aan MongoDB:', error);
    res.redirect('/topics');
  }
});
// const likedUser = req.body.like;
// //   likedUserProfile = likedUser;
// //   res.render('like', {likedUser});

// Render Topics.handlebars met gegevens uit MongoDB
app.get('/topics', async (req, res) => {
  try {
    const db = client.db('dataName');
    const collection = db.collection('eten');

    const result = await collection.find({}).toArray();
    res.render('topics', { result });
  } catch (error) {
    console.error('Er is een fout opgetreden bij het ophalen van de gegevens uit MongoDB:', error);
    res.render('topics', { result: [] }); // Render de pagina met een lege array als er een fout optreedt
  }
});



app.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server running on port: ${PORT}`);
});





//-------------REMOVE__BTN------------------------------------------------------------------///
app.post('/remove', removeData);

async function removeData(req, res) {
  const { id } = req.body;

  try {
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db('dataName');
    const collection = db.collection('eten');

    await collection.deleteOne({});


    client.close();
    console.log('Gegevens succesvol verwijderd.');

    res.redirect('/topics');
  } catch (error) {
    console.error('Er is een fout opgetreden bij het verwijderen van de gegevens:', error);
    res.redirect('/topics');
  }
}



// Roep de functie aan om verbinding te maken met de database.
// connectToMongoDB();


// let likedUserProfile;

// app.post('/like', (req, res) => {
//   const likedUser = req.body.like;
//   likedUserProfile = likedUser;
//   res.render('like', {likedUser});
// });

// app.get('/like', (req, res) => {
//   res.render('like', {likedUserProfile});
// });

app.engine('handlebars', engine({ defaultLayout: 'header' }))
app.set('view engine', 'handlebars')

// const eten = require('./models/eten')

// app.set ('view engine', 'ejs');
app.set('views', 'view');

app.get('/', findname);
app.get('/add', form); //-2-//
app.get('/account', account); //--1--//
// app.get ('/topics',sessionAdd);
app.get('/topics', topics);


// app.post('/remove', removeEten);
app.post('/topics', add);//-3--//
//error >> kan pagina niet vinden
app.use(function(req, res) {
  res.status(404).render('404');
});

function findname(req, res) {
  console.log('coming here?')
  res.render('index');
}

function form(req, res) {
  res.render('add');
}

function account(req, res) {
  res.render('account');
}

function topics(req, res) {
  res.render('topics', { result });
}

// const etenData = [
//   {
//    categorie: 'eten',
//    keuken: 'italiaans',
//    naam: 'pizza',
//   },
//   {
//     categorie: 'eten',
//     keuken: 'spaans',
//     naam: 'tapas',
//   },
//   {
//     categorie: 'eten',
//     keuken: 'vietnamees',
//     naam: 'loempia',
//   },
// ]

//--------------------------//

function add(req, res) {
  res.send('topics');
}

// app.listen(PORT, () => {
//   console.log(`Server running on port: ${PORT}`);
// });


//------------------------------------------------//

// app.get("/topics",(req, res) => {
//   console.log("inside match");
// match(req, res);
// });

// app.post("/topics", (req, res) => {
//   matchPost(req, res);
// });

// const match = (req, res) => {
//   res.render("topics");
// };
// const matchPost = async (req, res) => {
//   const user = await User.findOne({username: req.session.name});
//  user.likedGames.push(req.body);
//   await user.save();
//   res.sendStatus(200);
// };

// app.post('/edit-account', addDataProfile)
// app.get('/', getAccount)

// app.post('/', account)
// app.post('/',update);

// const db1 = mongo.connection


//------------------------------------------//
// app.delete ('/topics' , deleteOne);



////------------------findname: dropdown----------------------------------//
// function findname (req, res, next) {
 
// let test = db.collection('naam').find().toArray(function (err, dataObjArr) {
//   // console.log('err =', err);
//   // console.log('data =', dataObjArr);
  
//   res.render('index.ejs',{data: dataObjArr})
//   })

// } 
//----------------find topics-----------------//
// function topics(req, res, next) {
//   db.collection('topics').find().toArray(done)
      
//   function done(err, eten) {
//     // console.log('Topics data =', eten)
//     if (err) {
//       next(err)
//     } else {
//       res.render('topics.handlebars', {data: eten})
//     }
//   }
// }

// db.collection('eten').insertOne(
//   req.session.user, done)
  
//  function done(err) {
//         if (err) {
//           next(err)
//            } 
//         else {
//            res.render('topic.handlebars')
//           }
//       }
  

//----------------------------------------------------//

// function form(req, res) {
//     res.render('add.ejs')
//   } //-2-//

// //-----------add topics-----------//
// function add(req, res, next) {
//   //   req.session.user = {
//   //   name: req.body.name,

//   // }
//   db.collection('naam').insertOne(
//     req.session.user, done)

//     // db.collection('topics').insertOne({
//     //   name: req.body.name,
      
//     // }, done)//-3--//

//     function done(err, data) {
//         if (err) {
//             next (err)
//         } else {
//             res.redirect('/topics' )
//         }
//       }
//     }

// async function sessionAdd(req, res) { 
//   let user = await db.collection('naam').findOne({'_id': mongodb.ObjectID(req.session.user._id)}); //stored globally for re-use
//   res.render('topics', {data: user});
// }


// async function sessionAdd(req, res, err) {
//   var id = req.session.user._id
//   const user = await db.collection('naam').findOne({'_id': mongo.ObjectID(id)}); 
//   console.log(req.session.user)
//   res.render('topic.ejs', {user})


// async function sessionAdd(req, res) {
//   if (req.session.user){
//     res.render('topics', {user: await db.collection('naam').findOne({_id: mongo.ObjectID(req.session.user._id)})});
//   } else {
//     res.redirect('/404') //als je geen profiel hebt krijg je een error page
//   }
// }
          
// if (req.session.user === fluxUser) {
      
//     res.redirect('topic.ejs')
      
// } else {
//     (value === persoon1)
//     res.status(401).send("werkt niet")
      
// }
  
//--------------verwijder topics-------------//
//        function remove(req, res, next) {
//         var id = req.body.food_id

//         db.collection('topics').deleteOne({
//            _id: new mongo.ObjectID(id)
//         }, done)
      
//         function done(err, eten) {
//           console.log('Topics data =', eten)
//           if (err) {
//             next(err)
//           } else {
//             res.render('topics.ejs', {data: eten})
//           }
//         }
//       } 

// //----------------------------------------------//
//       function account(req, res) {
//         res.render('account.ejs')
//       } //-2-//
//----------------------test session-------------------------------//


// function addDataProfile (req, res) {
//   req.session.user = { 
//     userdata: req.body.userdata,
    
//   }

//   db.collection('naam').insertOne(req.session.user, done);
//   function done(err, data){
//     if(err){
//       next(err);
//     } else {
//       console.log(req.session.user)
//       // console.log(req.session)
//       res.redirect('/');
//     }
//   }
// }

//   async function getAccount (req, res) {

//     let user = await db.collection('naam').findOne({'_id': mongo.ObjectID(req.session.user._id)});
//     console.log(user.name)
//     console.log(user)
//     res.render('/',{user})
//   }
  

//---------------------------------------------/
        
// let descriptionUser = db.collection('naam').findOne({_id: ObjectId("546cb92393f464ed49d620db")}).toArray()


    
//-----------verwijder topics------------//
// function remove(req, res, next) {
//   var id = req.body.food_id

//   db.collection('topics').deleteOne({
//      _id: id
//   }, done)
      
//   function done(err, eten) {
//     console.log('Topics data =', eten)
//     if (err) {
//       next(err)
//     } else {
//       res.render('topics.ejs', {data: eten})
//     }
//   }
// } 

//----------------------------------------//
     
        
// function update(req, res, next) {
//   var des = req.body.description

//   db.collection('naam').updateOne({
//     _id: new mongo.ObjectID(des)
//  }, done)
// }

// function done(err, eten) {
//   if (err) {
//     next(err)
//   } else {
//     res.render('/')
//   }
// }

//Bronnen:
//- Slide
//- klasgenoten
//- examples
