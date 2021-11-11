interface ObjectAny {
  [key: string | number | symbol]: any;
};

const has = (o: ObjectAny, k: any): boolean => Object.prototype.hasOwnProperty.call(o, k);

class Util {
    /**
     * Sets default properties on an object that aren't already specified.
     * @param {Object} def Default properties
     * @param {Object} given Object to assign defaults to
     * @returns {Object}
     */
     static mergeDefault(def: ObjectAny, given: ObjectAny): ObjectAny {
      if (!given) return def;
      for (const key in def) {
        if (!has(given, key) || given[key] === undefined) {
          given[key] = def[key];
        } else if (given[key] === Object(given[key])) {
          given[key] = Util.mergeDefault(def[key], given[key]);
        }
      }
  
      return given;
    };

    /**
     * Format class name
     * @param names - list of name of class
     * @return {string}
     */
    static classNames(...names: string[]): string {
      return names.map((name: string) => 'ota__' + name).join(' ');
    }
};
