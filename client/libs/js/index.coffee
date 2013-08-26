## This file is your main application file
## You will require all parts of your application here

window.Mittens = require './app'

Mittens.Store = require './store'

Mittens.ApplicationController = require './controllers/application'
Mittens.ApplicationView = require './views/application'

Mittens.SearchBoxComponent = require './components/searchBox'

Mittens.SearchItemController = require './controllers/searchItem'
Mittens.SearchItemView = require './views/searchItem'

Mittens.SearchCategoryView = require './views/searchCategory'
Mittens.SearchField = require './views/searchField'

Mittens.Movie = require './models/movie'
Mittens.Provider = require './models/provider'

Mittens.SettingsRoute = require './routes/settings'
Mittens.SettingsController = require './controllers/settings'

##
# Sample setup
##

# Mittens.ThreadEditController = require('./controllers/thread/edit_controller')
# Mittens.ThreadIndexController = require('./controllers/thread/index_controller')
# Mittens.ThreadNewController = require('./controllers/thread/new_controller')
#
# Mittens.User = require('./models/user')
#
# Mittens.ThreadEditRoute = require('./routes/thread/edit_route')
# Mittens.ThreadIndexRoute = require('./routes/thread/index_route')
# Mittens.ThreadNewRoute = require('./routes/thread/new_route')

require('./routes')
