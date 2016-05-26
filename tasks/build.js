module.exports = function (grunt) {
  grunt.registerTask('build', [
    'clean',
    'less',
    'babel:build',
    'uglify:dist',
    'copy:dist',
    'copy:vendor',
    'replace:dist',
    'growl:build',
    'clean:tmp'
  ]);

  grunt.registerTask('build-dev', [
    'less',
    'babel:build',
    'uglify:dev',
    'copy',
    'replace:dev',
    'growl:build',
    'clean:tmp'
  ]);
};
