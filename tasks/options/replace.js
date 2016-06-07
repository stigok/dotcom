module.exports = {
  dist: {
    options: {
      patterns: [
        {
          match: 'js-extension',
          replacement: 'min.js'
        },
        {
          match: 'api-endpoint',
          replacement: 'http://tumblr.api.stigok.com:8081'
        }
      ]
    },
    files: [
      {src: '<%= path.dist %>/index.html', dest: '<%= path.dist %>/index.html'},
      {src: '<%= path.dist %>/js/snippetshow.min.js', dest: '<%= path.dist %>/js/snippetshow.min.js'}
    ]
  },
  dev: {
    options: {
      patterns: [
        {
          match: 'js-extension',
          replacement: 'js'
        },
        {
          match: 'api-endpoint',
          replacement: 'http://tumblr.api.stigok.com:8081'
        }
      ]
    },
    files: [
      {src: '<%= path.dist %>/index.html', dest: '<%= path.dist %>/index.html'},
      {src: '<%= path.dist %>/js/snippetshow.js', dest: '<%= path.dist %>/js/snippetshow.js'}
    ]
  }
};
