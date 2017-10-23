/* eslint-env jest */
/* global jasmine */

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const request = require('request');

const middleware = require('../src/server/middleware-react-helmet.js');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1 * 60 * 1000;

const webpackDevConfig = require('../src/server/webpack-dev-config.js');

webpackDevConfig[0].entry[2] = path.join(__dirname, '../src/client/index.js');
webpackDevConfig[1].entry[2] = path.join(__dirname, '../src/client/App.jsx');
webpackDevConfig[2].entry[2] = path.join(__dirname, '../src/client/reducer.js');

describe('middleware run test', () => {
  let server;
  let port;
  beforeAll((done) => {
    const app = express();
    app.use(middleware({
      webpackDevConfig,
      webpackDevBuildCallback: () => done(),
    }));
    server = http.createServer(app);
    server.listen(() => {
      port = server.address().port;
    });
  });

  it('sould server a static page with the boundle script', (done) => {
    fetch.mockResponses(
      [JSON.stringify({
        menu: {
          items: [
            {
              label: 'home',
              link: '/static/home',
            },
          ],
        },
      })],
      [JSON.stringify({
        meta: {
          title: 'Homepage',
          description: 'Homepage of our App',
        },
        modules: [{
          type: 'Intro',
          title: 'Hello, this is the Homapage',
          subtitle: 'Wellcome my guest.',
          abstract: 'Lorem ipsum',
        }],
      })],
    );

    request.get(`http://localhost:${port}/static/`, (err, res, body) => {
      expect(err).toBeFalsy();
      expect(body).toContain('<div id="app">');
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });
});

