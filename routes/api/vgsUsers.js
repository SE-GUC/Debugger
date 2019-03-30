const Joi = require("joi");
const express = require('express');
const router = express.Router();
const VGS_User = require("../../Models/VGS_User");
const events = require("./events");
const Event = require('../../Models/Event')
const validator = require('../../Validations/vgsuserValidations')

//const applicants = [];
const eventsList = [

  new Event ('public', 'recruitment booth','1/2/2019'),
  new Event ('private', 'general meeting ','1/3/2019'),
  new Event ('public', 'career advising','1/6/2019'),
 
];
var applicant = new VGS_User();

router.get("/", (req, res) => {
  res.send(`<a href="/api/Application Form">Application Form</a>
            <a href="/api/Events">Events</a>`);
});
router.get('/Events', (req, res) => {
  res.json({ data: eventsList }) 
});

// user filling an application form and we create new VGS user
router
    .route('/application_form')
    .post(async (req, res) => {
        try {

            const applicant = await VGS_User.create(req.body);
            return res.send(applicant)
        }
        catch (error) {
            res.send(`error, we couldn't create the application form`)
        }
    })

// viewing the application form for a user to see his/her status
router
    .route('/application_form_view/:id')
    .get(async (req, res) => {
        try{
            const accpetedApplicant = await VGS_User.findById(req.params.id)
            let status = accpetedApplicant.appStatus
            return res.send(status)
        }
        catch (error){
            return res.send(`error, we couldn't find the application form`)
        }
    })

// viewing all the application forms that are still not accepted nor rejected
router
    .route('/application_forms_view')
    .get(async (req, res) => {
        try {
            const allApplicationForms = await VGS_User.find({appStatus: 'pending'})
            return res.send(allApplicationForms)
        }
        catch (error){
            return res.send(`error, we couldn't get the application forms`)
        }
    })

// update applicant fields
router
    .route('/application_form_update')
    .put(async (req, res) => {
        try{
            let foundApplicant = (await VGS_User.findOne({email:req.body.email}))
            if(!foundApplicant) return res.status(400).send(`the applicant with this email is not found, check the email`)
            else{
                await VGS_User.update({email:req.body.email}, 
                  {
                  email : (req.body.newEmail || foundApplicant.email),
                  clubCommittee : (req.body.clubCommittee || foundApplicant.clubCommittee),
                  hobbies: (req.body.hobbies  || foundApplicant.hobbies), 
                  appliedPosition: (req.body.appliedPosition  || foundApplicant.appliedPosition),
                  gameName : (req.body.gameName  || foundApplicant.gameName)
                  })
            }
            return res.send(foundApplicant)
        }
        catch (error){
            return res.send('error, failed to update')
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


	router.post('/', async (req, res) => {
 
		try {
		 
			 const validation = validator.createValidation(req.body)
			 if (validation.error) 
				return res.status(400).send({ error: validation.error.details[0].message })
			 
			 const newemail = req.body.email
			 const uniqueemail = await VGS_User.findOne({email: newemail})
			 if(uniqueemail) 
				return res.status(400).json({error: 'user already exists'})
			else{
				
				await VGS_User.create(req.body)
				const users = await VGS_User.find()
				res.json({data: users})
			}
	 
	 
		 }
	 
		 catch (error) {
			 res.status(404).send(error.message)
		 }
		 
	 
	 })


// prisedent delete account
router
	.route('/deleteuser')
	.delete(async (req,res)=>{
		try{ 
			const user = await VGS_User.findOne({email:req.body.email}) 
			if (!req.body.email) return res.status(400).send({ err: 'email field is required' }); 
			if (!user) return res.status(400).send({ err: 'invalid email' });
				

			if (user.userType === "president" ) return res.status(404).send({err:('you can not delete a president')});
			else{
				await VGS_User.deleteOne({email:req.body.email})
			}
			res.send('user deleted')
		}
		catch (error) {
			res.send(`error, can't delete`)
		}
});


 // head delete user under him
 router
	.route('/deletefromcommity')
 	.delete(async(req,res)=>{
	try{
		let user = await VGS_User.findOne({email:req.body.email})

		if (!req.body.email) return res.status(400).send({ err: 'email field is required' });

		if (!user) return res.status(400).send({ err: 'invalid email' });
		if (user.userType === "head" ) return res.status(404).send({err:('you can not delete a head')});
		if (user.userType === "president" ) return res.status(404).send({err:('you can not delete a president')});
		if (user.userType === "advisor" ) return res.status(404).send({err:('you can not delete an advisor')});
		if (user.userType === "Director" ) return res.status(404).send({err:('you can not delete a president')});
		if (user.userType === "applicant" ) return res.status(404).send({err:('you can not delete a applicant')});
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
    if (user.userType === "president" ) return res.status(404).send({err:('you can not add a president')});
    if (user.userType === "advisor" ) return res.status(404).send({err:('you can not add an advisor')});
    if (user.userType === "director" ) return res.status(404).send({err:('you can not add a president')});
    if (user.userType === "member" ) return res.status(404).send({err:('you can not add a member')});
    if (user.userType === "head" ) return res.status(404).send({err:('you can not add a head')});

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

    if (user.userType === "president")
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
    

module.exports = router;
