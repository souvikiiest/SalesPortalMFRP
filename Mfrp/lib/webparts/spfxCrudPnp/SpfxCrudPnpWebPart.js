var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp/presets/all";
import * as strings from 'SpfxCrudPnpWebPartStrings';
import SpfxCrudPnp from './components/SpfxCrudPnp';
var items = [];
var SpfxCrudPnpWebPart = /** @class */ (function (_super) {
    __extends(SpfxCrudPnpWebPart, _super);
    function SpfxCrudPnpWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpfxCrudPnpWebPart.prototype.onInit = function () {
        var _this = this;
        return _super.prototype.onInit.call(this).then(function (_) {
            sp.setup({
                spfxContext: _this.context
            });
        });
    };
    SpfxCrudPnpWebPart.prototype.render = function () {
        var element = React.createElement(SpfxCrudPnp, {
            description: this.properties.description
        });
        ReactDom.render(element, this.domElement);
    };
    SpfxCrudPnpWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(SpfxCrudPnpWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    SpfxCrudPnpWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return SpfxCrudPnpWebPart;
}(BaseClientSideWebPart));
export default SpfxCrudPnpWebPart;
//# sourceMappingURL=SpfxCrudPnpWebPart.js.map