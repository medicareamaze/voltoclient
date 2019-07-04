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
import { getFaq } from '../../actions';
import './sass/main.css';

/**
 * FaqView class.
 * @class FaqView
 * @extends Component
 */
@connect(
  state => ({
    items: state.faq.items,
  }),
  dispatch => bindActionCreators({ getFaq }, dispatch),
)
class FaqView extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getFaq: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        faqtype:PropTypes.string,
        text:PropTypes.string,
      }),
    ),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    items: [],
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getFaq();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Container id="page-faq">
        <Helmet title="FAQ" />
        <div className="container">
          <article id="content">
            <header>
              <h1 className="documentFirstHeading">FAQ</h1>
            </header>
            <section id="content-core">     
            <List divided relaxed> 
            {Object.keys(this.props.items).map(key=>{
                return (
               
                    <Collapsible 
                    trigger={key}
                            >
                     {this.props.items[key].map(item => (
                        <article className="tileItem" key={item['@id']}>
                        <Collapsible 
                            trigger={
                              <p className="tileHeadline">{item.title}</p>}
                        >
                                {item.description && (
                                    <div className="tileBody">
                                    <span className="description">{item.description}</span>
                                    {item.text && item.text.data && item.text.data.replace(/<[^>]+>/g, '')!==''? (
                                    <Collapsible trigger="Read More"
                                     triggerClassName="CustomTriggerCSS"
                                     triggerOpenedClassName="CustomTriggerCSS--open"
                                    >
                                  

                                           {item.text &&
                                            item.text.data && (
                                              <p dangerouslySetInnerHTML={{ __html: item.text.data }} />
                                            )}



                                    </Collapsible>
                                    ):
                                    null}
                                    </div>
                                )}
                               
                        <div className="visualClear" />
                        </Collapsible>
                        </article>
                    ))}
                     <div className="visualClear" />
                   </Collapsible>
                );

               
            })
            }  
                
             </List>
            </section>
          </article>
        </div>
      </Container>
    );
  }
}

export default FaqView;