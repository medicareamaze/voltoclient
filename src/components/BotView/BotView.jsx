/**
 * Faq view.
 * @module components/FaqView/FaqView
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Container,List,Icon } from 'semantic-ui-react';
import Collapsible from 'react-collapsible';
//import ReactWebChat, { createDirectLine, createStyleSet } from 'botframework-webchat';
//import './BotView.css';
import './PortalWebChat.css';

/**
 * FaqView class.
 * @class FaqView
 * @extends Component
 */

class BotView extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    items: [],
  };
  constructor(props) {
    super(props);    
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    //this.props.getFaq();
    this.setState({ WebChat: require('./WebChat').WebChat });
    let obj = require('botframework-webchat')
    this.setState({
    styleSet: obj.createStyleSet({
        backgroundColor: 'Transparent'
      })
    });
  
    this.setState({ showChat: true });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { state: {
       WebChat,     
      styleSet,
      showChat,
    } } = this;
    return (
     
      <Container id="page-faq">
     
        <Helmet title="FAQ" />
        
        <div className="container">
          <article id="content">
            <header>
              <h1 className="documentFirstHeading">{this.props.content.title}</h1>
              
          
            </header>
            <section id="content-core">  
              <div>
                {
                        showChat ?
                        <Container id="chat">
                        <WebChat             
                          className="react-web-chat"export class  WebChat
                        />
                        </Container>
                        : 
                        'Loading Chat'
                }   
                </div>
           
            
           </section>
          </article>
         
        </div>
     
     
      </Container>
     
    );
  }
}

export default BotView;