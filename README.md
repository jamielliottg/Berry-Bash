# BerryBible

Installation
Clone the repository.

$ git clone https://github.com/alexa/skill-sample-nodejs-city-guide/
Initiatialize the ASK CLI by Navigating into the repository and running npm command: ask init. Follow the prompts.

$ cd skill-sample-nodejs-city-guide
$ ask init
Install npm dependencies by navigating into the /lambda/custom directory and running the npm command: npm install

$ cd lambda/custom
$ npm install
Deployment
ASK CLI will create the skill and the lambda function for you. The Lambda function will be created in us-east-1 (Northern Virginia) by default.

Deploy the skill and the lambda function in one step by running the following command:

$ ask deploy
Testing
To test, you need to login to Alexa Developer Console, and enable the "Test" switch on your skill from the "Test" Tab.

Simulate verbal interaction with your skill through the command line using the following example:

 $ ask simulate -l en-GB -t "start city guide"

 ✓ Simulation created for simulation id: 4a7a9ed8-94b2-40c0-b3bd-fb63d9887fa7
◡ Waiting for simulation response{
  "status": "SUCCESSFUL",
  ...
Once the "Test" switch is enabled, your skill can be tested on devices associated with the developer account as well. Speak to Alexa from any enabled device, from your browser at echosim.io, or through your Amazon Mobile App and say :

Alexa, start city guide
