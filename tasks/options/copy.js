module.exports = {
  js: {
    files: [
      {expand: true, src: ['<%= path.src %>/**/*.js'], dest: '<%= path.tmp %>'}
    ]
  },
  dist: {
    files: [
      {expand: true, cwd: '<%=path.src %>/', src: ['**/*.html', '!bower_components/**/*'], dest: '<%= path.dist %>/'},
      {expand: true, cwd: 'include/js/', src: '*.js', dest: '<%= path.dist %>/js/vendor/'},
      {src: '<%= path.src %>/css/theme.css', dest: '<%= path.dist %>/css/theme.css'}
    ]
  },
  dev: {
    files: [
      {expand: true, cwd: '<%= path.src %>/', src: ['api/**/*.json'], dest: '<%= path.dist %>/'}
    ]
  },
  vendor: {
    files: [
      //{
      //  expand: true,
      //  flatten: true,
      //  src: [
      //    'node_modules/normalize.css/normalize.css'
      //  ],
      //  dest: '<%= path.dist %>/css/vendor/'
      //},
      {
        expand: true,
        flatten: true,
        src: [
          'bower_components/showdown/dist/showdown.min.js',
          'bower_components/ng-showdown/dist/ng-showdown.min.js'
        ],
        dest: '<%= path.dist %>/js/vendor/'
      }
    ]
  }
};
