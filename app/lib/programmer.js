import Ember from 'ember';

var Programmer = Ember.Object.extend({
  firstName: null,
  lastName: null,
  nickName: null,
  age: null,
  authorOf: null,
  email: null,
  conferences: [],
  greet: function(){
    return `Hi, My name is ${this.get("firstName")} ${this.get("lastName")}. You can call me ${this.nickName}`;
  },
  isOld: Ember.computed("age", function(){
    if (this.get("age") > 30){
      return true;
    } else{
      return false;
    }
  }),
  wroteRuby: Ember.computed("authorOf", function(){
    if (this.get("authorOf") === "Ruby"){
      return true;
    } else{
      return false;
    }
  }),
  addConference: function(conference){
    return this.get("conferences").pushObject(conference);
  },
  keyNoteConferences: Ember.computed("conferences.@each.keyNote", function(){
    var conferences = this.get("conferences");
    var fullName = `${this.get("firstName")} ${this.get("lastName")}`;
    return conferences.filterBy("keyNote", fullName);

  }),
  conferenceNames: Ember.computed.mapBy("conferences", "name"),
    // function(chore, name){

    // var conferences = this.get("conferences");
    // var names = [];
    // conferences.forEach((conference) => {
    //   names.push(conference.name);
    // });
    // return names;

  // }),
  conferenceTotal: Ember.computed("conferences.[]", function(){
    var conferences = this.get("conferences");
    return conferences.length;
  }),
  itinerary: Ember.computed("conferences.[]", function(){
    var num = this.get("conferences").length;
    return `${this.nickName} is speaking at ${num} conferences`;
  }),
  hasValidEmail: Ember.computed("email", function(){
    if (this.get("email") === 'notValid' || this.get("email") === null ){ return false;
    }else{
      return true;
    }
  }),
  hasErrors: Ember.computed("errors", function(){
    if (this.get("errors").length > 0){
        return true;
      } else{
        return false;
      }
  }),
  errors: Ember.computed("firstName", "lastName", "age", "hasValidEmail", function(){
    var errors = [];
    if(this.get("firstName")===null){
      errors.push("firstName cannot be blank");
    }
    if(this.get("lastName")===null){
      errors.push("lastName cannot be blank");
    }
    if(this.get("age")===null){
      errors.push("age cannot be blank");
    }
    if(!this.get("hasValidEmail")){
      errors.push("email must be valid");
    }
    return errors;
  }),
  isInvalid: Ember.computed("hasErrors", function(){
    if (this.get("hasErrors")){
      return true;
    }else{
      return false;
    }    
  }),
  isValid: Ember.computed("hasErrors", function(){
    if (this.get("hasErrors")){
      return false;
    } else{
      return true;
    }
  })
});

export default Programmer;

// export default Ember.Object.extend({

// });

