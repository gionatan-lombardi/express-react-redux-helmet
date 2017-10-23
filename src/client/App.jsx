import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Intro from './Intro';
import Aside from './Aside';
import Editorial from './Editorial';

const fetchData = require('../server/fetch-data');

const components = {
  Intro,
  Aside,
  Editorial,
};

class Root extends Component {
  navigationHandler(evt) {
    evt.preventDefault();
    fetchData(`/${evt.currentTarget.href.split('/').slice(3).join('/')}`)
      .fetchPage()
      .then(json => this.props.pageInit(json));
  }

  renderHeader() {
    const { appShell } = this.props;
    const menu = (
      <ul>
        {appShell.menu.items.map((menuVoice, index) => (<li key={`menu-item-${index}`} ><a href={menuVoice.link} onClick={evt => this.navigationHandler(evt)}>{menuVoice.label}</a></li>))}
      </ul>
    )
    return menu;
  }

  renderModules() {
    const { modules } = this.props.page;
    return (
      <div className="modules-wrapper">
        {modules.map((module, index) => {
          const ModuleName = components[module.type];
          return <ModuleName data={module} key={`module-${module.type}-${index}`} />
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet
          title={this.props.page.meta.title}
          meta={[
            { name: 'description', content: this.props.page.meta.description },
          ]}
        />
        <header>
          {this.renderHeader()}
        </header>
        <main className="page-wrapper">
          <h1>{this.props.page.meta.title}</h1>
          {this.renderModules()}
        </main>
      </div>
    );
  }
}

Root.propTypes = {
  appShell: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  pageInit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ appShell, page }) => ({ appShell, page });
const mapDispatchToProps = dispatch => ({
  pageInit: json => dispatch({type: 'PAGE_INIT', page: json }),
});

const ConnectedRoot = connect(mapStateToProps, mapDispatchToProps)(Root);

const App = () => (
  <div>
    <Helmet
      htmlAttributes={{lang: 'en', amp: undefined}} // amp takes no value
      titleTemplate='%s | React App'
      titleAttributes={{itemprop: 'name', lang: 'en'}}
      meta={[
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      ]}
    />
    <Route path="/" component={ConnectedRoot} />
  </div>
);

export default App;
