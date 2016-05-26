module.exports = {
  options: {
    banner: '/*! snippetshow, bro <%= today %> */\n',
    footer: '\n/* watch the matrix tonight */' +
            '\n/* 1x10v3<21 */',
    beautify: true,
    screwIE8: true,
    mangle: false
  },
  dist: {
    options: {
      beautify: false
    },
    files: {
      '<%= path.dist %>/js/snippetshow.min.js': [
        '<%= path.tmp %>/**/*.js', '!**/app.js', '<%= path.tmp %>/app.js'
      ]
    }
  },
  dev: {
    files: {
      '<%= path.dist %>/js/snippetshow.js': [
        '<%= path.tmp %>/**/*.js', '!**/app.js', '<%= path.tmp %>/app.js'
      ]
    }
  }
};
