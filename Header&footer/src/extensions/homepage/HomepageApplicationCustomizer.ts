import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'HomepageApplicationCustomizerStrings';
import styles from './HomepageApplication.module.scss';
const LOG_SOURCE: string = 'HomepageApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHomepageApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HomepageApplicationCustomizer
  extends BaseApplicationCustomizer<IHomepageApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    this.context.placeholderProvider
    .changedEvent.add(this,this._renderPlaceHolders);
    


    return Promise.resolve();
  }
  private _renderPlaceHolders():void{
    const topPlaceholder =
    this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Top,
      { onDispose: this._onDispose });

  // The extension should not assume that the expected placeholder is available.
  if (!topPlaceholder) {
    console.error('The expected placeholder (Top) was not found.');
    return;
  }
  if (topPlaceholder.domElement) {
    topPlaceholder.domElement.innerHTML = `
    
    <ul class="${styles.topnav}">
    <li><a class="${styles.active}" href="https://7tmw2s.sharepoint.com/sites/MPRFSALESSYSTEM/SitePages/Home.aspx">Home</a></li>
    <li><a href="	https://7tmw2s.sharepoint.com/sites/MPRFSALESSYSTEM/Lists/Products/AllItems.aspx">Product</a></li>
    <li><a href="https://7tmw2s.sharepoint.com/sites/MPRFSALESSYSTEM/Lists/Customers/AllItems.aspx">Customer</a></li>
    <li><a href="https://7tmw2s.sharepoint.com/sites/MPRFSALESSYSTEM/Lists/Orders/AllItems.aspx">Order</a></li>
  </ul>
  `;
  }
  const bottomPlaceholder =
      this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose });

    // The extension should not assume that the expected placeholder is available.
    if (!bottomPlaceholder) {
      console.error('The expected placeholder (Bottom) was not found.');
      return;
    }

    if (bottomPlaceholder.domElement) {
      bottomPlaceholder.domElement.innerHTML = `
      <div class="${styles.app}">
      <div class="${styles.top}">

      <div class="${styles.topnav}">
      <h3 class="${styles.active}">CREATED BY SOUVIK GHOSH © 2022<h3>
      
    </div>      
      </div>
      </div>`;
    }
}
  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
