 Mittens!
 ===
 
![Imgur](http://i.imgur.com/clVg24l.png)

A grandmother-proof interface for Sick-Beard, CouchPotato, Headphones, and SABnzbd.

We want Mittens to be a simple and consistant interface to manage your media. As it stands, the interfaces for sb, cp, etc... are good, but it's difficult to teach the common roommate about ports and interfaces.

Our Goal:
  
  - Node.js Server that interfaces with providers 
   - Provides security by only opening 1 port to access
   - A unified API that just works.
   - Allows expansion into Android / Apple / BBos apps
  - Ember.js Client application to make every platform buttery smooth


How to Run:

  - Put client in a web accessable directory
  - run node server/app.js (we don't know what we're doing yet)
  - Move server/config.js.sample to server/config.js
  - point browser to 'client/index.html'
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
