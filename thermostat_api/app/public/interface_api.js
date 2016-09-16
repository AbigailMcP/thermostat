$(document).ready(function() {

  var thermostat = new Thermostat();

    $.get("http://localhost:9292/temperature", function(details){
    var temp = details.temp2;
    var powermode = details.powermode2;
    thermostat.loadTemp(temp, powermode);
    updateTemperature();
  });

  $("#selectCity").change(function(){
      var city = this.value;
      $.get("http://api.wunderground.com/api/80a7e4a889aa4897/geolookup/conditions/q/" + city + ".json", function(parsed_json) {
      var location = parsed_json['location']['city'];
      var temp_c = parsed_json['current_observation']['temp_c'];
      $('#location').text("Current temperature in " + location + " is: " + temp_c + " degrees");
    });
  });

  $('#temperature-up').click(function() {
    thermostat.increaseTemperature();
    updateTemperature();
      $.post("http://localhost:9292/temperature", { temp: thermostat._temperature, powermode: thermostat._powerSaveMode});
  });

  $('#temperature-down').click(function() {
    thermostat.decreaseTemperature();
    updateTemperature();
    $.post("http://localhost:9292/temperature", { temp: thermostat._temperature, powermode: thermostat._powerSaveMode});
  });

  $('#temperature-reset').click(function() {
    thermostat.resetTemperature();
    updateTemperature();
    $.post("http://localhost:9292/temperature", { temp: thermostat._temperature, powermode: thermostat._powerSaveMode});
  });

  $('#powersaving-switch').click(function() {
    thermostat.powerSaveSwitch();
    $('#powersaving-status').text(thermostat._powerSaveMode);
    $.post("http://localhost:9292/temperature", { temp: thermostat._temperature, powermode: thermostat._powerSaveMode});
  });

  function updateTemperature() {
    $('#temperature').text(thermostat.showTemperature());
    $('body').attr('class', thermostat.colourSwitch());
  }

});
