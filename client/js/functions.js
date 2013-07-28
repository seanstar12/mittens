var cP = {
  active: 1,
  port: '',
  api: '',

  search: function(term) {
    $.ajax({
      type:'GET',
      dataType: 'jsonp',
      url:url+':'+cPport+'/api/'+cPapi+'/movie.search/?callback_func=cP.searchCallBack&q='+encodeURIComponent(term)
    }).done(function(data){
      console.log('Couch Potato Search Finished');
    });
  },
  
  add: function(movie) {
    $.ajax({
      type:'GET',
      dataType: 'jsonp',
      url:url+':'+cPport+'/api/'+cPapi+ '/movie.add/?callback_func=cP.addCallBack&identifier='+
                movie.term+'&title='+movie.title
    }).done(function(data){
      console.log('Couch Potato Search Finished');
    });
  },

  addCallBack: function(data,context) {
    console.log('Cp Add Callback');
    console.log(data);

    if (data.success == true) {
      alert('Successfully Added');
    } else {
      alert('Movie Not Added');
    }
    //search.stack(Handlebars.templates.cPListView(data), $('#stash'));
  },

  searchCallBack: function(data,context) {
    data.title = 'Movies';
    console.log(data);
    search.stack(Handlebars.templates.cPListView(data), $('#stash'));
    
    $.each(data.movies, function(i,el){
      $('#'+this['imdb']).on('click', function(){
        $('#buttons_'+this['imdb']).toggle();
      }.bind(this));
    
      $('#cancel_'+this['imdb']).on('click', function(){
        $('#buttons_'+this['imdb']).toggle();
      }.bind(this));
  
      $('#add_'+this['imdb']).on('click', function(){
        cP.add({term:this['imdb'],title:this.original_title});
      }.bind(this));
    
    });
  }
}

var sB = {
  active: 1,
  port: '',
  api: '',

  search: function(term) {
    $.ajax({
      type:'GET',
      dataType: 'jsonp',
      url: url+':'+sBport+'/api/'+sBapi+'/?cmd=sb.searchtvdb&lang=en&name='+encodeURIComponent(term)
    }).done(function(data){
      console.log('Searched Sb');
      sB.searchCallBack(data);
    });
  },
  
  listShows: function(term) {
    $.ajax({
      type:'GET',
      dataType: 'jsonp',
      url: url+':'+sBport+'/api/'+sBapi+'/?cmd=shows&sort=name'
    }).done(function(data){
      console.log('Sb List Shows');
      sB.listShowsCallBack(data);
    });
  },
  
  listShowSeasons: function(term) {
    $.ajax({
      type:'GET',
      dataType: 'jsonp',
      url: url+':'+sBport+'/api/'+sBapi+'/?cmd=show.seasons&tvdbid='+term
    }).done(function(data){
      console.log('Sb List Show Seasons');
      sB.listShowSeasonsCallBack(data);
    });
  },

    
  listGetShow: function(term) {
    $.ajax({
      type:'GET',
      dataType: 'jsonp',
      url: url+':'+sBport+'/api/'+sBapi+'/?cmd=show|show.seasons&tvdbid='+term
    }).done(function(data){
      console.log('Sb List Show Seasons');
      sB.listGetShowCallBack(data);
    });
  },

  add: function(showId){
    $.ajax({
      type:'GET',
      dataType: 'jsonp',
      url: url+':'+sBport+'/api/'+sBapi+'/?cmd=show.addnew&tvdbid='+showId
    }).done(function(data){
      console.log('Searched Sb');
      sB.addCallBack(data);
    });
    
  },
  
  addCallBack: function(data){
    if (data.result == "success") {
      alert('Successfully Added: ' + data.data.name);
    } else if (data.result == "failure") {
      alert(data.message);
    }
  },

  listShowsCallBack: function(data){
    console.log(data);
    if (data.result == "success") {
      $('#stash').html(Handlebars.templates.sBListLibrary(data.data));
    }
  },
  
  listGetShowCallBack: function(data){
//    console.log(data);
    var mittData = {'totalEpisodes':'0','episodes':'0','seasons':[]};

    if (data.result == "success") {
   //   console.log(data.data['show.seasons']);
      $.each(data.data['show.seasons'].data, function(i, season){
        mittData.seasons[i] = {};
        mittData.seasons[i]['have'] = 0;
        $.each(season, function(y, episode){
          mittData.seasons[i]['season'] = 'Season '+i;
          mittData.seasons[i]['episodes'] = y;
          mittData.seasons[i][y] = episode;
          
          if (episode.status != 'Skipped') {
            mittData.episodes++;
            mittData.seasons[i]['have']++;
          }
          
          if (i == '0') {
            mittData.seasons[i]['season'] = 'Specials';
          }

          mittData.totalEpisodes++;
        });
      });
      mittData.show = data.data.show.data;
      console.log(mittData);
      $('#stash').html(Handlebars.templates.sBListSeasons(mittData));
    }
  },
  
  searchCallBack: function(data,context) {
    data.data.title = 'TV Shows';
    console.log(data.data);
    search.stack(Handlebars.templates.sBListView(data.data), $('#stash'));
    
    $.each(data.data.results, function(i,el){
      $('#'+this['tvdbid']).on('click', function(){
        $('#buttons_'+this['tvdbid']).toggle();
      }.bind(this));
    
      $('#cancel_'+this['tvdbid']).on('click', function(){
        $('#buttons_'+this['tvdbid']).toggle();
      }.bind(this));
  
      $('#add_'+this['tvdbid']).on('click', function(){
        sB.add(this['tvdbid']);
      }.bind(this));
    
    });
  }

}

var search = {
  count: 0,
  stackCount: 0,
  init: function(){
    this.count = this.stackCount = 0;
    $('#brandTag').html('.Search');
    $('#stash').html('');
  },
  term: function(term) {
    this.init();

    if (cP.active) {
      this.count++;
      cP.search(term);
    }
    if (sB.active) {
      this.count++;
      sB.search(term);
    }
  },
  stack: function(data, context){
    context.append(data);
    this.progress();
  },
  progress: function(){
    this.stackCount++;
    
    var width = (this.stackCount/this.count)*100;
    $('#loadBarProgress').attr('style','width:'+width+'%');
    
    if (width == 100){
      setTimeout(function(){
        $('#loadBarProgress').attr('style','width:0%');
      }, 700);
    }
  }
}

document.onLoad = (function(e){    
  $('#searchForm').on('submit', function(e){
    e.preventDefault();
    console.log($('#search').val());
    search.term($('#search').val());
  });
  $('#sickBeard').on('click', function(e){
    sB.listShows();
    console.log('here');
   });
})();
