const express = require('express')
const router = express.Router()
 
const AWG = require('../../models/AWG')

const awgs = [
new AWG
    ( clubDescription=  'Determined to fulfill a dream, a dream of being the change',clubName =  'MUN'),
new AWG
    ( clubDescription ='Vector Game Studio is an AWG aimimg to develop and sustain a game development community in Egypt.We do this by giving game art design (GAD) and game designand development (GDD) sessions to our recruits. We also host VGS exclusive events and public events such as game jams and meetups to help create a platform where people with a passion for game development can meet, work together, and exchange ideas.', clubName = 'VGS'),
 new AWG
    ( clubDescription ='First Worlds style debate club in Egypt and North Africa. Established and located in the German University in Cairo', clubName = 'TIQ'),  
 new AWG
    (clubDescription='Nebny GUC is a branch of Nebny Foundation, a non-profitable/non-governmental organization.We are a new AWG in the GUC',clubName =  'Nebny')
    ];


router.get('/', (req, res) => res.json({awgs}));

module.exports = router;