var cP = {
  active: 0,
  port: '',
  api: '',

  search: function(term) {
    $.ajax({
      type:'GET',
      dataType: 'jsonp',
      url: url+':'+cPport+'/api/'+cPapi+'/movie.search/?callback_func=cP.callBack&q='+encodeURIComponent(term)
    }).done(function(data){
      console.log('Couch Potato Search Finished');
    });
  },

  callBack: function(data,context) {
    data.title = 'Movies';
    console.log(data);
    console.log('Searched Cp');
    search.stack(Handlebars.templates.cPListView(data), $('#stash'));
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
    $('#stash').html(Handlebars.templates.progress());
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
    $('#progressBar').attr('style','width:'+width+'%');
    
    if (width == 100){
      setTimeout(function(){
        $('#progressContainer').fadeOut(700);
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
