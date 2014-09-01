module.exports = function(grunt){

    "use strict";
   require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: {

            options: {
              // Task-specific options go here.
            },

            // prefix the specified file
            single_file: {
              options: {
                // Target-specific options go here.
              },
              src: 'library/css/style.css',
              dest: 'library/css/style.css'
            }
        },

        cssc: {
            build: {
                options: {
                    sortSelectors: true,
                    lineBreaks: true,
                    sortDeclarations:true,
                    consolidateViaDeclarations:false,
                    consolidateViaSelectors:false,
                    consolidateMediaQueries:false
                },
                files: {
                    'library/css/style.css': 'library/css/style.css'
                }
            }
        },

        cssmin: {
            build: {
                src: 'library/css/style.css',
                dest: 'library/css/style.css'
            }
        },

        sass: {
            build: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'library/css/style.css': 'library/scss/style.scss'
                }
            }
        },

        watch: {
            js: {
                files: ['library/js/scripts.js', 'library/js/particle.js'],
                tasks: ['concat','uglify']
            },
            css: {
                files: ['library/scss/**/*.scss'],
                tasks: ['buildcss']
            }
        },

        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['library/js/scripts.js', 'library/js/particle.js'],
                dest: 'library/js/scripts-combined.js',
            }
        },

        uglify: {
            build: {
                files: {
                    'library/js/scripts.min.js': ['library/js/scripts-combined.js']
                }
            }
        }

    });

    grunt.registerTask('default',   []);
    grunt.registerTask('buildcss',  ['sass', 'autoprefixer']);

};