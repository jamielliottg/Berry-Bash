'use strict';

const Alexa = require('alexa-sdk');

//////////Helper shorthands for multi modal compatability
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage = Alexa.utils.ImageUtils.makeImage;
const makeRichText = Alexa.utils.TextUtils.makeRichText;

/////////Code data
var adjectives = ['craziest', 'hippest', 'tastiest', 'sweetest', 'greatest', 'cheekiest', 'spiciest', 'greatest', 'smartest', 'best'];

var fruitsMainImage = 'http://gottausewords.com/wp-content/uploads/2013/03/fruitbookapple.jpg';

var berryNames = ['raspberry',
    'blackberry',
    'strawberry',
    'blueberry',
    'elderberry',
    'gooseberry',
    'cranberry',
    'huckleberry',
    'bilberry',
    'gojiberry'];
    
var berryImgURLs = ['http://www.publicdomainpictures.net/pictures/10000/velka/1-1248158051Ix2h.jpg',
'https://www.organicfacts.net/wp-content/uploads/2013/06/blackberry.jpg',
'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/PerfectStrawberry.jpg/220px-PerfectStrawberry.jpg',
'https://wishfarms.com/wp-content/uploads/2015/09/berries_main_image2.jpg',
'https://www.organicfacts.net/wp-content/uploads/elderberry.jpg',
'https://ripeme.com/wp-content/uploads/Gooseberry.jpg',
'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Cranberries20101210.jpg/220px-Cranberries20101210.jpg',
'https://hartmannsplantcompany.com/wholesale/wp-content/uploads/sites/3/2015/04/michigan-huckleberry.jpg',
'https://www.organicfacts.net/wp-content/uploads/2013/06/billberries.jpg',
'https://www.healthline.com/hlcmsresource/images/topic_centers/Food-Nutrition/1296x728_8-Healthy-Facts-About-Goji-Berries_IMAGE_1.jpg'];
/////Mostly found from Google

var berryInfo = ['The Raspberry or Red Raspberry is the plant that produces a tart, sweet, red composite fruit in the late summer and early autumn. In proper botanical language, it is not a berry at all, but instead an aggregate fruit of numerous drupelets around the central core.',
'The blackberry is an edible fruit produced by many species in the Rubus genus in the Rosaceae family, hybrids among these species within the Rubus subgenus, and hybrids between the Rubus and Idaeobatus subgenera.',
'Strawberries are short-lived herbaceous perennials, producing for 2 to 3 years. Plant in an open, sunny position in raised beds; a good airflow will reduce fungal diseases. Strawberries prefer a well-drained soil, rich in humus. Dig in lots of organic matter, compost, animal manure or blood and bone, about a month before planting.',
'Blueberry is one of the highest antioxidant capacities among all fruits, vegetables, spices and seasonings. Antioxidants are necessary to optimizing fitness by helping to combat the free radicals that can damage cellular structures as well as DNA. Blueberries are small blue to black colored fruits with a green flesh. They should be rich and bright in color with a natural bloom.',
'Elderberry also known as Sambucus is from the family of Adoxaceae, which is a genus of flowering plant. Formerly placed in the honeysuckle family, the fruits when ripe are blackish purple in color and globose in shape. With seeds just about 3mm long, they are globular in shape and about 4 mm diameter, calyx persistent at the apex.',
'Indian gooseberry fruits are of small size and light green in color. They have 6 vertical grooves on them. The taste of the fruit can be described as strong, harsh, and rough. This fruit is round shaped with vertical stripes and has a hard seed inside.',
'Cranberries are low, creeping shrubs or vines up to 2 metres long and 5 to 20 centimetres in height; they have slender, wiry stems that are not thickly woody and have small evergreen leaves. The flowers are dark pink, with very distinct reflexed petals, leaving the style and stamens fully exposed and pointing forward. They are pollinated by bees. The fruit is a berry that is larger than the leaves of the plant; it is initially light green, turning red when ripe. It is edible, but with an acidic taste that usually overwhelms its sweetness.',
'Huckleberry otherwise called hurtleberry is the native fruit of North America. The fruit appear in various dark colors such as red, blue and black and each berry measures 5-10mm in diameter. The fruit is completely edible and possesses a unique sweet taste. These berries are used as a major flavoring agent in juice, tea, soup, pudding, pie, pancakes and jam. It is also used for treating pain and healing heart disease and infections.',
'Bilberry is a name given to species of low-growing shrubs of the genus Vaccinium that bear tasty fruits. This species also known as blaeberry, whortleberry, whinberry, myrtle blueberry, and other names regionally. Bilberries are rarely cultivated but fruits are sometimes collected from wild plants growing on public lands, especially in Scandinavia and Poland.',
'Goji, goji berry, or wolfberry is the fruit of either the Lycium barbarum or Lycium chinense, two closely related species of boxthorn in the nightshade family, Solanaceae. The family also includes the potato, tomato, eggplant, belladonna, chili pepper, and tobacco. The two species are native to Asia.'];
 /////Sourced from fruitsinfo.com
 
const handlers = {
    'LaunchRequest': function () {
        var berriesArray = [];
        var speechOutput = 'Welcome to the Berry Bible, the ' + adjectives[getRandomVal(0, adjectives.length - 1)] + ' stop for knowledge about berries around. Would you like to hear about some berries?';
        var reprompt = 'Would you like to hear about some berries?';
        var cardTitle = 'Welcome to the Berry Bible';
        
        for (var i = 0 ; i < berryNames.length; i++) //We create a new set of berries here
            berriesArray[i] = createBerry(berryNames[i], berryImgURLs[i], berryInfo[i]);
        
        this.attributes['berries'] = shuffle(berriesArray); //And then randomise them each time the skill starts
        
        if (supportsDisplay.call(this))
            bodyTemplateMaker.call(this, 7, fruitsMainImage, cardTitle, null, null, speechOutput, reprompt); 
        else
        {
            this.response.speak(speechOutput);
            this.response.listen(reprompt);
            this.response.cardRenderer(cardTitle, speechOutput, fruitsMainImage);
            this.emit(':responseReady');
        }
    },
    'MoreInfoIntent': function () {//If the user asks for more information about the currently selected fruit
        var speechOutput = this.attributes['berries'][this.attributes['currentBerryArrayIndex']].info;
        
        this.response.speak(speechOutput);
        this.response.shouldEndSession(null);
        this.emit(':responseReady');
    },
    'AMAZON.YesIntent': function () {
        if (supportsDisplay.call(this))
            showMainList.call(this);
        else
            showAudioMainList.call(this);
    },
    'AMAZON.NoIntent': function () {
        endSkill.call(this);
    },
    'AMAZON.StopIntent': function () {
        endSkill.call(this);
    },
    'AMAZON.CancelIntent': function () {
        endSkill.call(this);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = 'The Berry Bible provides you with some interesting information about the ' + adjectives[getRandomVal(0, adjectives.length - 1)] + ' berries ever. Simply ask for a berry and you will be provided with some cool info. Are you ready?';
        var reprompt = "Would you like to hear about a berry?";
        
        this.response.speak(speechOutput);
        this.response.listen(reprompt);
        this.emit(':responseReady');
    },
    'BackToListIntent': function () {
        if (supportsDisplay.call(this))
            showMainList.call(this);
        else
            showAudioMainList.call(this);
    },
    'ElementSelected': function () {//To handle events when the screen is touched
        var berryArray = this.attributes['berries'];
        
        if (this.event.request.token == 'berry_list_token') //'Go back' action links selected
        {
            showMainList.call(this);
        }
        else if (this.event.request.token) //When a list item has been selected
        {
            var valueToken = this.event.request.token;
            var index;
            
            for (var i = 0 ; i < berryArray.length; i++) //Find out which one based on array index
            {
                if (valueToken == berryArray[i].token)
                {
                    this.attributes['currentBerryArrayIndex'] = i;
                    index = i;
                    break;
                }
            }
            
            showSpecificFruitInfo.call(this, index, berryArray);
        }
        else if (this.event.request.intent.slots.fruitValue.value) //If the user chooses their berry via voice
        {
            var userFruit = this.event.request.intent.slots.fruitValue.value;
            var index;
            
            for (var i = 0 ; i < berryArray.length; i++) //Find out which berry
            {
                if (userFruit.toLowerCase() == berryArray[i].name.toLowerCase())
                {
                    this.attributes['currentBerryArrayIndex'] = i;
                    index = i;
                    break;
                }
            }
            
            if (index) //If we don't have information about their chosen slot value..
                showSpecificFruitInfo.call(this, index, berryArray);
            else
                handleUnknown.call(this);
        }
        else //If this intent is hit without the needed data 
        {
            handleUnknown.call(this);
        }
    }
    
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//////////Helper Functions
function createBerry(pName, pImageURL, pInfo)
{
    var berry = {
        name        : pName,
        imageURL     : pImageURL,
        info : pInfo,
        token : pName + 'Token'
    };
    
    return berry;
}

/////Multi Modal Support Functions
function supportsDisplay() {
    var hasDisplay =
    this.event.context &&
    this.event.context.System &&
    this.event.context.System.device &&
    this.event.context.System.device.supportedInterfaces &&
    this.event.context.System.device.supportedInterfaces.Display

    return hasDisplay;
}

function handleUnknown()
{
    var speechOutput = 'I am sorry. I did not quite get that one. Could you try again?';
    var reprompt = 'Would you like to hear about another berry?';
    
    this.response.speak(speechOutput);
    
    if (supportsDisplay.call(this))
        this.response.shouldEndSession(null);
    else
        this.response.listen(reprompt);
    
    this.emit(':responseReady');
}

function bodyTemplateMaker(pBodyTemplateType, pImg, pTitle, pText1, pText2, pOutputSpeech, pReprompt)
{
    var bodyTemplate;
    
    if (pBodyTemplateType == 7)
        bodyTemplate = new Alexa.templateBuilders.BodyTemplate7Builder();
    
    if (pBodyTemplateType == 3)
        bodyTemplate = new Alexa.templateBuilders.BodyTemplate3Builder();
    
    let template = bodyTemplate.setTitle(pTitle)
                          .build();
    
    if (pText1 && pText2)
        bodyTemplate.setTextContent(makePlainText(pText1), makeRichText(pText2))
    
    if (pImg)
        bodyTemplate.setImage(makeImage(pImg));

    this.response.speak(pOutputSpeech)
                 .renderTemplate(template)
                 .shouldEndSession(null);
    
    if (pReprompt)
        this.response.listen(pReprompt);
    
    this.emit(':responseReady');
}

function showAudioMainList()
{
    var berryArray = this.attributes['berries'];
            
    var speechOutput = "I have a range of berries I can tell you about including: ";
    
    for (var i = 0; i < berryArray.length; i++)
        speechOutput += berryArray[i].name + ', ';
        
    speechOutput += ". Which would you like to hear about?";
    
    this.response.speak(speechOutput);
    this.response.listen(speechOutput);
    this.response.cardRenderer('Berry List', speechOutput);
    this.emit(':responseReady');
}

function showMainList()
{
    var speechOutput = 'Select or ask for a berry below for more information.';
    listTemplateMaker.call(this, this.attributes['berries'], speechOutput, speechOutput);
}
    
function listTemplateMaker(pArray, pTitle, pOutputSpeech)
{
    const listItemBuilder = new Alexa.templateBuilders.ListItemBuilder();
    const listTemplateBuilder = new Alexa.templateBuilders.ListTemplate1Builder();

    for (var i = 0; i < pArray.length; i++)
    {
        listItemBuilder.addItem(makeImage(pArray[i].imageURL), pArray[i].token, makePlainText(capitalizeFirstLetter(pArray[i].name)));
    }
    
    const listItems = listItemBuilder.build();
    const listTemplate = listTemplateBuilder.setToken('listToken')
    										.setTitle(pTitle)
    										.setListItems(listItems)
    										.build();
    this.response.speak(pOutputSpeech)
    			.renderTemplate(listTemplate)
    			.shouldEndSession(null);
    this.emit(':responseReady');
}

function showSpecificFruitInfo(pIndex, pArray)
{
    var infoSplit = pArray[pIndex].info.split('.');
    bodyTemplateMaker.call(this, 3, pArray[pIndex].imageURL, capitalizeFirstLetter(pArray[pIndex].name), pArray[pIndex].info, '<action value="berry_list_token">Go back to Berry list.</action>', infoSplit[0] + '. Ask me to read out the rest; otherwise, ask to be taken back to the main list.'); 
}

/////Code Support Functions
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function endSkill()
{
    var speechOutput = "Thanks for checking out the Berry Bible. Learn more about berries another time. Goodbye!"
    
    this.response.speak(speechOutput);
    this.emit(':responseReady');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomVal(pMin, pMax)
{
    return Math.floor((Math.random() * pMax) + pMin);
}
