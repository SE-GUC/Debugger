const Joi = require("joi");
const express = require('express');
const router = express.Router();
const VGS_User = require("../../Models/VGS_User");
const events = require("./events");
const Event = require('../../Models/Event')
const validator = require('../../Validations/vgsuserValidations')
const UserType = require('../../Models/Lookups/UserTypes')
const UserTable = require('../../Models/User')
const appStatusEnum = require('../../Models/Enums/Enums').Enum_appStatus;
const userTypeEnum = require('../../Models/Enums/Enums').Enum_userType;


// Assigning the booth member
router.put("/assign", async (req, res) => {
  try {
    const exist = await VGS_User.find();
    if (exist == false) {
      await VGS_User.create({
        email: "ghada@gmail.com",
        userType: userTypeEnum.Member.value,
        clubCommittee: "HR",
        hobbies: "Playing Volleyball",
        VGSYear: "2016",
        appliedPosition: "HR Member",
        appStatus: appStatusEnum.Accepted.value,
        notes: null,
        gameName: null,
        gameScrSho: null,
        downloadLink: null,
        boothMember: false
      });

      await VGS_User.create({
        email: "amany@hotmail.com",
        userType: userTypeEnum.Member.value,
        clubCommittee: "GDD",
        hobbies: "Developing games",
        VGSYear: "2014",
        appliedPosition: "GDD Member",
        appStatus: appStatusEnum.Accepted.value,
        notes: null,
        gameName: null,
        gameScrSho: null,
        downloadLink: null,
        boothMember: true
      });

      await VGS_User.create({
        email: "Jim@yahoo.com",
        userType: null,
        clubCommittee: null,
        hobbies: null,
        VGSYear: null,
        appliedPosition: null,
        appStatus: appStatusEnum.Rejected.value,
        notes: null,
        gameName: null,
        gameScrSho: null,
        downloadLink: null,
        boothMember: false
      });

    //   await VGS_User.create({
    //     email: "ehab@hotmail.com",
    //     userType: "Advisor",
    //     clubCommittee: "GDD",
    //     hobbies: "Coding",
    //     VGSYear: "2012",
    //     appliedPosition: "GDD Advisor",
    //     appStatus: "Accepted",
    //     notes: null,
    //     gameName: null,
    //     gameScrSho: null,
    //     downloadLink: null,
    //     boothMember: false
    //   });
    }

    console.log(await VGS_User.find());
    const memberEmail = req.body.email;

    const schema = {
      email: Joi.string()
        .email()
        .required()
    };

    const result = Joi.validate(req.body, schema);
    if (result.error)
      return res.status(400).send({ error: result.error.details[0].message });

    const user = await VGS_User.findOne({ email: memberEmail });

    // checking if he is already a booth member
    if (user.boothMember === true)
      return res.status(404).send({ err: "This member is already a booth member" });

    // checking if he is even accepted
    if (user.appStatus == appStatusEnum.Rejected.value)
      return res.status(404).send({
        err: "This applicant was rejected and is not a member in the club"
      });

    // checking if he is a member
    if (user.userType !== userTypeEnum.Member.value)
      return res
        .status(404)
        .send({ err: "This person position is not member" });

    // Assigning the boothMember
    const old = { email: { $eq: memberEmail } };
    const newR = { $set: { boothMember: true } };

    await VGS_User.updateOne(old, newR, (err, result) => {
      if (err) res.status(404).send(err.message);
    });

    const boothMembr = await VGS_User.findOne({ email: memberEmail });
    res.send(boothMembr);

  } catch (error) {
    res.status(404).send(error.message);
  }

});

router.get('/', async (req,res) => {
	res.send(`<a href="/api/Application Form">Application Form</a>
            <a href="/api/Events">Events</a>`);
  })

router.get('/', async (req,res) => {
	const events = await Event.find()
	res.json({data: events})
  })

// user filling an application form and we create new VGS user
router
    .route('/application_form')
    .post(async (req, res) => {
        try {
            const {error} = validator.createValidation(req.body)
            if(error) return res.status(500).send(error.details[0].message)
            const applicant = await VGS_User.create(req.body);
            return res.send(applicant)
        }
        catch (err) {
            res.status(500).send('something went wrong')
        }
    })

// viewing the application form for a user to see his/her status
router
    .route('/status/application_form_view/:id')
    .get(async (req, res) => {
        try{
            const accpetedApplicant = await VGS_User.findById(req.params.id)
            let status = appStatusEnum.getKey(accpetedApplicant.appStatus)
            return res.status(200).json({
                appStatus:status
            })
        }
        catch (error){
            return res.status(500).send(`error, we couldn't find the application form`)
        }
    })

// viewing all the application forms that are still not accepted nor rejected
router
    .route('/application_forms_view')
    .get(async (req, res) => {
        try {
            let user=null
            const allApplicationForms = await VGS_User.find({appStatus: appStatusEnum.Pending.value,userType:userTypeEnum.Applicant.value})
            if(allApplicationForms.length >0){
              let pendingApps=[]
              for(let i = 0 ; i < allApplicationForms.length ; i++){
                user = await UserTable.findOne({_id: allApplicationForms[i].userId})
                if(user != null){
                  pendingApps.push({
                    ApplicantName: user.name,
                    AppFormId: allApplicationForms[i].id,
                    clubCommittee: allApplicationForms[i].clubCommittee,
                    userType: allApplicationForms[i].userType,
                    hobbies: allApplicationForms[i].hobbies,
                    VGSYear: allApplicationForms[i].VGSYear,
                    gameName: allApplicationForms[i].gameName,
                    appStatus: allApplicationForms[i].appStatus
                  })
                }
              }
              return res.send(pendingApps)
            }
            else return res.status(203).send('no pending applications')

        }
        catch (error){
            return res.status(500).send(`error, we couldn't get the application forms`)
        }
    })

router 
    .route('/update/AppForm')
    .post(async (req,res)=>{
      try{
        const findAppForm = await VGS_User.findById({_id: req.body.AppId})
        if(findAppForm){
          await VGS_User.update({_id:req.body.AppId},{
            appStatus: req.body.appStatus
          })
          return res.status(200).send("updated")
        }
      }
      catch(err){
        return res.status(500).send('unexpected error')
      }

    })
// update applicant fields
router
    .route('/application_form_update')
    .put(async (req, res) => {
        try{
            //const foundApplicant = await VGS_User.find(app => app.email == req.body.email)
            //if(!req.body.email) return res.status(400).send('email is required')
            //let foundApplicant = (await VGS_User.findOne({userId:req.body.id}))
            let foundApplicant = (await VGS_User.findById(req.body.id))
            if(!foundApplicant) return res.status(400).send(`the applicant with this id is not found, check the id`)
            // if(req.body.newEmail.trim()!='' || req.body.newEmail){
            //   let foundApplicantWithNewEmail = (await VGS_User.findOne({email:req.body.newEmail}))
            //   if(foundApplicantWithNewEmail)
            //    return res.status(500).send(`This email is already used`)
            // }
            else{
                await VGS_User.update({_id:req.body.id},
                    {
                    //email : (req.body.newEmail || foundApplicant.email),
                    clubCommittee : (req.body.clubCommittee || foundApplicant.clubCommittee),
                    hobbies: (req.body.hobbies  || foundApplicant.hobbies), 
                    appliedPosition: (req.body.appliedPosition  || foundApplicant.appliedPosition),
                    gameName : (req.body.gameName  || foundApplicant.gameName),
                    appStatus : appStatusEnum.Pending.value
                    }
                )
            }
            return res.send('Updated')
        }
        catch (error){
            return res.status(400).send('error, failed to update')
        }
    })
 
 router.get('/showusers', async (req,res) => {
try{
	
    const users = await VGS_User.find()
	res.json({data: users})
	}
	catch(error) {
		// We will be handling the error later
		console.log(error)
	}  
	})

  //#region commented method not needed
  // TODO  CHECK WITH OTHERS
	// router.post('/', async (req, res) => {
 
	// 	try {
		 
	// 		 const validation = validator.createValidation(req.body)
	// 		 if (validation.error) 
	// 			return res.status(400).send({ error: validation.error.details[0].message })
			 
	// 		 const newemail = req.body.email
	// 		 const uniqueemail = await VGS_User.findOne({email: newemail})
	// 		 if(uniqueemail) 
	// 			return res.status(400).json({error: 'user already exists'})
	// 		else{
				
	// 			await VGS_User.create(req.body)
	// 			const users = await VGS_User.find()
	// 			res.json({data: users})
	// 		}
	 
	 
	// 	 }
	 
	// 	 catch (error) {
	// 		 res.status(404).send(error.message)
	// 	 }
		 
	 
  //  })
  //#endregion


//TODO test
// prisedent delete account
router
	.route('/deleteuser')
	.delete(async (req,res)=>{
		try{ 
			const user = await VGS_User.findOne({email:req.body.email}) 
			if (!req.body.email) return res.status(400).send({ err: 'email field is required' }); 
			if (!user) return res.status(400).send({ err: 'invalid email' });
				

			if (user.userType === userTypeEnum.President.value ) return res.status(404).send({err:('you can not delete a president')});
			else{
				await VGS_User.deleteOne({email:req.body.email})
			}
			res.send('user deleted')
		}
		catch (error) {
			res.send(`error, can't delete`)
		}
});

//TODO test
 // head delete user under him
 router
	.route('/deletefromcommity')
 	.delete(async(req,res)=>{
	try{
		let user = await VGS_User.findOne({email:req.body.email})
    //const _userTypes = await UserType.find();
		if (!req.body.email) return res.status(400).send({ err: 'email field is required' });

		if (!user) return res.status(400).send({ err: 'invalid email' });
		if (user.userType === userTypeEnum.President.value) return res.status(404).send({err:('you can not delete a president')});
    if (user.userType === userTypeEnum.Director.value) return res.status(404).send({err:('you can not delete an director')});
		if (user.userType === userTypeEnum.Head.value) return res.status(404).send({err:('you can not delete a head')});
	  if (user.userType === userTypeEnum.Applicant.value) return res.status(404).send({err:('you can not delete a applicant')});
    
    // hundle case eno fe nfs elcommite later 3lashan a7na msh 3rfen lesa men elly 3ml signin
    
		await VGS_User.updateOne({email:req.body.email},{
			
			email: user.email,
			hobbies: user.hobbies,
			appliedPosition: user.appliedPosition,
			gameName: user.gameName,
			userType: user.userType,
			clubCommittee: null,
			appStatus: user.appStatus,
			notes: user.notes,
			gameScrSho: user.gameScrSho,
			downloadLink: user.downloadLink,
			boothMember: user.boothMember,
			VGSYear: user.VGSYear
		})
	   
		res.send(await VGS_User.findOne({email:req.body.email}))
	}
	catch (error) {
		res.send(`error, can't delete`)
	}
});


 //head can add member
 router
    .route('/addmemberincommity') 
    .put(async(req,res)=>{
	try{
	let user =await VGS_User.findOne({email:req.body.email})
	if (!req.body.email) return res.status(400).send({ err: 'email field is required' });
	if (!req.body.clubCommittee) return res.status(400).send({ err: 'club committee field is required' });
 
	if (!user) return res.status(400).send({ err: 'invalied user' });
	if (typeof req.body.clubCommittee != 'string') return res.status(400).send({ err: 'Invalid value for clubCommittee' });
  // check eno applicant
    if (user.userType === userTypeEnum.President.value ) return res.status(404).send({err:('you can not add a president')});
    if (user.userType === userTypeEnum.Director.value ) return res.status(404).send({err:('you can not add an director')});
    if (user.userType === userTypeEnum.Head.value ) return res.status(404).send({err:('you can not add a head')});
    if (user.userType === userTypeEnum.Member.value ) return res.status(404).send({err:('you can not add a member')});

	await VGS_User.update({email: req.body.email},
		{
			email: user.email,
			hobbies: user.hobbies,
			appliedPosition: user.appliedPosition,
			gameName: user.gameName,
			userType: user.appliedPosition,
			clubCommittee: req.body.clubCommittee,
			appStatus: user.appStatus,
			notes: user.notes,
			gameScrSho: user.gameScrSho,
			downloadLink: user.downloadLink,
			boothMember: user.boothMember,
			VGSYear: user.VGSYear
		})
	 res.send(await VGS_User.findOne({email:req.body.email}))
	}
	catch(error){
		res.send(`error, can't add member`)
	}
   })
// prisedent can edit user

router.route("/edituser").put(async (req, res) => {
  //vgsuser data
  try {
    let user = await VGS_User.findOne({ email: req.body.email });
    if (!req.body.email)
      return res.status(400).send({ err: "email field is required" });
    if (!user) return res.status(400).send({ err: "invalid email" });
    let newuserType = req.body.userType;
    let newclubCommittee = req.body.clubCommittee;
    let newhobbies = req.body.hobbies;
    let newVGSYear = req.body.VGSYear;
    let newappliedPosition = req.body.appliedPosition;
    let newappStatus = req.body.appStatus;
    let newnotes = req.body.notes;
    let newgameName = req.body.gameName;
    let newgameScrSho = req.body.gameScrSho;
    let newdownloadLink = req.body.downloadLink;
    let newboothMember = req.body.boothMember;
    // to make sure that prisedent entered email

    if (user.userType === userTypeEnum.President.value)
      return res
        .status(404)
        .send({ err: "you can not edit a president account" });

    // data that the prisedent want to change

    if (newuserType) {
      var type = (user.userType = newuserType);
    }

    if (newclubCommittee) {
      var commitee = (user.clubCommittee = newclubCommittee);
    }

    if (newhobbies) {
      var hobbies = (user.hobbies = newhobbies);
    }

    if (newVGSYear) {
      var vYear = (user.VGSYear = newVGSYear);
    }

    if (newappliedPosition) {
      var appliedPosition = (user.appliedPosition = newappliedPosition);
    }

    if (newappStatus) {
      var status = (user.appStatus = newappStatus);
    }

    if (newnotes) {
      var note = (user.notes = newnotes);
    }

    if (newgameName) {
      var gamename = (user.gameName = newgameName);
    }

    if (newgameScrSho) {
      var gamescreen = (user.gameScrSho = newgameScrSho);
    }

    if (newdownloadLink) {
      var link = (user.downloadLink = newdownloadLink);
    }

    if (newboothMember) {
      var boothmember = (user.boothMember = newboothMember);
    }

    await VGS_User.updateOne(
      { email: req.body.email },
      {
        email: req.body.email,
        userType: type || user.userType,
        clubCommittee: commitee || user.clubCommittee,
        hobbies: hobbies || user.hobbies,
        VGSYear: vYear || user.VGSYear,
        appliedPosition: appliedPosition || user.appliedPosition,
        notes: note || user.notes,
        gameName: gamename || user.gameName,
        gameScrSho: gamescreen || user.gamescreen,
        downloadLink: link || user.downloadLink,
        boothMember: boothmember || user.boothMember
      }
    );
    res.send(await VGS_User.findOne({ email: req.body.email }));
  } catch (error) {
    res.send(`error, cannot edit`);
  }
});	

	router
	.route('/note')
	.put(async(req, res) => {
		try{
			// lazm a hundle case elly by3ml add msh member aw applicant
		let user =await VGS_User.findOne({email:req.body.email})
	    if (!req.body.email) return res.status(400).send({ err: 'email field is required' });
	    if (!req.body.notes) return res.status(400).send({ err: 'note field is required' });
		if (!user) return res.status(400).send({ err: 'invalid email' });
		if (typeof req.body.notes !== 'string') return res.status(400).send({ err: 'Invalid value for note' });
	    //if(user.userType==='member')return res.status(404).send({err:('you can not add notes')});
	    //if(user.userType==='applicant')return res.status(404).send({err:('you can not add notes')}),
	await VGS_User.updateOne({email:req.body.email},
	      {
		
	    	email: user.email,
			hobbies: user.hobbies,
			appliedPosition: user.appliedPosition,
			gameName: user.gameName,
			userType: user.appliedPosition,
			clubCommittee: user.clubCommittee,
			appStatus: user.appStatus,
			notes: user.notes + ' and ' + req.body.notes,
			gameScrSho: user.gameScrSho,
			downloadLink: user.downloadLink,
			boothMember: user.boothMember,
			VGSYear: user.VGSYear
	})
	res.send(await VGS_User.findOne({email:req.body.email}))
	}
	catch(error){
		res.send(`error, can't add note`)
	}
	});
	
// sara's sprint one method without database
    //const userProfile =[
      //  new profile ('madiha_rawatly@smail.com', 'member', 'GDD', 'video games', null, null, 'accepted',
        //'sosoRankDB', 'superhero chess', null, null, null)];
    
    router.get('/getusers', (req, res) => res.json({ data: userProfile}))
    
router.get('/getDirectors', async (req, res)=>{
  try{
    let _user
    let directorsData = []
    const directors = await VGS_User.find({userType: userTypeEnum.Director.value})
    if (directors){
      for(i = 0 ; i < directors.length ; i++){
        let userid = directors[i].userId
         _user = await UserTable.findById(userid)
         if(_user){
           directorsData.push({
             vgsUserId: directors[i].id,
             directorName: _user.name
           })
         }
         else return (res.status(500).send('unexpected error'))
      }
    }
    return res.json({Directors: directorsData})
  }
  catch(error){
    return res.send(error.message)
  }
})

module.exports = router;
