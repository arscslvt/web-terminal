import system_configurations from "../utils/configs";

const getConfig = (key) => {
  return system_configurations[key];
};

/**
 * @function setConfig
 * @description Sets a configuration value
 *
 * @param {array} keys The keys to set
 * @param {any} value The value to set
 */

const setConfig = (keys, value) => {
  let config = system_configurations;

  keys.map((key, index) => {
    if (index === keys.length - 1) {
      config[key] = value;
      return;
    }

    if (!config[key]) {
      config[key] = {};
    }

    config = config[key];
  });
};

export default {
  system_configurations,
  getConfig,
  setConfig,
};
