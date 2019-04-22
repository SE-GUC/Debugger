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

router.get('/:id', async (req, res) => {
  try{
    
    const userId = req.params.id
    const user = await VGS_User.findOne({userId: userId})
    res.send(user)
    
  }

  catch(error){
    res.send(error.message)
  }
})
// Id in body not in params
// email in creating
// Testing
// Ehab
// return
// email in headFreeSlots, interviews and groups

// Assigning the booth member
router.put("/assign", async (req, res) => {
  try {

    const memberEmail = req.body.email;

    const schema = {
      email: Joi.string().email()
        .required()
    };

    const result = Joi.validate(req.body, schema);
    if (result.error)
      return res.status(400).send({ error: result.error.details[0].message });

    const user = await UserTable.findOne({ email: memberEmail });
    const vgsUser = await VGS_User.findOne({ userId: user._id });

    // checking if he is already a booth member
    if (vgsUser.boothMember === true)
      return res.status(404).send({ err: "This member is already a booth member" });

    // checking if he is even accepted
    if (vgsUser.appStatus == appStatusEnum.Rejected.value)
      return res.status(404).send({
        err: "This applicant was rejected and is not a member in the club"
      });

    // checking if he is a member
    if (vgsUser.userType !== userTypeEnum.Member.value)
      return res
        .status(404)
        .send({ err: "This person position is not member" });

    // Assigning the boothMember
    const old = { userId: { $eq: vgsUser.userId } };
    const newR = { $set: { boothMember: true } };

    await VGS_User.updateOne(old, newR, (err, result) => {
      if (err) return res.status(404).send(err.message);
    });

    const boothMembr = await VGS_User.findOne({ userId: user._id });
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
// president delete account
router
	.route('/deleteuser/:email')
	.delete(async (req,res)=>{
		try{ 
			const user = await UserTable.findOne({email:req.params.email}) 
			if (!req.params.email) return res.status(500).send({ err: 'email field is required' }); 
			if (!user) return res.status(600).send({ err: 'invalid email' });
			const vgsuser =await VGS_User.findOne({userId:user.id})	
      if (!vgsuser) return res.status(500).send({ err: 'invalid email' });
			if (vgsuser.userType === userTypeEnum.President.value ) return res.status(203).send({err:('you can not delete a president')});
			else{
				await VGS_User.deleteOne({userId:user.id})
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
	.route('/deletefromcommity/:email')
 	.delete(async(req,res)=>{
	try{
		let user = await UserTable.findOne({email:req.params.email})
		if (!req.params.email) return res.status(500).send({ err: 'email field is required' });
    if (!user) return res.status(500).send({ err: 'invalid email' });
    const vgsuser=await VGS_User.findOne({userId:user.id})
    if (!vgsuser) return res.status(500).send({ err: 'invalid email' });
   
    if (vgsuser.userType === userTypeEnum.President.value) return res.status(501).send({err:('you can not delete a president')});
    if (vgsuser.userType === userTypeEnum.Director.value) return res.status(501).send({err:('you can not delete an director')});
		if (vgsuser.userType === userTypeEnum.Head.value) return res.status(501).send({err:('you can not delete a head')});
	  if (vgsuser.userType === userTypeEnum.Applicant.value) return res.status(501).send({err:('you can not delete a applicant')});
    
    // hundle case eno fe nfs elcommite later 3lashan a7na msh 3rfen lesa men elly 3ml signin
    
		await VGS_User.updateOne({userId:user.id},{
			
			userId: vgsuser.userId,
			hobbies: vgsuser.hobbies,
			appliedPosition: vgsuser.appliedPosition,
			gameName: vgsuser.gameName,
			userType: vgsuser.userTypeEnum.Applicant.value,
			clubCommittee: null,
			appStatus: vgsuser.appStatus,
			notes: vgsuser.notes,
			gameScrSho: vgsuser.gameScrSho,
			downloadLink: vgsuser.downloadLink,
			boothMember: vgsuser.boothMember,
			VGSYear: vgsuser.VGSYear
		})
	   
    //res.send(await VGS_User.findOne({userId:user.id}))
    res.send('user deleted')
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
	let user =await UserTable.findOne({email:req.body.email})
	if (!req.body.email) return res.status(500).send({ err: 'email field is required' });
  if (!user) return res.status(500).send({ err: 'invalied user' });
  const vgsuser =await VGS_User.findOne({userId:user.id})
  if (!vgsuser) return res.status(500).send({ err: 'invalied user' });
	
  if (!req.body.clubCommittee) return res.status(500).send({ err: 'club committee field is required' });
 
	if (typeof req.body.clubCommittee != 'string') return res.status(500).send({ err: 'Invalid value for clubCommittee' });
  // check eno applicant
    if (vgsuser.userType === userTypeEnum.President.value ) return res.status(500).send({err:('you can not add a president')});
    if (vgsuser.userType === userTypeEnum.Director.value ) return res.status(500).send({err:('you can not add an director')});
    if (vgsuser.userType === userTypeEnum.Head.value ) return res.status(500).send({err:('you can not add a head')});
    if (vgsuser.userType === userTypeEnum.Member.value ) return res.status(500).send({err:('you can not add a member')});

	await VGS_User.update({userId:user.id},
		{
			userId: vgsuser.userId,
			hobbies: vgsuser.hobbies,
			appliedPosition: vgsuser.appliedPosition,
			gameName: vgsuser.gameName,
			userType: userTypeEnum.Member.value,
			clubCommittee: req.body.clubCommittee,
			appStatus: vgsuser.appStatus,
			notes: vgsuser.notes,
			gameScrSho: vgsuser.gameScrSho,
			downloadLink: vgsuser.downloadLink,
			boothMember: vgsuser.boothMember,
			VGSYear: vgsuser.VGSYear
		})
	 res.send(await VGS_User.findOne({userId:user.id}))
	}
	catch(error){
		res.status(500).send(`error, can't add member`)
	}
   })
// prisedent can edit user

router.route("/edituser").put(async (req, res) => {
  //vgsuser data
  try {
    let user = await UserTable.findOne({ email: req.body.email });
    if (!req.body.email)return res.status(500).send({ err: "email field is required" });
    if (!user) return res.status(500).send({ err: "invalid email" });
    const vgsuser=await VGS_User.findOne({userId:user.id})
    if (!vgsuser) return res.status(500).send({ err: "invalid email" });
   
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

    if (vgsuser.userType === userTypeEnum.President.value)
      return res
        .status(500)
        .send({ err: "you can not edit a president account" });

    // data that the prisedent want to change

    if (newuserType) {
      var type = (vgsuser.userType = newuserType);
    }

    if (newclubCommittee) {
      var commitee = (vgsuser.clubCommittee = newclubCommittee);
    }

    if (newhobbies) {
      var hobbies = (vgsuser.hobbies = newhobbies);
    }

    if (newVGSYear) {
      var vYear = (vgsuser.VGSYear = newVGSYear);
    }

    if (newappliedPosition) {
      var appliedPosition = (vgsuser.appliedPosition = newappliedPosition);
    }

    if (newappStatus) {
      var status = (vgsuser.appStatus = newappStatus);
    }

    if (newnotes) {
      var note = (vgsuser.notes = newnotes);
    }

    if (newgameName) {
      var gamename = (vgsuser.gameName = newgameName);
    }

    if (newgameScrSho) {
      var gamescreen = (vgsuser.gameScrSho = newgameScrSho);
    }

    if (newdownloadLink) {
      var link = (vgsuser.downloadLink = newdownloadLink);
    }

    if (newboothMember) {
      var boothmember = (vgsuser.boothMember = newboothMember);
    }

    await VGS_User.updateOne(
      { userId:user.id },
      {
        userType: type || vgsuser.userType,
        clubCommittee: commitee || vgsuser.clubCommittee,
        hobbies: hobbies || vgsuser.hobbies,
        VGSYear: vYear || vgsuser.VGSYear,
        appliedPosition: appliedPosition || vgsuser.appliedPosition,
        notes: note || vgsuser.notes,
        gameName: gamename || vgsuser.gameName,
        gameScrSho: gamescreen || vgsuser.gamescreen,
        downloadLink: link || vgsuser.downloadLink,
        boothMember: boothmember || vgsuser.boothMember
      }
    );
    res.send(await VGS_User.findOne({ userId:user.id }));
  } catch (error) {
    res.send(`error, cannot edit`);
  }
});	

	router
	.route('/note')
	.put(async(req, res) => {
		try{
			// lazm a hundle case elly by3ml add msh member aw applicant
		let user =await UserTable.findOne({email:req.body.email})
	    if (!req.body.email) return res.status(500).send({ err: 'email field is required' });
	    if (!req.body.notes) return res.status(500).send({ err: 'note field is required' });
    if (!user) return res.status(500).send({ err: 'invalid email' });
    const vgsuser=await VGS_User.findOne({userId:user.id})
    if (!vgsuser) return res.status(500).send({ err: 'invalid email' });

    if (typeof req.body.notes !== 'string') return res.status(500).send({ err: 'Invalid value for note' });
	    //if(user.userType==='member')return res.status(404).send({err:('you can not add notes')});
	    //if(user.userType==='applicant')return res.status(404).send({err:('you can not add notes')}),
	await VGS_User.updateOne({userId:user.id},
	      {
		
	    	userId: vgsuser.userId,
			hobbies: vgsuser.hobbies,
			appliedPosition: vgsuser.appliedPosition,
			gameName: vgsuser.gameName,
			userType: vgsuser.userType,
			clubCommittee: vgsuser.clubCommittee,
			appStatus: vgsuser.appStatus,
			notes: vgsuser.notes + ' and ' + req.body.notes,
			gameScrSho: vgsuser.gameScrSho,
			downloadLink: vgsuser.downloadLink,
			boothMember: vgsuser.boothMember,
			VGSYear: vgsuser.VGSYear
	})
	res.send(await VGS_User.findOne({userId:user.id}))
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

// VGS_User.create({
 
// appStatus:1,
// userId:"5cb0c80b3b744f424817553d",
// userType:2,
// clubCommittee:null,
// hobbies:"swimmming",
// VGSYear:2018,
// appliedPosition:null,
// notes:
// "verygood",
// gameName
// :
// "candy cruch",
// gameScrSho
// :
// null,

// downloadLink
// :
// "asldfkkffjjf",
// boothMember
// :
// true
// })
module.exports = router;
