class Announcements
{
    constructor( )
    {
            console.log(this)
    }
        printMyName(x){
            console.log(x);
        }
       
    }
    

var obj = new Announcements();

obj.printMyName('maha');
module.exports = Announcements