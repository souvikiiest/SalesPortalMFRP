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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { override } from '@microsoft/decorators';
import { BaseApplicationCustomizer, PlaceholderName } from '@microsoft/sp-application-base';
import styles from './HomepageApplication.module.scss';
var LOG_SOURCE = 'HomepageApplicationCustomizer';
/** A Custom Action which can be run during execution of a Client Side Application */
var HomepageApplicationCustomizer = /** @class */ (function (_super) {
    __extends(HomepageApplicationCustomizer, _super);
    function HomepageApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomepageApplicationCustomizer.prototype.onInit = function () {
        this.context.placeholderProvider
            .changedEvent.add(this, this._renderPlaceHolders);
        return Promise.resolve();
    };
    HomepageApplicationCustomizer.prototype._renderPlaceHolders = function () {
        var topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this._onDispose });
        // The extension should not assume that the expected placeholder is available.
        if (!topPlaceholder) {
            console.error('The expected placeholder (Top) was not found.');
            return;
        }
        if (topPlaceholder.domElement) {
            topPlaceholder.domElement.innerHTML = "\n    \n    <ul class=\"" + styles.topnav + "\">\n    <li><a class=\"" + styles.active + "\" href=\"https://7tmw2s.sharepoint.com/sites/MPRFSALESSYSTEM/SitePages/Home.aspx\">Home</a></li>\n    <li><a href=\"\thttps://7tmw2s.sharepoint.com/sites/MPRFSALESSYSTEM/Lists/Products/AllItems.aspx\">Product</a></li>\n    <li><a href=\"https://7tmw2s.sharepoint.com/sites/MPRFSALESSYSTEM/Lists/Customers/AllItems.aspx\">Customer</a></li>\n    <li><a href=\"https://7tmw2s.sharepoint.com/sites/MPRFSALESSYSTEM/Lists/Orders/AllItems.aspx\">Order</a></li>\n  </ul>\n  ";
        }
        var bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, { onDispose: this._onDispose });
        // The extension should not assume that the expected placeholder is available.
        if (!bottomPlaceholder) {
            console.error('The expected placeholder (Bottom) was not found.');
            return;
        }
        if (bottomPlaceholder.domElement) {
            bottomPlaceholder.domElement.innerHTML = "\n      <div class=\"" + styles.app + "\">\n      <div class=\"" + styles.top + "\">\n\n      <div class=\"" + styles.topnav + "\">\n      <h3 class=\"" + styles.active + "\">CREATED BY SOUVIK GHOSH \u00A9 2022<h3>\n      \n    </div>      \n      </div>\n      </div>";
        }
    };
    HomepageApplicationCustomizer.prototype._onDispose = function () {
        console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
    };
    __decorate([
        override
    ], HomepageApplicationCustomizer.prototype, "onInit", null);
    return HomepageApplicationCustomizer;
}(BaseApplicationCustomizer));
export default HomepageApplicationCustomizer;
//# sourceMappingURL=HomepageApplicationCustomizer.js.map