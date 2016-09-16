DEFAULT_TEMPERATURE = 20;
MIN_TEMPERATURE = 10;
POWERSAVE_MAX = 25;
REGULAR_MAX = 32;

Thermostat = function() {"use strict";
  this._temperature = DEFAULT_TEMPERATURE;
  this._minimumTemperature = MIN_TEMPERATURE;
  this._powerSaveMode = 'on';
  this._powerSaveMax = POWERSAVE_MAX;
  this._regularMax = REGULAR_MAX;
};

Thermostat.prototype = {
  showTemperature: function() {
    return this._temperature;
  },
  increaseTemperature: function() {
    if(this._temperature >= this.powerSaveStatus()) {
      throw new Error("Cannot go above max temperature.");
    }
    this._temperature ++;
  },
  decreaseTemperature: function() {
    if(this._temperature <= this._minimumTemperature){
      throw new Error("Cannot go below minimum temperature.");
    }
    this._temperature --;
  },
  resetTemperature: function() {
    this._temperature = DEFAULT_TEMPERATURE;
  },
  powerSaveSwitch: function() {
    if (this._powerSaveMode === 'on') {
      this._powerSaveMode = 'off';
    } else {
      this._powerSaveMode = 'on';
    }
  },
  loadTemp: function(temp, power) {
    this._temperature = temp;
    this._powerSaveMode = power;
  }
};

Thermostat.prototype.powerSaveStatus = function() {
  if (this._powerSaveMode === 'on') {
    return this._powerSaveMax;
  } else {
    return this._regularMax;
  }
};

Thermostat.prototype.colourSwitch = function() {
  if (this._temperature < 18) {
    return "green";
  } else if (this._temperature < 25){
    return "yellow";
  } else {
    return "red";
  }
};
