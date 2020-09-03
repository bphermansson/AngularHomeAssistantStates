import { Component } from '@angular/core';
import { webSocket, WebSocketSubject} from 'rxjs/webSocket'; 
import { JsonConfig } from '../assets/config';
import { authToken } from '../assets/config';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <h1>{{title}}</h1>
    <h2>My selected value is: {{myValue}}</h2>`
})
export class AppComponent {
  title = 'AngularHomeAssistantStates';
  myWebSocket: WebSocketSubject<any> = webSocket(JsonConfig.haUrl);
  msg = ''
  myValue=0

  constructor() {
    this.myWebSocket.subscribe(
      //msg => console.log('message received: ' + msg),
      msg => this.answerFunc(msg),
      // Called whenever there is a message from the server
      err => console.log(err),
      // Called if WebSocket API signals some kind of error
      () => console.log('complete')
      // Called when connection is closed (for whatever reason)
   );
  connectToHa(this.myWebSocket)
  }
  answerFunc(msg){
    this.msg=msg
    if(msg.result != undefined) {
      // The whole result:
      //console.log(msg.result)
      msg.result.forEach(element => {
      // One line for each entity:  
      // console.log(element)
      // One line for each entity's state:  
      // console.log(element.state)
      // One single state from a selected entity:
        if ( element.entity_id == "sensor.emontxv3ehyhtu21d_temperature")
        {
          this.myValue = element.state            // To the gui
          console.log("myValue: " + this.myValue) // In the console
        }
      });   
    }  
  }
}

function connectToHa(myWebSocket){
  var type = authToken.type
  var access_token = authToken.access_token
  const authTokenFull = {
    'type': type,
    'access_token': access_token
  };

  myWebSocket.next(authTokenFull)
  const req = 
  {
    'id': 19,
    'type': 'get_states'
  }
  myWebSocket.next(req)
}
