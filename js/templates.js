(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['cPListView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, depth0.title, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"listView\">\n  ";
  stack1 = helpers.each.call(depth0, depth0.movies, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <h3>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <a class=\"listInfo\" id=\"";
  if (stack1 = helpers.imdb) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.imdb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n          <div class=\"title\">";
  if (stack1 = helpers.original_title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.original_title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n          <div class=\"subText\">";
  if (stack1 = helpers.year) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.year; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n          <div class=\"listExtra\"></div>\n        </a>\n        <div class=\"listAdd\" style=\"display:none;\" id=\"buttons_";
  if (stack1 = helpers.imdb) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.imdb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n          <span class=\"label label-important listCancelButton\" id=\"cancel_";
  if (stack1 = helpers.imdb) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.imdb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Cancel</span>\n          <span class=\"label label-success listAddButton\" id=\"add_";
  if (stack1 = helpers.imdb) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.imdb; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Add Movie</span>\n        </div>\n  ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.movies, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
templates['listView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <h3>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"listViewElm\">\n      <span class=\"listViewTitle\">";
  if (stack1 = helpers.original_title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.original_title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n      <span class=\"listViewYear\">";
  if (stack1 = helpers.year) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.year; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </li>\n  ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.title, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<span>Oj jessae</span>\n<ul class=\"listView\">\n  ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  });
templates['progress'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"progress mittensProgress\" id=\"progressContainer\">\n  <div class=\"bar\" id=\"progressBar\" style=\"width: 0%;\"></div>\n</div>\n";
  });
templates['sBListLibrary'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <a class=\"listInfo\" id=\"";
  if (stack1 = helpers.tvdbid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tvdbid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <span class=\"title\">";
  if (stack1 = helpers.show_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.show_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    <span class=\"subText\">";
  if (stack1 = helpers.quality) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.quality; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    <div class=\"listExtra\"></div>\n  </a>\n";
  return buffer;
  }

  buffer += "<div class=\"wrap\">\n  <div class=\"listView\">\n";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</div>\n";
  return buffer;
  });
templates['sBListSeasons'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <tr>\n      <td>\n        <div class=\"listInfo\" id=\""
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n          <div class=\"listTitle\">";
  if (stack2 = helpers.season) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.season; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n          <div class=\"listDate\">";
  if (stack2 = helpers.have) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.have; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " / ";
  if (stack2 = helpers.episodes) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.episodes; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</div>\n          <div class=\"listExtra\"></div>\n        </div>\n      </td>\n    </tr>\n  ";
  return buffer;
  }

  buffer += "<table class=\"table-condensed table-striped mittensWidth\">\n  <tr>\n    <td>\n      image goes here\n    </td>\n  </tr>\n  <tr>\n    <td>\n      "
    + escapeExpression(((stack1 = ((stack1 = depth0.show),stack1 == null || stack1 === false ? stack1 : stack1.show_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    </td>\n  </tr>\n  <tr>\n    <td>\n      Episodes: ";
  if (stack2 = helpers.episodes) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.episodes; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " / ";
  if (stack2 = helpers.totalEpisodes) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.totalEpisodes; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\n    </td>\n  </tr>\n  ";
  stack2 = helpers.each.call(depth0, depth0.seasons, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</table>\n";
  return buffer;
  });
templates['sBListView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, depth0.title, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"listView\">\n  ";
  stack1 = helpers.each.call(depth0, depth0.results, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <h3>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <a class=\"listInfo\" id=\"";
  if (stack1 = helpers.tvdbid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tvdbid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n          <span class=\"title\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n          <span class=\"subText\">";
  if (stack1 = helpers.first_aired) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.first_aired; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n          <div class=\"listExtra\"></div>\n        </a>\n        <div class=\"listAdd\" style=\"display:none;\" id=\"buttons_";
  if (stack1 = helpers.tvdbid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tvdbid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n          <span class=\"label label-important listCancelButton\" id=\"cancel_";
  if (stack1 = helpers.tvdbid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tvdbid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Cancel</span>\n          <span class=\"label label-success listAddButton\" id=\"add_";
  if (stack1 = helpers.tvdbid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tvdbid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Add Show</span>\n        </div>\n  ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, depth0.results, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });
})();