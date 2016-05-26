module.exports = {
  options: {
    sourceMap: false,
    presets: ['es2015']
  },
  build: {
    files: [
      {expand: true, cwd: '<%= path.src %>', src: '**/*.js', dest: '<%= path.tmp %>'}
    ]
  }
};
