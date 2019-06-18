import memoize from 'memoize-one';
import React from 'react';
import ReactWebChat, { createDirectLine, createStyleSet } from 'botframework-webchat';

import './WebChat.css';
export class WebChat extends React.Component {
  directLine =   createDirectLine({ token:'2Hm4D6FkXbA.cwA.O68.abl1MOHLN0MmXkUyMmGlHBE72KBQUvQ2Kmnhel3BF3A' }) 
  // user = {    
  //    id:   Math.floor((Math.random() * 10000000) + 1).toString(),
  //    name: 'Visitor'
  // }

  constructor(props) {
    super(props);

   // this.createDirectLine = memoize(token => createDirectLine({ token }));

    this.state = {
      styleSet: createStyleSet({
        backgroundColor: 'Transparent'
      })
    };
  }

  componentDidMount() {
   // !this.props.token && this.props.onFetchToken();
   }

  render() {
    const {
      props: { className, store, user },
      state: { styleSet }
    } = this;

    return (
      //token ?
        <ReactWebChat
          className={ `${ className || '' } web-chat` }
          userID = {user.id}
          username = {user.name}
          directLine={  this.directLine }            
          store={ store }
          styleSet={ styleSet }
          
        />
      // :
      //   <div className={ `${ className || '' } connect-spinner` }>
      //     <div className="content">
      //       <div className="icon">
      //         <span className="ms-Icon ms-Icon--Robot" />
      //       </div>
      //       <p>Please wait while we are connecting.</p>
      //     </div>
      //   </div>
    );
  }
}
