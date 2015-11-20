import Ember from 'ember';

export default Ember.Object.extend({
  firstName: null,
  lastName: null,
  nickName: null,
  age: null,
  authorOf: null,
  email: null,
  conferences: [],
  fullName: Ember.computed("firstName", "lastName", function(){
    return `${this.get("firstName")} ${this.get("lastName")}`;
  }),
  greet: function(){
    return `Hi, My name is ${this.get("fullName")}. You can call me ${this.get("nickName")}`;
  },
  isOld: Ember.computed.gte("age", 30),
  wroteRuby: Ember.computed.equal("authorOf", "Ruby"),
  addConference: function(conference){
    this.get("conferences").pushObject(conference);
  },
  keyNoteConferences: Ember.computed("conferences.@each.keyNote", function(){
    return this.get("conferences").filterBy("keyNote", this.get("fullName"));
  }),
  conferenceNames: Ember.computed("conferences.[]", "conferences.@each.name",function(){
    return this.get("conferences").mapBy("name");
  }),
  conferenceTotal: Ember.computed.alias("conferences.length"),
  itinerary: Ember.computed("nickName", "conferenceTotal", function(){
    var num = this.get("conferenceTotal");
    return `${this.get("nickName"} is speaking at ${num} conferences`;
  }),
  hasValidEmail: Ember.computed.match('email', /^.+@.+\..+$/),
  hasErrors: Ember.computed.notEmpty("errors"),
  errors: Ember.computed("hasFirstName", "hasLastName", "hasAge", "hasValidEmail", function(){
    let errors = [];
    if(!this.get("hasFirstName")){
      errors.push("firstName cannot be blank");
    }
    if(!this.get("hasLastName")){
      errors.push("lastName cannot be blank");
    }
    if(!this.get("hasAge")){
      errors.push("age cannot be blank");
    }
    if(!this.get("hasValidEmail")){
      errors.push("email must be valid");
    }
    return errors;
  }),
  hasFirstName: Ember.computed.notEmpty("firstName"),
  hasLastName: Ember.computed.notEmpty("lastName"),
  hasAge: Ember.computed.notEmpty("age"),
  isValid: Ember.computed.and("hasFirstName", "hasLastName", "hasAge", "hasValidEmail"),
  isInvalid: Ember.computed.not("isValid"),
});