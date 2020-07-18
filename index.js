const express = require('express');
const path = require('path');
const port = 3000;


const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine' , 'ejs');  // to tell server that ejs will be our template
app.set('views' ,path.join(__dirname , 'views') );

// to parse the data that is send to the url
 app.use(express.urlencoded());   // middleware for parsing the form data
 app.use(express.static('assets'));

 app.use(express.static(path.join(__dirname, 'assets')));


 // middleware 1
//  app.use(function(req , res ,next ){
//       req.myName="Prateek";
//    //  console.log("middleware 1 called");
//      next();
//  })

//  // middleware 2 
//  app.use(function(req , res ,next ){
//     //console.log("middleware 2 called");
//     console.log("my name in middleware 2", req.myName);
//     next();
// })



var contactList = [                // global array
    {
        name: "Prateek",        // this is a document
        phone: "8786753646"      // till here documnet 1 //it has 2 fields 
    },
    {
        name: "Stark",
        phone: "1111111111"
    },
    {
        name: "Coding",
        phone: "000798000"
    }
]

// returning the response

//controller 1
app.get('/', function(req,res){

 //   console.log("from get route countroller", req.myName);

 // find is used to search in the list if i give any condition in find
 //it will display results based on the conditions
 Contact.find({} , function(err , contacts){
     if(err){
         console.log('error in fetching contacts');
         return;
     }
 
    return res.render('home' , {
        title:"My contact list new",
        contact_list: contacts
    });

     //  res.send('<h1>Cooll , it running now</h1>');
});
});

// controller 2
app.post('/create-contact', function(req , res){
   // return res.redirect('/practice');
    // contactList.push({
    //     name: req.body.name,
    //     phone:req.body.phone
    //  });


    // for adding the contact
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    }, function(err , newContact){
        if(err){
            console.log('Error in creating contact');
            return;
        }

        console.log('**********' , newContact);
        return res.redirect('back');
    });
//    console.log(req.body);
//    console.log(req.body.name);
//    console.log(req.body.phone);
//    return res.redirect('/');
         
});

// for deleting a contact

app.get('/delete-contact/', function(req , res){
    console.log(req.query);
    // get the id from query in url
    let id = req.query.id;

    // find the contact in the database  using id and delete

    Contact.findByIdAndDelete(id , function(err){
        if(err){
            console.log('Error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
});
//     console.log(req.params);
//     let phone = req.params.phone;

//     let contactIndex = contactList.findIndex(contact => contact.phone == phone);

//     if(contactIndex != -1){
//         contactList.splice(contactIndex,1);
//     }
//     return res.redirect('back');
// })

app.get('/practice' , function(req , res){
    return res.render('practice' , {
        title : "This is my playground"
    });
})


app.listen(port, function(err){
    if (err){
        console.log('Error in running the server');
    }

    console.log('Server is running on the port:', port);
});




// app.listen(port , function(err){
//     if(err){
//         console.log('Error in server');
//         return ;
//     }
//     console.log('yup server is running on the port',port);
// })