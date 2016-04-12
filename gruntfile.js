
module.exports = function(grunt){

    // Project configuration
    grunt.initConfig({
        jshint:{
            all:['application.js']
        },
        concat:{
            dist:{
                src:[
                    'public/javascripts/src/initFile.js',
                    'public/javascripts/src/variablesFile.js','public/javascripts/src/Student.js',
                    'public/javascripts/src/endedFile.js'
                ],
                dest:'public/javascripts/ang-app.js'
            }
        },
        uglify:{
            dist:{
                src:'public/javascripts/ang-app.js',
                dest:'public/javascripts/ang-app.min.js'
            },
            options: {
                mangle: false
            }
        },
        shell:{
            multiple:{
                command:[
                    'rm public/javascripts/ang-app.js',
                    'mkdir -p public/javascripts/production',
                    'mv public/javascripts/ang-app.min.js public/javascripts/production/'
                ].join('&&')
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-shell');

    // Default task
    grunt.registerTask('default', ['jshint','concat', 'uglify', 'shell']);

}