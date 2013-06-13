# Welcome to the Classy Games-Web repository! #
This is the web client side for the Classy Games... *game*. The Android application can be found at the [Classy Games repository](https://github.com/ScootrNova/ClassyGames), the web server back end code can be found at the [Classy Games-Server repository](https://github.com/ScootrNova/ClassyGames-Server), and the artwork files and such can be found at the [Classy Games-Resources repository](https://github.com/ScootrNova/ClassyGames-Resources).

The contents of the `public_html` directory is the only part of this project that should ever be directly uploaded to a web server.

## Important Security Notice ##
If you want to run this web app locally, you're going to have to do something potentially dangerous. Google Chrome blocks `HTTP POST` requests because this app attempts to make those requests to the Classy Games server, which resides at a URL that's not `localhost` or `127.0.0.1` (but is instead `http://classygames.net/`). 

There is a launch argument that you can supply to Google Chrome for it to disable this security feature: `--disable-web-security`. This is talked about in more detail [here on Stack Overflow](http://stackoverflow.com/questions/10143093/origin-is-not-allowed-by-access-control-allow-origin).