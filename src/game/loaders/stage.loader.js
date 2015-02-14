var StageLoader = Loader.extend({
    readCache: function (id, defaultValue) {
        var data = this._super(id, defaultValue);

        if (data.isStage) {
            // Clear stages before returning them from cache
            data.clear();
            data.onLoaded();
        }
        return data;
    },

    innerLoad: function (mapId) {
        console.info('[StageLoader] Loading stage `' + mapId + '.json` (Async operation started)');

        var stage = new Stage();
        stage.id = mapId;
        stage.onLoaded = function () { console.error('[MapLoader] Callback missed'); };

        $.get('assets/stages/' + mapId + '.json')
            .success(function(data) {
                this.configureStage(stage, data);
                stage.onLoaded(stage);
                console.info('[StageLoader] Successfully loaded stage `' + mapId + '.json` (Async operation complete)');
            }.bind(this))
            .error(function() {
                alert('CRITICAL: Could not load stage: ' + mapId + '. Press OK to restart game.');
                location.reload();
            });

        return stage;
    },

    configureStage: function (stage, data) {
        stage.data = data;

        // 1. Configure all map properties
        stage.width = data.width * Settings.TileSize;
        stage.height = data.height * Settings.TileSize;

        if (data.properties.background) {
            stage.backgroundImage = Game.images.load(data.properties.background);
        }

        if (data.properties.gravity) {
            stage.gravity = parseFloat(data.properties.gravity);
        }

        // 2. Examine the map layers and spawn entities where needed
        var tilesetSrc = data.tilesets[0].image;
        tilesetSrc = tilesetSrc.replace('../images/', '');
        var tilesetImg = Game.images.load(tilesetSrc);
        var tilesPerRow = data.tilesets[0].imagewidth / Settings.TileSize;

        for (var i = 0; i < data.layers.length; i++) {
            var layer = data.layers[i];

            var x = -1;
            var y = 0;

            for (var j = 0; j < layer.data.length; j++) {
                var tid = layer.data[j];

                x++;

                if (x >= data.width) {
                    y++;
                    x = 0;
                }

                if (tid === 0) {
                    continue;
                }

                tid--;

                var layerType = 'regular';

                if (layer.properties != null && layer.properties.type) {
                    layerType = layer.properties.type;
                }

                var fullRows = Math.floor(tid / tilesPerRow);
                var srcY = fullRows * Settings.TileSize;
                var srcX = (tid * Settings.TileSize) - (fullRows * tilesPerRow * Settings.TileSize);
                var destX = x * Settings.TileSize;
                var destY = y * Settings.TileSize;

                switch (layerType) {
                    default:

                        var entity = new BlockEntity();
                        entity.posX = destX;
                        entity.posY = destY;
                        entity.renderer = new BlockRenderer(entity, tilesetImg, srcX, srcY);
                        stage.add(entity);

                        break;

                    case 'player_spawns':

                        stage.playerSpawns.push({
                            x: destX,
                            y: destY
                        });

                        break;
                }

            }
        }
    }
});