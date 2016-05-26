module.exports = {
  development: {
    options: {
      banner: 'sshow fosho\n',
      paths: ['<%= path.src %>/css/'],
      compress: true,
      ieCompat: false
    },
    files: {
      '<%= path.src %>/css/theme.css': '<%= path.src %>/css/theme.less'
    }
  }
};
