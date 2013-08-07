Mittens!
===
 
![Imgur](http://i.imgur.com/UhjQot1.png)

A grandmother-proof interface for Sick-Beard, CouchPotato, Headphones, and SABnzbd.

We want Mittens to be a simple and consistant interface to manage your media. As it stands, the interfaces for sb, cp, etc... are good, but it's difficult to teach the common roommate about ports and interfaces.

Our Goal:
  
  - Node.js Server that interfaces with providers 
   - Provides security by only opening 1 port to access
   - A unified API that just works.
   - Allows expansion into Android / Apple / BBos apps
  - Ember.js Client application to make every platform buttery smooth


How to Run:
  - install node moudles ( express, socket.io, and sqlite3 ) [npm install {each one}]
  - run node server/app.js (we don't know what we're doing yet)
  - load up 'localhost:8083';
  - we're working on the settings page. it'll be up when it's ready.
    - If you really want to run it, add configs with these in your browser.
      var socket = io.connect('127.0.0.1:8083'); 
      socket.emit('addProviders',[{name:'CouchPotato',host:'',port:'',api:''},{name:'SickBeard',host:'',port:'',api:''}]);
  - Laugh at the progress that hasn't been made yet!

What Doesn't Work:

  - You can't view any of your media indexed with SB or CP.
  - You can't access SAB.
  - It can't print money.

What I want to Eventually Work:

  - Add Show Manager
    - Season Browser 
    - Episode Browser
      - Add to viewing queue
  - Add Movie Manager
    - Add / Remove Movies
    - Add to Queue
  - Add Headphones Manager
  - Add SAB Manager
    - View in Progress Downloads
    - Add files
    - View Logs
  - XBMC remote   
    - Manage multiple hosts
    - Pause / play / etc...
    - Update library
