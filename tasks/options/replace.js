module.exports = {
  dist: {
    options: {
      patterns: [
        {
          match: 'js-extension',
          replacement: 'min.js'
        },
        {
          match: 'apiEndpoint',
          replacement: 'http://api.tumblr.stigok.com'
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
          match: 'apiEndpoint',
          replacement: 'http://tumblrapi.sshow-7/api/tumblr'
        }
      ]
    },
    files: [
      {src: '<%= path.dist %>/index.html', dest: '<%= path.dist %>/index.html'},
      {src: '<%= path.dist %>/js/snippetshow.js', dest: '<%= path.dist %>/js/snippetshow.js'}
    ]
  }
};
