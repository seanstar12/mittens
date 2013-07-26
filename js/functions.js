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
    console.log($('#searchBox').val());
    search.term($('#searchBox').val());
   });
})();
