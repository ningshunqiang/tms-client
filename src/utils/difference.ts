import isEqual from "lodash/isEqual";
import transform from "lodash/transform";

export default (base: {}, object: {}) =>
  transform<{}, {}>(object, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      /* eslint-disable no-param-reassign */
      result[key] = value;
    }
  });
