const express = require('express')
const router = express.Router()

const VGS_User  = require('../../models/VGS_User')
const validator = require('../../validations/vgsuserValidations')

 
 router.get('/', async (req,res) => {
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
			res.send(req.body.email)
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
		if (user.userType === "Head" ) return res.status(404).send({err:('you can not delete a head')});
		if (user.userType === "president" ) return res.status(404).send({err:('you can not delete a president')});
		if (user.userType === "Advisor" ) return res.status(404).send({err:('you can not delete an advisor')});
		if (user.userType === "Director" ) return res.status(404).send({err:('you can not delete a president')});
		if (user.clubCommittee === null ) return res.status(404).send({err:('this member not in the commitee')});
		// hundle case eno fe nfs elcommite later 3lashan a7na msh 3rfen lesa men elly 3ml signin

		user.clubCommittee= null;

		res.send(user)
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
router
    .route('/edituser')
    .put(async(req,res)=>{

	//vgsuser data
		try{
			if (!req.body.email) return res.status(400).send({ err: 'email field is required' });
			let user =await VGS_User.findOne({email:req.body.email})
			let newuserType=req.body.userType ;
			let newclubCommittee=req.body.clubCommittee;
			let newhobbies=req.body.hobbies;
			let newVGSYear= req.body.VGSYear;
			let newappliedPosition= req.body.appliedPosition;
			let newappStatus= req.body.appStatus;
			let newnotes= req.body.notes;
			let newgameName= req.body.gameName;
			let newgameScrSho= req.body.gameScrSho;
			let newdownloadLink=req.body.downloadLink;
			let newboothMember=req.body.boothMember;
	// to make sure that prisedent entered email
			if (!user) return res.status(400).send({ err: 'invalid email' });

			if (user.userType === "president" ) return res.status(404).send({err:('you can not edit a president account')});
			
	// data that the prisedent want to change
	
	
	   if(newuserType){
			   		var type = user.userType=newuserType}
			   
	   if (newclubCommittee){
			   		var commitee =user.clubCommittee=newclubCommittee}
				  
	   if(newhobbies){
					var hobbies = user.hobbies=newhobbies}
				  
	   if(newVGSYear){
					var vYear = user.VGSYear=newVGSYear}

	   if(newappliedPosition){
					var appliedPosition = user.appliedPosition=newappliedPosition}
				   
	   if(newappStatus){
					var status = user.appStatus=newappStatus}
				   
	   if(newnotes){
					var note = user.notes=newnotes}
				   
	   if(newgameName){
					var gamename = user.gameName=newgameName}
					  
	   if(newgameScrSho){
				   	var gamescreen = user.gameScrSho=newgameScrSho}
				   
	   if(newdownloadLink){
					var link = user.downloadLink=newdownloadLink}
					   
	   if(newboothMember){
	   				var boothmember = user.boothMember= newboothMember}

	   let x = {
		   email: req.body.email,
		   userType: (type || user.userType),
		   clubCommittee: (commitee || user.clubCommittee),
		   hobbies: (hobbies || user.hobbies),
		   VGSYear: (vYear || user.VGSYear),
		   appliedPosition : (appliedPosition || user.appliedPosition),
		   notes : (note || user.notes),
		   gameName : (gamename || user.gameName),
		   gameScrSho :(gamescreen || user.gamescreen),
		   downloadLink: (link || user.downloadLink),
		   boothMember: (boothmember || user.boothMember)
	   }
		 
	   await VGS_User.update({email: req.body.email},{x})
	    res.send(user)
	   }
	   catch(error){
			res.send(`error, cannot edit`)
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
		res.send(us);
	});
	
// sara's sprint one method without database
    //const userProfile =[
      //  new profile ('madiha_rawatly@smail.com', 'member', 'GDD', 'video games', null, null, 'accepted',
        //'sosoRankDB', 'superhero chess', null, null, null)];
    
    router.get('/getusers', (req, res) => res.json({ data: userProfile}))
    

module.exports = router;