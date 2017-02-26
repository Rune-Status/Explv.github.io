'use strict';

define("Area", ['leaflet', 'Drawable', 'Position'], function(L, Drawable, Position) {

    return class Area extends Drawable {

        constructor(map, startPosition, endPosition) {
            super(map);
            this.map = map;
            this.startPosition = startPosition;
            this.endPosition = endPosition;
            this.rectangle = this.toLeaflet();
        }

        static fromBounds(map, bounds) {
            return new Area(
                map,
                Position.fromLatLng(map, bounds.getSouthWest()),
                Position.fromLatLng(map, bounds.getNorthEast())
            );
        }

        toLeaflet() {

            var newStartPosition = new Position(this.startPosition.x, this.startPosition.y, this.startPosition.z);
            var newEndPosition = new Position(this.endPosition.x, this.endPosition.y, this.startPosition.z);

            if (this.endPosition.x >= this.startPosition.x) {
                newEndPosition.x += 1;
            } else {
                newStartPosition.x += 1;
            }

            if (this.endPosition.y >= this.startPosition.y) {
                newEndPosition.y += 1;
            } else {
                newStartPosition.y += 1;
            }

            return L.rectangle(
                L.latLngBounds(
                    newStartPosition.toLatLng(this.map),
                    newEndPosition.toLatLng(this.map)
                ), {
                    color: "#33b5e5",
                    weight: 1,
                    clickable: false
                }
            );
        }

        toJavaCode() {
            var areaDef = `Area area = new Area(${this.startPosition.x}, ${this.startPosition.y}, ${this.endPosition.x}, ${this.endPosition.y})`;
            if (this.startPosition.z > 0) {
              areaDef += `.setPlane(${this.startPosition.z})`;
            }
            return areaDef;
        }

        getName() {
            return "Area";
        }
    }
});
