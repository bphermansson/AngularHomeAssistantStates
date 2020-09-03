# AngularHomeAssistantStates

This is a simple Angular project to get data from a Home Assistant server. 

Start by getting a long lived access token as described on  https://www.home-assistant.io/docs/authentication/. Rename 'config.ts.demo' to 'config.ts' and add the token and the IP of your Home Assistant instance.  
Then edit app.component.ts, function "answerFunc", to get different values as described in the comments.
Finaly, run the project with 'ng serve' and check the resulting web page including the log. 


