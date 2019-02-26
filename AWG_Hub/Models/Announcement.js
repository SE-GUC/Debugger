const uuid= require('uuid')

class Announcement
{
    constructor(clubName, sentTo, sentFrom, image, text, pdfFile, eventId )
    {
        this.clubName = clubName;
        this.sentTo = sentTo;
        this.sentFrom = sentFrom;
        this.image = image;
        this.text = text;
        this.pdfFile = pdfFile;
        this.eventId = eventId;
        this.id = uuid.v4();
    }

}

module.exports= Announcement;