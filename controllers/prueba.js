/* POST Register User  */
router.post('/register',function(req,res,next){

    let user = req.body;
    let validError = [];
    //checking for empty field in a form
    for(let key in user){
        if(user[key] === ""){
            return next(mid.error("All fields are required to fill"));
        }
    }
    
    let findUserName = () => {
     return new Promise(function(resolve,reject){
        User.findOne({username:user.username})
          .exec(function(err,user){
            if(err){
              validError.push("Something went wrong");
            }
            if(user){
              validError.push("Username already exist");
            }
              return resolve();
        });
    });
    }
    
    
    let findUserEmail = () => {
      return new Promise(function(resolve,reject){
          User.findOne({email:user.email})
            .exec(function(err,user){
              if(err){
                validError.push("Something went wrong");
              }
              if(user){
                validError.push("Email already exist");
              }
                return resolve();
          });
      });
     }
    
    let isPasswordMatch = () => {
      return new Promise(function(resolve,reject){
          if(user.password !== user.confirm){
            validError.push("Password not matched");
          }
          return resolve();
     });
    }
    
     findUserName().then(findUserEmail).then(isPasswordMatch).then(() => {
    
       if(validError.length == 0){
           //save data in object
           let userData = {
             username : user.username,
             email    : user.email,
             password : user.password
           };
    
           //save data in database
    
           User.create(userData,function(err,user){
             if(err){
               return next(mid.error("Something went wrong.Try again !!!"));
             } else {
               req.session.userID = user._id;
               return res.redirect('/home');
             }
    
          });
    
        }else{
          return next(mid.error(validError[0]));
        }
    
      });
    
    
     }); 