/**
 * Full view component.
 * @module components/theme/View/FullView
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Container, Image } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import MinimizableWebChat from '../BotWidget/MinimizableWebChat'
//import ReactWebChat, { createDirectLine } from 'botframework-webchat';
/**
 * Full view component class.
 * @function FullView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const FullView = ({ content }) => (
  <Container className="view-wrapper">
    <Helmet title={content.title} />
    {/* <ReactWebChat
         
          directLine={  createDirectLine({ token:'3auZvXAoMFo.cwA.PtI.lbf5AjP4yX4QGbh077yQVoLB_JLLA4WqMOklZ5q7rPE' }) }            
         
          
        /> 
        <MinimizableWebChat />*/}
    <article id="content">
      <header>
        <h1 className="documentFirstHeading">{content.title}</h1>
        {content.description && (
          <p className="documentDescription">{content.description}</p>
        )}
      </header>
      <section id="content-core">
        {content.items.map(item => (
          <article key={item.url}>
            <h2>
              <Link to={item.url} title={item['@type']}>
                {item.title}
              </Link>
            </h2>
            {item.image && (
              <Image
                clearing
                floated="right"
                alt={item.image_caption ? item.image_caption : item.title}
                src={item.image.scales.thumb.download}
              />
            )}
            {item.description && <p>{item.description}</p>}
            {item.text &&
              item.text.data && (
                <p dangerouslySetInnerHTML={{ __html: item.text.data }} />
              )}
          </article>
        ))}
      </section>
    </article>
  </Container>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
FullView.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Child items of the object
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Title of the item
         */
        title: PropTypes.string,
        /**
         * Description of the item
         */
        description: PropTypes.string,
        /**
         * Url of the item
         */
        url: PropTypes.string,
        /**
         * Image of the item
         */
        image: PropTypes.object,
        /**
         * Image caption of the item
         */
        image_caption: PropTypes.string,
        /**
         * Type of the item
         */
        '@type': PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default FullView;