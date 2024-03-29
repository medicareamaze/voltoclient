/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import './Logo.css';
import { Image } from 'semantic-ui-react';
import MinimizableWebChat from '../../../../components/BotWidget/MinimizableWebChat';

import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';

const messages = defineMessages({
  site: {
    id: 'Site',
    defaultMessage: 'Site',
  },
  plonesite: {
    id: 'Plone Site',
    defaultMessage: 'Plone Site',
  },
});
const divStyle = {
  display: 'flex',
  alignItems: 'center'
};
/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = ({ intl }) => (
  <div  style={divStyle}>
  <Link  to="/" title={intl.formatMessage(messages.site)}>
    <Image
      src={LogoImage}
      alt={intl.formatMessage(messages.plonesite)}
      title={intl.formatMessage(messages.plonesite)}
      height={64}
    />
    
  </Link>
  <div>
  <h4>MedicareAmaze</h4>
  
  </div>
  <MinimizableWebChat />
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Logo.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Logo);
