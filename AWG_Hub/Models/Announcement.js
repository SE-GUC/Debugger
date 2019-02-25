class Announcements
{
    constructor( )
    {
            console.log(this)
    }
        printMyName(x){
            console.log(x);
            console.log('lol')
        }
       
    }
    

var obj = new Announcements();

obj.printMyName('maha');
module.exports = Announcements