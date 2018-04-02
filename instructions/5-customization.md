# Quickly Build A Multi Modal Quiz & Dictionary Alexa Skill
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](./1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](./2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](./3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png)](./4-testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-on._TTH_.png)](./5-customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./6-publication.md)

## Customize the Skill to be Yours

At this point, you should have a working copy of our Berry Bash skill. In order to make it your own, you will need to customize it with data and responses that you create.  Here are the things you will need to change:

1.  **New data.** You can create a new dataset for your skill that *isn't* related to berries. In fact, if you have the relevant information and pictures, you can change it however you like!

    1.  **Open a copy of index.js.** If you haven't already downloaded the code for this project, [you can find a copy of index.js here on GitHub](../lambda/custom/index.js).  You can use a simple, lightweight code editor like [Atom](http://atom.io), [Sublime Text](http://sublimetext.com), or [VSCode](http://code.visualstudio.com), but you also have the option to edit the code directly in your Lambda function.

    2.  **Search for the comment "/////////Code data"**  Below this is the data for our skill.  You can see that there are different arrays for different values related to each individual item; these are used to create objects later on. If you want to add more properties, just create another array and ensure it's added to the constructor in the 'createBerry' function.
    
    3.  **Experiment with render template types**  The code at the moment uses a few types of body templates and list templates, but you can see that we have quite the selection available over [here](https://developer.amazon.com/docs/custom-skills/display-interface-reference.html). 

    4.  **Consider using built-in slot values.** We recommend considering data from the built-in slot values provided by Amazon.  You still need to build your entire dataset, but using values from the built-in slots will make your work in the next few steps easier.  We have provided a few examples below, but you can see the [entire list of built-in slot values here](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#list-types).

        | Slot Name | Description | Sample Values | Supported Languages |
        | --------- | ----------- | ------------- | ------------------- |
        | [AMAZON.Actor](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#actor) | Names of actors and actresses | Alan Rickman, Amy Adams, Daniel Radcliffe, Emma Watson | US |
        | [AMAZON.Airline](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#airline) | Name of a variety of airlines | Alaska Airlines, British Airways, Dolphin Air, Maestro | US |
        | [AMAZON.Animal](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#animal) | Names of many different animals | blister beetle, common frog, moray eel, opossum, spider monkey | US |
        | [AMAZON.Comic](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#comic) | Titles of comic books | Justice League, Runaways, The Amazing Spiderman, Watchmen, X-Men | US |
        | [AMAZON.EUROPE_CITY](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#europe_city) | European and world cities | Kempten, Lourdes, Paris, London, Barcelona | US, UK, DE |
        | [AMAZON.Sport](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#sport) | Names of sports | basketball, college football, football, gymnastics, team handball | US |
        | [AMAZON.VideoGame](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#videogame) | Titles of video games | Doom Two, Lemmings, The Sims, Worms | US |

    4.  **Once you have your data, here are a couple of tips to remember as we move forward:**

        *  **If you change values in the code, make sure that they are changed in the interaction model too under our custom slot types.** 
        *  **If you can't think of any new fruit, just look them up.** We're going to be publishing this skill, so we need to make sure that our users are getting accurate data.

    5.  **When you have replaced the data in index.js, copy the contents of your file to your Lambda function.**  This should be as simple as copying the text, and pasting it into the code box for your Lambda.

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/5-1-5-lambda-code-box._TTH_.png" />

2.  **New language.** If you are creating this skill for another language other than English, you will need to make sure Alexa's responses are also in that language.

    *  For example, if you are creating your skill in German, every single response that Alexa makes has to be in German.  You can't use English responses or your skill will fail certification.

3.  **Once you have made the updates listed above, you can move on to some of the optional customization below.**

## Add a New Intent with Slots

1.  **Choosing Slot Types**

Continuing with Berry Bash, let’s add a feature by adding a new intent, such as a new type of intent that we want our skill to handle. This can be whatever you want; you can do this by following below:

1. Go to developer.amazon, click Interaction Model on the left to enter the skill builder.

1. Click "Add New Intent".

1. Name it whatever you want (usually SOMETHINGIntent) and click Create Intent.

1. Click utterances and type things your users may say to his this intent

1. You can Double-click the a word to create a new intent slot on the right.

1. Click choose a slot type, you can use the search to pick from Amazon's internal ones.

1. Click Save & then click Build Skill.

1. Click test.

1. Type a similar utterance for this intent into the Service Simulator > Enter Utterance field and then hit enter.

1. When you see the Lambda Request box fill with code, select everything in that box and copy it.

1. In your aws.amazon window: click ‘Actions’ button, then select "Configure Test Event".

1. Paste the code that you just copied into the field that comes up, then scroll down and click "Save and Test".

1. This test should fail, but we expect it to so it's ok.  

1. Go back to your Lambda function and find your handlers. Copy an entire handler and paste it in. You should now have something like this:

``` 'DIFFERENTIntent': function () {

    }, 
    'SOMETHINGIntent': function () {

    },
```

1. Change the name of your new intent to the intent name you just made.

1. Add code for how you'd like your skill to response if this intent was hit by a user

1. Save, then test again, then go to the developer portal.

1. Now when you test your utterance in the skill builder, you should get and be able to hear a response.

### Extra Credit

What about custom slot types? The Alexa [Quiz Game](https://github.com/alexa/skill-sample-nodejs-quiz-game) Skill uses a custom slot, named US_STATE_ABBR.  Try creating a custom slot for your own skill.

<br/><br/>
<a href="./6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_publication._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
