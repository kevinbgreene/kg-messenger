/* global module:false */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        datetime: Date.now(),

        uglify: {

            options: {
                mangle: false,
                beautify: true
            },

            build: {

                files: {

                    'dist/js/kg.messenger.min.js': [

                        'dev/js/core/main.js',
                        'dev/js/messenger.js'
                    ]
                }
            }
        },

        watch: {

            main: {
                files: ['dev/js/**/*.js'],
                tasks: ['build'],
                options: {
                    nospawn: true,
                }
            },

            sass: {
                files: ['dev/sass/*.scss'],
                tasks: ['sass'],
                options: {
                    nospawn: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('build', ['uglify:build']);
};