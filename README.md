# Dashboards

This application allows you to build personalized dashboards using drag &amp; drop. Dashboards consists out of widgets
that are placed on the board. Widgets are simple to implement, so anyone can build a widget for his own dashboard.

### Technology Stack 

Front-end:
* [CxJS](https://cxjs.io)
* [React](https://https://facebook.github.io/react/)
* [Babel](https://babeljs.io/)
* [webpack](https://webpack.js.org/)

Back-end:
* [Firebase](https://firebase.google.com/)

Experimental Browser Features:

* [`display: grid`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
* [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

These features are not yet fully supported in all browsers.

### Getting Started

Clone the repository and install packages using `yarn install` or `npm install`.

To start the application on your machine, run:

```
npm start
```

To build the application for deployment, run:

```
npm run build
```

### Contributing

We would be very happy to accepts PRs, especially for new widgets. Widgets are defined inside the `app/widgets` folder 
and that is probably the best place to start experimenting with the app.  

### Deployment

The `master` branch is continuously deployed to [dashboards.cxjs.io](https://dashboards.cxjs.io) 
using [Netlify](https://www.netlify.com/). 

### License

This project is licensed under MIT License, however, please note that [CxJS](https://cxjs.io) is free 
for non-commercial projects only. 
