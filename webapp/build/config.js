module.exports = {
  css: {
    src: ['../css/**/*.+(css|less|styl|stylus|sass|scss)', '!../css/**/*.min.*'],
    dest: '../css'
  },
  img: {
    src: '../img/**/*.**',
    dest: '../img'
  },
  html: {
    src: ['../WEB-INF/view/**/*.html', '!../WEB-INF/view/part/*.html'],
    dest: '../WEB-INF/view/',
    watch: '../WEB-INF/view/part/*.html'
  },
  js: {
    src: ['../js/**/*.js', '!../js/**/*.min.*','!../js/+(libs|vendor)/**/*.js'],
    dest: '../js'
  },
  clean: {
    src: ['../+(js|css)/**/*.min.**', '!../js/+(libs|vendor)/**/*.js']
  },
  watch: {
    src: '../+(js|css)/**/*.!(min)**'
  },
  server: {
    src: ['../+(js|css)/**/*.min.**', 'WEB-INF/**/*.html']
  }
}
