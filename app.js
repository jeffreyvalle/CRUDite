$(document).ready(function(){

  //to pull up all storage values use
  // localStorage.length as your array length
  // localStorage.key(index) to access by number
  // that returns a list of keys

  // attach event listener to buttons(input?)
  // create function stub for read/write/delete
    // research local storage

  // $().on('click', function(){
  //
  // });

  //holds value at unique key representing input data from form
  //Need closure? to increment key++ and also check if key exists so we don't
  //overwrite data between sessions?
  //this also may need to check if localStorage has existing storageBin, if it does
  //then we want this to be that value, not an empty {}

var Storage = function(){
}

Storage.prototype.editKey = function(action, data){
  if(action === 'add'){
    this[this.findBlankKey()] = data;
  }
}

Storage.prototype.findBlankKey = function(self, num){
  var num = num || 0;
  var self = this;
  if(self.hasOwnProperty(num)){
    num = num + 1;
    return self.findBlankKey(self, num);
  } else {
    return num;
  }
}

Storage.prototype.adopt = function(){
  var localData = localStorage.getItem('storageBin') || 'no prior data';
  if(localData !== 'no prior data'){
    var parsedObj = JSON.parse(localData);
    for(var key in parsedObj){
      this[key] = parsedObj[key];
    }
  }
}

var DataObj = function(dataTitle, dataContent){
  //var obj = {};
  this.title = dataTitle;
  this.content = dataContent;
  this.view = 'unhidden';
  this.archived = false;
  this.completed = false;
  this.category = 'general';
  this.timeStamp = new Date();
  //return obj;
}

DataObj.prototype.toggleView = function(){
  if(this.view === 'unhidden'){
    this.view === 'hidden';
  } else {
    this.view === 'unhidden';
  }
}

DataObj.prototype.toggleArchive = function(){
  if(this.archived = false){
    this.archived = true;
  } else {
    this.archived = false;
  }
}

DataObj.prototype.toggleComplete = function(){
  if(this.completed === false){
    this.completed = true;
  } else {
    this.completed = false;
  }
}

DataObj.prototype.editCategory = function(newCategory){
  this.category = newCategory;
}

var storageBin = new Storage();
storageBin.adopt();

function updateLocalStorage(){
  localStorage.setItem('storageBin', JSON.stringify(storageBin));
}

function addDisplayItem(view, html, key){
  if(view === 'hidden'){
    $('.item-display').append(html).children().addClass('item-border')
    $(`.item-${key}`).css('opacity', 0.5);
  } else {
    $('.item-display').append(html).children().addClass('item-border');
    $(`.item-${key}`).css('opacity', 1);
  }
}

function displayLocalData(localData){
  var data = localData;
  var display = [];
  for(var key in data){
    //console.log(data[key].title, ' data[key].title ', data[key].content, ' content')
    //need to only display value not entire object
    //we can set the div id to a value so we can use buttons on each div to alter
    //them individually
      if(data[key].view === 'hidden'){
        console.log(key, ' hidden call')
        addDisplayItem('hidden', `<div class='item-${key}'><div class='item-buttons'><button class='button-mark-complete' alt='${key}'>Mark Complete</button><button class='button-archive-item'>Archive Item</button></div><p>TITLE: ${data[key].title} CONTENT: ${data[key].content}</p></div><br>`, key);
        //display.push(['hidden', `<div class='item-${key}'><div class='item-buttons'><button class='button-mark-complete' alt='${key}'>Mark Complete</button><button class='button-archive-item'>Archive Item</button></div><p>TITLE: ${data[key].title} CONTENT: ${data[key].content}</p></div><br>`]);
      } else if(data[key].view === 'unhidden') {
        console.log(key, ' unhidden call')
        addDisplayItem('unhidden', `<div class='item-${key}'><div class='item-buttons'><button class='button-mark-complete' alt='${key}'>Mark Complete</button><button class='button-archive-item'>Archive Item</button></div><p>TITLE: ${data[key].title} CONTENT: ${data[key].content}</p></div><br>`, key);
        //display.push(['unhidden', `<div class='item-${key}'><div class='item-buttons'><button class='button-mark-complete' alt='${key}'>Mark Complete</button><button class='button-archive-item'>Archive Item</button></div><p>TITLE: ${data[key].title} CONTENT: ${data[key].content}</p></div><br>`]);
      }
  }

  //var itemDisplayHTML = ``;//need to be able to save state and keep order on hidden items
  /*
  for(var i = 0; i < display.length; i++){
    if(display[i][0] === 'hidden'){
      addDisplayItem('hidden', display[i][1]);
    } else{
      addDisplayItem('unhidden', display[i][1]);
    }
  }
  */
  //$('.item-display').html(display).children().addClass('item-border');

  //add listeners to each items buttons
  $( ".button-mark-complete" ).on('click', function(){
    console.log(data[$(this).attr('alt')].view)
    if(data[$(this).attr('alt')].view === 'unhidden'){
      data[$(this).attr('alt')].view = 'hidden';
    } else {
      data[$(this).attr('alt')].view = 'unhidden';
    };
    console.log(data[$(this).attr('alt')].view)
    //why cant use .toggleView here?
    //console.log(data[$(this).attr('alt')].view, ' is hidden?');
    if($(this).closest('.item-' + $(this).attr('alt')).css('opacity') === '1'){
      $(this).closest('.item-' + $(this).attr('alt')).css('opacity', 0.5);
    } else {
      $(this).closest('.item-' + $(this).attr('alt')).css('opacity', 1);
    }
    if($(this).html() === 'Mark Complete'){
      $(this).html('Mark Incomplete');
    } else {
      $(this).html('Mark Complete');
    }
    updateLocalStorage();
  })

  $( ".button-archive-item" ).on('click', function(){
    data[$(this).attr('alt')].archived = 'true';
    //why cant use .toggleView here?
    //console.log(data[$(this).attr('alt')].view, ' is hidden?');
    if($(this).closest('.item-' + $(this).attr('alt')).css('opacity') === '1'){
      $(this).closest('.item-' + $(this).attr('alt')).css('opacity', 0.5);
    } else {
      $(this).closest('.item-' + $(this).attr('alt')).css('opacity', 1);
    }
    if($(this).html() === 'Mark Complete'){
      $(this).html('Mark Incomplete');
    } else {
      $(this).html('Mark Complete');
    }
  })
}

  //------------------------------------------------------------------
  $('.store-btn').on('click', function(event){
    let titleValue = $('.input-field-title').val();
    let contentValue = $('.input-field-body').val();
    storageBin.editKey('add', new DataObj(titleValue, contentValue));
    localStorage.setItem('storageBin', JSON.stringify(storageBin));
    //localStorage.setItem('contentValue', contentValue);

  });

  $('.get-btn').on('click', function(event){
    //console.log(localStorage.getItem('hrext'));
    let titleValue = localStorage.getItem('titleValue');
    let contentValue = localStorage.getItem('contentValue');

    //$('.item-display').html(`<p>${titleValue} ${contentValue}</p><br>`);
    displayLocalData(storageBin);
  });

  $('.delete-btn').on('click', function(event){
    // TODO add in a confirm
    // throw up .confirm window
    // capture result
    // test boolean to delete or not
    localStorage.removeItem('titleValue');
    localStorage.removeItem('contentValue');
    $('.debug').html(`<p>Items deleted</p>`);
  });



});
