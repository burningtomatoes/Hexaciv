module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> / www.burningtomato.com */\n'
            },
            build: {
                src: ['src/settings.js', 'src/libs/inherit.js', 'src/game/loaders/loader.js',
                    'src/game/entities/entity.js', 'src/graphics/renderers/renderer.js',
                    'src/game/entities/fighters/fighter.entity.js', 'src/**/*.js'],
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};