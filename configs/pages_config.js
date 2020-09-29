 'use strict';

const _entries = {
  core_css: './app/assets/scss/core.scss',
  core_js: './app/assets/js/core.js',
  demo_select2: './app/assets/js/demo/demo_select2.js',
  demo_calendar: './app/assets/js/demo/demo_calendar.js',
};

const _page_options = [{
    title: 'Main Page',
    template: './app/index.hbs',
    inject: 'body',
    filename: 'index.html',
    chunks: ['demo_select2']
  },{
    title: 'Calendar',
    template: './app/calendar.hbs',
    inject: 'body',
    filename: 'calendar.html',
    chunks: ['demo_calendar']
  },

];

class PagesConfig {
  static get entries() {
    return _entries;
  }

  static get page_options() {
    return _page_options;
  }
}

module.exports = PagesConfig;