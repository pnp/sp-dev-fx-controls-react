var gulp = require('gulp');
var sonarqubeScanner = require('sonarqube-scanner');

gulp.task('sonarqube', function(callback) {
  sonarqubeScanner({
    serverUrl : "https://sonarcloud.io",
    options : {}
  }, callback);
});
