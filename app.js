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
storageBin.adopt(); //gets data from browser if its there
displayLocalData(storageBin); //displays data on page initially

function updateLocalStorage(){
  localStorage.setItem('storageBin', JSON.stringify(storageBin));
}

function addDisplayItem(view, html, key){
  if(view === 'hidden'){
      $('.item-display').append(html)
      $(`.item-${key}`).addClass('item-border')
      $(`.item-${key}`).css('opacity', 0.5);
      $(`.item-${key}`).find('.button-mark-complete').html('Mark Incomplete');
  } else if(view === 'archived-complete'){
      $('.item-display').append(html)
      $(`.item-${key}`).addClass('item-border')
      $(`.item-${key}`).find('.button-archive-item').html('Activate');
      $(`.item-${key}`).find('.button-mark-complete').html('Mark Incomplete');
      $(`.item-${key}`).css('opacity', 0.15);
      //$(`.item-${key}`).hide(); //reactivate when categories
  } else if(view === 'archived-incomplete'){
      $('.item-display').append(html)
      $(`.item-${key}`).addClass('item-border')
      $(`.item-${key}`).find('.button-archive-item').html('Activate');
      //$(`.item-${key}`).hide(); //reactivate when categories
      $(`.item-${key}`).css('opacity', 0.15);
  } else {
      $('.item-display').append(html)
      $(`.item-${key}`).addClass('item-border')
      $(`.item-${key}`).css('opacity', 1);
  }
}

function displayLocalData(localData){
  var data = localData;
  for(var key in data){
    if(data[key].view === 'hidden' && data[key].archived === true){
      addDisplayItem('archived-complete', `<div class='item-${key}'><div class='item-buttons'><button class='button-mark-complete' alt='${key}'>Mark Complete</button><button class='button-archive-item' alt='${key}'>Archive Item</button></div><p>TITLE: ${data[key].title} CONTENT: ${data[key].content}</p></div><br>`, key);
    } else if(data[key].view === 'unhidden' && data[key].archived === true) {
      addDisplayItem('archived-incomplete', `<div class='item-${key}'><div class='item-buttons'><button class='button-mark-complete' alt='${key}'>Mark Complete</button><button class='button-archive-item' alt='${key}'>Archive Item</button></div><p>TITLE: ${data[key].title} CONTENT: ${data[key].content}</p></div><br>`, key);
    } else if(data[key].view === 'hidden'){
      addDisplayItem('hidden', `<div class='item-${key}'><div class='item-buttons'><button class='button-mark-complete' alt='${key}'>Mark Complete</button><button class='button-archive-item' alt='${key}'>Archive Item</button></div><p>TITLE: ${data[key].title} CONTENT: ${data[key].content}</p></div><br>`, key);
    } else if(data[key].view === 'unhidden') {
      addDisplayItem('unhidden', `<div class='item-${key}'><div class='item-buttons'><button class='button-mark-complete' alt='${key}'>Mark Complete</button><button class='button-archive-item' alt='${key}'>Archive Item</button></div><p>TITLE: ${data[key].title} CONTENT: ${data[key].content}</p></div><br>`, key);
    }
  }
  //add listeners to each items buttons
  $( ".button-mark-complete" ).on('click', function(){
    if($(this).html() === 'Mark Complete'){
      $(this).html('Mark Incomplete');
      data[$(this).attr('alt')].view = 'hidden';
      if(data[$(this).attr('alt')].archived === true){
        $(this).closest('.item-' + $(this).attr('alt')).css('opacity', 0.15);
      } else {
        $(this).closest('.item-' + $(this).attr('alt')).css('opacity', 0.5);
      }
    } else {
      $(this).html('Mark Complete');
      data[$(this).attr('alt')].view = 'unhidden';
      if(data[$(this).attr('alt')].archived === true){
        $(this).closest('.item-' + $(this).attr('alt')).css('opacity', 0.15);
      } else {
        $(this).closest('.item-' + $(this).attr('alt')).css('opacity', 1);
      }
    }
    updateLocalStorage(); //makes sure our object in browser localStorage is up to date
  })

  $( ".button-archive-item" ).on('click', function(){
    //why cant use .toggleView here?
    if($(this).html() === 'Archive Item'){
      $(this).html('Activate');
      data[$(this).attr('alt')].archived = true;
      $(this).closest('.item-' + $(this).attr('alt')).css('opacity', 0.15);
    } else {
      $(this).html('Archive Item');
      data[$(this).attr('alt')].archived = false;
      if(data[$(this).attr('alt')].view === 'hidden'){
        $(this).closest('.item-' + $(this).attr('alt')).css('opacity', 0.5);
      } else {
        $(this).closest('.item-' + $(this).attr('alt')).css('opacity', 1);
      }
    }
    updateLocalStorage();
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

  $('.update-btn').on('click', function(event){
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

var inputModal = document.getElementById('input-modal')
var displayModalButton = document.getElementById('modal-open-btn')


});
