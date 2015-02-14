var Loader = Class.extend({
    cache: { },

    init: function () {
        this.clear();
        this.preload();
    },

    preload: function () {
        // ...
    },

    clear: function () {
        this.cache = { };
    },

    contains: function (id) {
        return typeof(this.cache[id]) != 'undefined';
    },

    writeCache: function (id, data) {
        this.cache[id] = data;
    },

    readCache: function (id, defaultValue) {
        if (!this.contains(id)) {
            return defaultValue;
        }

        return this.cache[id];
    },

    innerLoad: function (id) {
        console.warn('[Loader] Did not implement .innerLoad() function!');
    },

    load: function (id) {
        if (this.contains(id)) {
            return this.readCache(id);
        }

        var data = this.innerLoad(id);
        this.writeCache(id, data);
        return data;
    }
});