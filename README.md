Hello, world!
=============

### Foreword

This repo contains the source code for my personal website at [bnguyensn.com](https://bnguyensn.com). Everything is public except for the .env file which is not shared ([see why](https://github.com/motdotla/dotenv#should-i-commit-my-env-file)).
 
The site is run on a [Node.js](https://nodejs.org/en/) server using the [Express](https://expressjs.com/) framework. [React](https://reactjs.org/) handles the user interface and [Webpack](https://webpack.js.org/) is the bundler.
 
The site is continuously developed. It serves as my code playground as well as a platform for me to explore new ideas. I try to document all code as clearly as possible, linking to further reading materials whenever applicable. But do let me know if you think something can be improved!
 
I do hope you find something useful or learn a thing or two here. I'm available on [Twitter](https://twitter.com/bnguyensn) if you have questions!
 
Keep on hacking!
 
Binh Nguyen

### Learning Points

Gathered below are good practices found on the web. All points come with source links. 

#### 1. Performance

##### 1.1 CSS animation

From this [article](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/) by [Paul Lewis](https://www.html5rocks.com/profiles/#paullewis) and [Paul Irish](https://www.html5rocks.com/profiles/#paulirish), stick to these 4 functions whenever possible:

```css
transform: translate(x, y);
transform: scale(x);
transform: rotate(x);
opacity: x;
```

### TBD
