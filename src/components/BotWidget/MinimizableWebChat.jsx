import React from 'react';
//import { createStore, createStyleSet } from 'botframework-webchat';

//import WebChat from './WebChat';
import './fabric-icons-inline.css';
import './MinimizableWebChat.css';
import { Choice } from 'adaptivecards';
import * as sipjs from 'sip.js';
import Tooltip from '@material-ui/core/Tooltip';


export default class  extends React.Component {
  userAgent = new sipjs.UA({
    uri: '1001@freeswitch.isals.com',
    transportOptions: {
      wsServers: ['wss://freeswitch.isals.com:7443']
    },
    authorizationUser: '1001',
    password: '197205'
  });
  session;
  acceptSession;
  constructor(props) {
    super(props);
    this.handleRestartButtonClick = this.handleRestartButtonClick.bind(this);
    this.handleAgentButtonClick = this.handleAgentButtonClick.bind(this);
    this.handleFetchToken = this.handleFetchToken.bind(this);
    this.handleMaximizeButtonClick = this.handleMaximizeButtonClick.bind(this);
    this.handleMinimizeButtonClick = this.handleMinimizeButtonClick.bind(this);
    this.handleSwitchButtonClick = this.handleSwitchButtonClick.bind(this);

    // const store = createStore({}, ({ dispatch }) => next => action => {
    //   if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
    //     setTimeout(() => {
    //       dispatch({
    //         type: 'WEB_CHAT/SEND_EVENT',
    //         payload: {
    //           name: 'webchat/join',
    //           value: {
    //             language: window.navigator.language
    //           }
    //         }
    //       });
    //     }, 1000);
    //   } else if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
    //     if (action.payload.activity.from.role === 'bot') {
    //       this.setState(() => ({ newMessage: true }));
    //     }
    //   }

    //   return next(action);
    // });

    this.state = {
      minimized: false,
      newMessage: false,
      side: 'right',
      store:null,      
      styleSet:null,
      token: null,
      showChat:false,
      WebChat:null,
      user:null
    };

    //sip.js code


    

    this.userAgent.on('invite', (session) => 
        {
        this.acceptSession = session
        this.acceptSession.accept();
        let remoteVideo=document.getElementById('remoteVideo')  ;
        const localVideo= document.getElementById('localVideo')  ;
        
      
        const that =this;
        this.acceptSession.on('trackAdded', function() {

        
      
        // const that =this;
          // We need to check the peer connection to determine which track was added

          let pc = that.acceptSession.sessionDescriptionHandler.peerConnection;

          // Gets remote tracks
          let  remoteStream = new MediaStream();
          pc.getReceivers().forEach(function(receiver) {
            remoteStream.addTrack(receiver.track);
          });
          remoteVideo.srcObject = remoteStream;
          remoteVideo.play();

            // Gets local tracks
            var localStream = new MediaStream();
            pc.getSenders().forEach(function(sender) {
              if(typeof sender.track == typeof MediaStream)
              localStream.addTrack(sender.track);
            });
             localVideo.srcObject = localStream;
             localVideo.play();
          });

        }

    );
  }

  async handleFetchToken() {
    if (!this.state.token) {
     //const res = await fetch('https://webchat-mockbot.azurewebsites.net/directline/token', { method: 'POST' });
     //const res={'token':'3auZvXAoMFo.cwA.PtI.lbf5AjP4yX4QGbh077yQVoLB_JLLA4WqMOklZ5q7rPE'}
      //const { token } = await res.json();
      const res = '{"conversationId":"DHtYisI40sjCRK8cnxP6bt-g","token":"ew0KICAiYWxnIjogIlJTMjU2IiwNCiAgImtpZCI6ICJSNHZYc3c3bGFUbjFaa25SUUJ1VlBGWno3WE0iLA0KICAieDV0IjogIlI0dlhzdzdsYVRuMVprblJRQnVWUEZaejdYTSIsDQogICJ0eXAiOiAiSldUIg0KfQ.ew0KICAiYm90IjogIndlYmNoYXQtbW9ja2JvdCIsDQogICJzaXRlIjogIldZREl5S3dBWkN3IiwNCiAgImNvbnYiOiAiREh0WWlzSTQwc2pDUks4Y254UDZidC1nIiwNCiAgInVzZXIiOiAiZGxfOWVhMjBmYzdhZmJkYzkzODNkMWI0NDhjZjk1ODg5MmUiLA0KICAib3JpZ2luIjogWw0KICAgICJodHRwczovL3dlYmNoYXQtcGxheWdyb3VuZC5henVyZXdlYnNpdGVzLm5ldCIsDQogICAgImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsDQogICAgImh0dHBzOi8vbWljcm9zb2Z0LmdpdGh1Yi5pbyIsDQogICAgImh0dHBzOi8vY29tcHVsaW0uZ2l0aHViLmlvIiwNCiAgICAiaHR0cHM6Ly9iZnh3ZWJjaGF0ZnVsbGJ1bmRsZS5henVyZXdlYnNpdGVzLm5ldCIsDQogICAgImh0dHA6Ly9sb2NhbGhvc3Q6NTA4MCINCiAgXSwNCiAgIm5iZiI6IDE1NTEyNDE5NjMsDQogICJleHAiOiAxNTUxMjQ1NTYzLA0KICAiaXNzIjogImh0dHBzOi8vZGlyZWN0bGluZS5ib3RmcmFtZXdvcmsuY29tLyIsDQogICJhdWQiOiAiaHR0cHM6Ly9kaXJlY3RsaW5lLmJvdGZyYW1ld29yay5jb20vIg0KfQ.Oweg__iVREJZ8vA9ZEuRd8Mz8ThavqVmTqhkNkd_2WSOU4fUc84wCFr5Dc6IomKW2vsN5K3PdvFM9qO2Rm7YH9VUcdhvrTjwaSCyiaXi6ZiLJenJ9AHhlKeSIYf3ny3J-OXv4TT72ZJ488cUPs5s7p8qf6jwJ16qsIN4DE0OSEdrTjZcjwqo-9m2IVR4ZXvvumFfR8Rg3BIX2jUPNacO0xmaaoaG3Wn20ezrYlwyFWPm-RzZkiacuOxFJKuVkXcKKeBavhSGqbuwTO7Q07b8Gze7EWJjCGlBbJvrGVvgciSKx4ZwR7YcG0W9Jk8N2c--4k0UMwGRmS138E_ExDGIHg","expires_in":3600}'
      const { token } = res.json();
      // const { token } = '3auZvXAoMFo.cwA.PtI.lbf5AjP4yX4QGbh077yQVoLB_JLLA4WqMOklZ5q7rPE'

       this.setState(() => ({ token }));
    }
  }

  handleRestartButtonClick() {
    this.state.store.dispatch({
      type: 'WEB_CHAT/SEND_MESSAGE',
      payload: { text: 'restart'  }
    });
  }
  handleAgentButtonClick() {
    this.state.store.dispatch({
      type: 'WEB_CHAT/SEND_MESSAGE',
      payload: { text: 'help'  }
    });
    

    this.session = this.userAgent.invite('1002@freeswitch.isals.com',
        {
          sessionDescriptionHandlerOptions: {
              constraints: {
                  audio: true,
                  video: false
              }
          }
      }
    );
    let remoteVideo=document.getElementById('remoteVideo');
    const localVideo= document.getElementById('localVideo');
    
  
    const that =this;
    this.session.on('trackAdded', function() {

    
  
    // const that =this;
      // We need to check the peer connection to determine which track was added

      let pc = that.session.sessionDescriptionHandler.peerConnection;

      // Gets remote tracks
      let  remoteStream = new MediaStream();
      pc.getReceivers().forEach(function(receiver) {
        remoteStream.addTrack(receiver.track);
      });
      remoteVideo.srcObject = remoteStream;
      remoteVideo.play();

        // Gets local tracks
        var localStream = new MediaStream();
        pc.getSenders().forEach(function(sender) {
          localStream.addTrack(sender.track);
        });
         localVideo.srcObject = localStream;
         localVideo.play();
      });

    
  }

  handleMaximizeButtonClick() {
    this.setState(() => ({
      minimized: false,
      newMessage: false
    }));
  }

  handleMinimizeButtonClick() {
    this.setState(() => ({
      minimized: true,
      newMessage: false
    }));
  }

  handleSwitchButtonClick() {
    this.setState(({ side }) => ({
      side: side === 'left' ? 'right' : 'left'
    }));
  }
  componentDidMount() {
   // WebChat = require('./WebChat');
  //  import('./WebChat').then(obj=> {
  //   this.setState({ WebChat: obj.WebChat });
  //     this.setState({ showChat: true });
  //     }
  //   )

  let user = {    
    id:   Math.floor((Math.random() * 10000000) + 1).toString(),
    name: 'Visitor'
  }

    this.setState({ WebChat: require('./WebChat').WebChat });
    let obj = require('botframework-webchat')
    this.setState({
    styleSet: obj.createStyleSet({
        backgroundColor: 'Transparent'
      })
    });
    let store = obj.createStore({}, ({ dispatch }) => next => action => {
      if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
        setTimeout(() => {
          dispatch({
            type: 'WEB_CHAT/SEND_EVENT',
            payload: {
            name: 'newclientconnected',
              // value: {
              //   language: window.navigator.language
              // }
            value: JSON.stringify(user),
            }
          });
        }, 1000);
      } else if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        if (action.payload.activity.from.role === 'bot') {
          this.setState(() => ({ newMessage: true }));
        }
      }

      return next(action);
    });
    
    this.setState({ store: store });
    this.setState({ user: user });
    this.setState({ showChat: true });
    
  }

  render() {
    const { state: {
      minimized,
      newMessage,
      side,
      store,
      styleSet,
      token,
      showChat,
      WebChat,
      user

    } } = this;

    return (
      <div className="minimizable-web-chat">
        {
          minimized ?
            <button
              className="maximize"
              onClick={ this.handleMaximizeButtonClick }
            >
              <span className={ token ? 'ms-Icon ms-Icon--MessageFill' : 'ms-Icon ms-Icon--Message' } />
              {
                newMessage &&
                  <span className="ms-Icon ms-Icon--CircleShapeSolid red-dot" />
              }
            </button>
          :
            <div
              className={ side === 'left' ? 'chat-box left' : 'chat-box right' }
            >
              <header>
              
                <div className="filler" />
                <Tooltip title="Talk To Agent" placement="left">
                <button
                  className="friend"
                  onClick={ this.handleAgentButtonClick }
                > 
                 <span className="ms-Icon ms-Icon--AddFriend" />
                 </button>
                 </Tooltip>
                 <button
                  className="refresh"
                  onClick={ this.handleRestartButtonClick }
                
                >
                  <span className="ms-Icon ms-Icon--Refresh" />
                </button>
                <button
                  className="switch"
                  onClick={ this.handleSwitchButtonClick }
                
                >
                  <span className="ms-Icon ms-Icon--Switch" />
                </button>
                <button
                  className="minimize"
                  onClick={ this.handleMinimizeButtonClick }
                >
                  <span className="ms-Icon ms-Icon--ChromeMinimize" />
                </button>
                <audio id="remoteVideo" width="0" height="0" playsinline={true}></audio>
                <audio id="localVideo" width="0" height="0" playsinline={true}>  muted></audio>
              </header>
             
              {
              showChat ?
              <WebChat
                className="react-web-chat"export class  WebChat
                onFetchToken={ this.handleFetchToken }
                store={ store }
                styleSet={ styleSet }
                token={ token }
                user = { user }

              />
              : 
              'Loading Chat'
              }
             
            </div>
            
        }
      </div>
    );
  }
}
