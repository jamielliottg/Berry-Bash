'use strict';

const Alexa = require('alexa-sdk');

//////////Helper shorthands for multi modal compatability
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage = Alexa.utils.ImageUtils.makeImage;
const makeRichText = Alexa.utils.TextUtils.makeRichText;

/////////Code data
var skillName = 'Berry Bash';

var adjectives = ['craziest', 'hippest', 'tastiest', 'sweetest', 'greatest', 'cheekiest', 'spiciest', 'greatest', 'smartest', 'best'];

var fruitsMainImage = 'http://i.telegraph.co.uk/multimedia/archive/03418/Berries-Jacqueline_3418530b.jpg';
var secondPlaceImage = 'http://www.sticker.com/picture_library/product_images/award-ribbons/72435_2nd-second-place-award-ribbon-stickers-and-labels.png';
var firstPlaceImage = 'http://www.sticker.com/picture_library/product_images/award-ribbons/72430_1st-first-place-award-ribbon-stickers-and-labels.png';

var berryNames = ['raspberries',
    'blackberries',
    'strawberries',
    'blueberries',
    'elderberries',
    'gooseberries',
    'cranberries',
    'huckleberries',
    'bilberries',
    'gojiberries'];
    
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
        newSessionHandler.call(this);
        
        var speechOutput = 'Welcome to ' + skillName + ', the ' + adjectives[getRandomVal(0, adjectives.length - 1)] + ' stop for knowledge about berries around. ';
        this.attributes['skillState'] = 'mainState';
        
        showHome.call(this, speechOutput);
    },
    'InformationIntent': function () {
        newSessionHandler.call(this);
        
        if (this.attributes['skillState'] == 'gamePlaying')
        {
            
        }
        else
        {
            showMainList.call(this);
        }
    },
    'AMAZON.YesIntent': function () {
        newSessionHandler.call(this);
        if (this.attributes['skillState'] == 'quizMainMenu')
        {
            var speechOutput;
            var questionNo = 0;
            
            speechOutput = '<say-as interpret-as="interjection">Good luck.</say-as> ';
            
            this.attributes['skillState'] = 'gamePlaying';
            
            generateNewQuestion.call(this, speechOutput, questionNo);
        }
    },
    'QuizIntent': function () {
        newSessionHandler.call(this);
        var speechOutput = '<say-as interpret-as="interjection">dun dun dun.</say-as> Check out the big brains over here. Are you ready to begin?';
        this.attributes['berries2'] = this.attributes['berries'];
        var berryArray = this.attributes['berries2'];
        
        berryArray = shuffle(berryArray);
        
        var randomBerries = [];
        
        for (var i = 0; i < 6; i++)
        {
            randomBerries[i] = berryArray[i];
        }
        
        this.attributes['QuizBerries'] = shuffle(randomBerries);
        this.attributes['skillState'] = 'quizMainMenu';
        
        var reprompt = "hello";
        
        this.response.speak(speechOutput);
        this.response.listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.NoIntent': function () {
        if (this.attributes['skillState'] == 'gamePlaying')
        {
            showHome.call(this, null);
        }
        else
            endSkill.call(this);
    },
    'AMAZON.StopIntent': function () {
        endSkill.call(this);
    },
    'AMAZON.CancelIntent': function () {
        endSkill.call(this);
    },
    'AMAZON.HelpIntent': function () {
        newSessionHandler.call(this);
        var speechOutput = skillName + ' provides you with some interesting information about the ' + adjectives[getRandomVal(0, adjectives.length - 1)] + ' berries ever. Simply ask for a berry and you will be provided with some cool info. Are you ready?';
        var reprompt = "Would you like to hear about a berry?";
        
        this.response.speak(speechOutput);
        this.response.listen(reprompt);
        this.emit(':responseReady');
    },
    'BackToListIntent': function () {
        newSessionHandler.call(this);
        showMainList.call(this);
    },
    'ElementSelected': function () {//To handle events when the screen is touched
        newSessionHandler.call(this);
        
        if (this.attributes['skillState'] == 'gamePlaying')
        {
            var optionsArray = this.attributes['onScreenOptions'];
            var correctQIndex = this.attributes['correctIndex'];
            var quizBerries = this.attributes['QuizBerries'];
            var currentQNo = this.attributes['questionNumber'];
            var speechOutput;
            
            if (this.event.request.token)
            {
                if (currentQNo < quizBerries.length-1)
                    handleAnswer.call(this, optionsArray[correctQIndex].token, this.event.request.token, quizBerries, false);
                else
                    handleAnswer.call(this, optionsArray[correctQIndex].token, this.event.request.token, quizBerries, true);
            }
            else if (parseInt(this.event.request.intent.slots.numberValue.value))
            {
                var userChoiceNumber = parseInt(this.event.request.intent.slots.numberValue.value);
                
                if (currentQNo < quizBerries.length-1)
                {
                    if (userChoiceNumber > 0 && userChoiceNumber < 5)
                    {
                        handleAnswer.call(this, correctQIndex+1, userChoiceNumber, quizBerries, false);
                    }
                    else
                    {
                        speechOutput = 'Please say a number between 1 and 4';
                        this.response.speak(speechOutput);
                        this.response.shouldEndSession(null);
                        this.emit(':responseReady');
                    }
                }
                else
                {
                    handleAnswer.call(this, correctQIndex+1, userChoiceNumber, quizBerries, true);
                }
            }
        }
        else if (this.attributes['skillState'] == 'mainState')
        {
            if (this.event.request.token == "berry_book_token")
                showMainList.call(this);
            else if (this.event.request.token == 'berry_buzz_token')
                this.emit('QuizIntent');
        }
        else 
        {
            var berryArray = this.attributes['berries'];
            
            if (this.event.request.token == 'berry_list_token') //'Go back' action links selected
            {
                showMainList.call(this);
            }
            else if (this.event.request.token) //When a list item has been selected
            {
                var valueToken = this.event.request.token;
                var result = matchChecker(berryArray, valueToken);
                
                showSpecificFruitInfo.call(this, result, berryArray);
            }
            else if (this.event.request.intent.slots.fruitValue.value) //If the user chooses their berry via voice
            {
                var userFruit = this.event.request.intent.slots.fruitValue.value;
                
                var result = matchChecker(berryArray, userFruit.toLowerCase());

                if (result)
                    showSpecificFruitInfo.call(this, result, berryArray);
                else
                    handleUnknown.call(this);
            }
            else //If this intent is hit without the needed data 
            {
                handleUnknown.call(this);
            }
        }
    }
};

function matchChecker(pArray, pCompare1)
{
    for (var i = 0 ; i < pArray.length; i++) //Find out which berry
    {
        if (pCompare1 == pArray[i].name || pCompare1 == pArray[i].token)
            return i;
    }
}

function handleAnswer(pCorrectAnswer, pUserAnswer, pArray, pGameFinished)
{
    var speechOutput;
    
    if (pCorrectAnswer == pUserAnswer)
    {
        speechOutput = generateRandomCongratSC() + ' That is correct! ';
        
        if (this.attributes['correctAnswersNo'])
            this.attributes['correctAnswersNo']++;
        else
            this.attributes['correctAnswersNo'] = 1;
    }
    else
    {
        speechOutput = generateRandomWrongSC() + ' That is incorrect. ';
    }
    
    if (!pGameFinished)
    {
        this.attributes['questionNumber']++;
        generateNewQuestion.call(this, speechOutput, this.attributes['questionNumber']);
    }
    else
    {
        var answerSing = 'answers';
        var cardTitle = 'Game Over!';
        var gameoverImage;
        
        if (this.attributes['correctAnswersNo'] && this.attributes['correctAnswersNo'] == 1)
            answerSing = 'answer';
        
        speechOutput += ' Out of ' + pArray.length + ', you got ' + (this.attributes['correctAnswersNo'] || 0) + ' ' + answerSing + ' correct. ';
        var speechOutput2 = 'Ask to play again; otherwise, I can teach you about some of the berries you have just seen if you would prefer. Just let me know.';
        speechOutput += speechOutput2;
        
        this.attributes['skillState'] = 'mainState';
        
        if (this.attributes['correctAnswersNo'] && this.attributes['correctAnswersNo'] > 4)
            gameoverImage = firstPlaceImage;
        else
            gameoverImage = secondPlaceImage;
        
        if (supportsDisplay.call(this))
        {
            bodyTemplateMaker.call(this, 2, gameoverImage, cardTitle, '<b><font size="7">' + (this.attributes['correctAnswersNo'] || 0) + ' / ' + pArray.length + ' correct.</font></b>', '<br/>' + speechOutput2, speechOutput, null, "teach me about berries"); 
        }
        else
        {
            this.response.speak(speechOutput);
            this.response.shouldEndSession(null);
            this.emit(':responseReady');
        }
    }
}

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function showHome(pSpeechOutput)
 {
     var speechOutput = pSpeechOutput || '';
     var cardTitle = skillName;
     
     var actionText1 = '<action value="berry_book_token"><i>Berry Book</i></action>';
     var actionText2 = '<action value="berry_buzz_token"><i>Berry Buzz</i></action>';
     
     speechOutput += 'Simply ask me to provide information about berries from the Berry Book, or if you are feeling lucky, ask for a quick game of Berry Buzz.'; 
     var text = '<u><font size="7">' + skillName + '</font></u><br/><br/>Simply ask me to provide information about berries from the ' + actionText1 + ', or if you are feeling lucky, ask for a quick game of ' + actionText2 + '.'; 
     var reprompt = 'What would you like to do?';
     
     if (supportsDisplay.call(this))
        bodyTemplateMaker.call(this, 3, fruitsMainImage, cardTitle, null, text, speechOutput, reprompt); 
    else
    {
        this.response.speak(speechOutput);
        this.response.listen(reprompt);
        this.response.cardRenderer(cardTitle, speechOutput, fruitsMainImage);
        this.emit(':responseReady');
    }
 }

//////////Helper Functions
function createBerry(pName, pImageURL, pInfo, pOrigin)
{
    var berry = {
        name        : pName,
        imageURL     : pImageURL,
        info : pInfo,
        token : pName + 'Token',
        origin : pOrigin
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

function bodyTemplateMaker(pBodyTemplateType, pImg, pTitle, pText1, pText2, pOutputSpeech, pReprompt, pHint)
{
    var bodyTemplate;
    
    if (pBodyTemplateType == 7)
        bodyTemplate = new Alexa.templateBuilders.BodyTemplate7Builder();
    
    if (pBodyTemplateType == 3)
        bodyTemplate = new Alexa.templateBuilders.BodyTemplate3Builder();
        
    if (pBodyTemplateType == 2)
        bodyTemplate = new Alexa.templateBuilders.BodyTemplate2Builder();
    
    let template = bodyTemplate.setTitle(pTitle)
                          .build();
    
    bodyTemplate.setTextContent(makeRichText(pText1) || null, makeRichText(pText2) || null)
    
    if (pImg)
        bodyTemplate.setImage(makeImage(pImg));

    this.response.speak(pOutputSpeech)
                 .renderTemplate(template)
                 .shouldEndSession(null);
                 
    this.response.hint(pHint || null, "PlainText");
    
    if (pReprompt)
        this.response.listen(pReprompt);
    
    this.emit(':responseReady');
}

function generateNewQuestion(pSpeechOutput, pQuestionNo)
{
    var berryArray = this.attributes['berries2'];
    var quizBerries = this.attributes['QuizBerries'];
    var questionAskType = ['Which of these looks like ', 'Please select the image that represents ', 'Do you know which of these look like '];
            
    var question;
    question = 'Question ' + (pQuestionNo+1) + ': ' + questionAskType[getRandomVal(0, 3)] + quizBerries[pQuestionNo].name + '?';
    pSpeechOutput += question;
    var index;
    
    for (var i = 0; i < berryArray.length; i++)
    {
        if (berryArray[i].name == quizBerries[pQuestionNo].name)
        {
            index = i;
            break;
        }
    }
    
    berryArray.splice(index, 1);
    berryArray = shuffle(berryArray);
    
    var optionsArray = [quizBerries[pQuestionNo]];
    
    for (var i = 1; i < 4; i++)
        optionsArray[i] = berryArray[i];
    
    optionsArray = shuffle(optionsArray);
    
    for (var i = 0; i < optionsArray.length; i++)
    {
        if (optionsArray[i].name == quizBerries[pQuestionNo].name)
        {
            this.attributes['correctIndex'] = i;
            break;
        }
    }
    
    this.attributes['onScreenOptions'] = optionsArray;
    this.attributes['questionNumber'] = pQuestionNo;
    
    listTemplateMaker.call(this, optionsArray, 2, question, pSpeechOutput, true);
}

function showMainList()
{
    var speechOutput;
    
    this.attributes['skillState'] = null;

    if (supportsDisplay.call(this))
    {
        speechOutput = 'Select or ask for a berry below for more information.';
        listTemplateMaker.call(this, this.attributes['berries'], 1, speechOutput, speechOutput);
    }
    else
    {
        var berryArray = this.attributes['berries'];
            
        speechOutput = "I have a range of berries I can tell you about including: ";
        
        for (var i = 0; i < berryArray.length; i++)
            speechOutput += berryArray[i].name + ', ';
            
        speechOutput += ". Which would you like to hear about?";
        
        this.response.speak(speechOutput);
        this.response.listen(speechOutput);
        this.response.cardRenderer('Berry List', speechOutput);
        this.emit(':responseReady');
    }
}

function newSessionHandler()
{
    if (this.event.session.new)
    {
        var berriesArray = [];
        
        for (var i = 0 ; i < berryNames.length; i++) //We create a new set of berries here
            berriesArray[i] = createBerry(berryNames[i], berryImgURLs[i], berryInfo[i]);
        
        this.attributes['berries'] = shuffle(berriesArray); //And then randomise them each time the skill starts
        this.attributes['berries2'] = this.attributes['berries'];
    }
}
    
function listTemplateMaker(pArray, pType, pTitle, pOutputSpeech, pQuiz)
{
    const listItemBuilder = new Alexa.templateBuilders.ListItemBuilder();
    var listTemplateBuilder;
    
    if (pType == 1)
        listTemplateBuilder = new Alexa.templateBuilders.ListTemplate1Builder();
    else if (pType == 2)
        listTemplateBuilder = new Alexa.templateBuilders.ListTemplate2Builder();

    if (!pQuiz)
    {
        for (var i = 0; i < pArray.length; i++)
            listItemBuilder.addItem(makeImage(pArray[i].imageURL), pArray[i].token, makePlainText(capitalizeFirstLetter(pArray[i].name)));
    }
    else
    {
        for (var i = 0; i < pArray.length; i++)
            listItemBuilder.addItem(makeImage(pArray[i].imageURL), pArray[i].token);
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
    if (supportsDisplay.call(this))
    {
        bodyTemplateMaker.call(this, 3, pArray[pIndex].imageURL, capitalizeFirstLetter(pArray[pIndex].name), pArray[pIndex].info, '<action value="berry_list_token">Go back to Berry list.</action>', pArray[pIndex].info); 
    }
    else
    {
        
    }
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
    var speechOutput = "Thanks for checking out " + skillName + ". Learn more about berries another time. Goodbye!"
    
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

function generateRandomCongratSC()
{
    
    var speechconArray = ['bang', 'boing', 'kaboom', 'mazel tov', 'oh snap', 'well done']
    var r = getRandomVal(0, speechconArray.length);

    return '<say-as interpret-as="interjection">' + speechconArray[r] + '</say-as>. ';
    
}

function generateRandomWrongSC()
{
    
    var speechconArray = ['wah wah', 'uh oh', 'tosh', 'quack', 'oof', 'oh dear']
    var r = getRandomVal(0, speechconArray.length);

    return '<say-as interpret-as="interjection">' + speechconArray[r] + '</say-as>. ';
}
