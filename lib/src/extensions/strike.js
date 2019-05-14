import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faStrikethrough } from '@fortawesome/fontawesome-free-solid';
import { toggleMark } from 'prosemirror-commands';
import { markActive } from '../util';
var StrikeThrough = /** @class */ (function () {
    function StrikeThrough() {
    }
    Object.defineProperty(StrikeThrough.prototype, "name", {
        get: function () {
            return 'strike';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StrikeThrough.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StrikeThrough.prototype, "schema", {
        get: function () {
            return {
                group: 'mark',
                parseDOM: [
                    { tag: 'strike' },
                    { style: 'text-decoration=line-through' },
                    { style: 'text-decoration-line=line-through' }
                ],
                toDOM: function () { return ['span', {
                        style: 'text-decoration-line:line-through'
                    }]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StrikeThrough.prototype, "icon", {
        get: function () {
            return React.createElement(FontAwesomeIcon, { icon: faStrikethrough });
        },
        enumerable: true,
        configurable: true
    });
    StrikeThrough.prototype.active = function (state) {
        return markActive(state.schema.marks.strike)(state);
    };
    StrikeThrough.prototype.onClick = function (state, dispatch) {
        toggleMark(state.schema.marks.strike)(state, dispatch);
    };
    return StrikeThrough;
}());
export default StrikeThrough;
//# sourceMappingURL=strike.js.map