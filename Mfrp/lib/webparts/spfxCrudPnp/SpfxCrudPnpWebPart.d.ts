import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
export interface ISpfxCrudPnpWebPartProps {
    description: string;
}
export interface IReactGetItemsState {
    items: IDropdownOption[];
}
export default class SpfxCrudPnpWebPart extends BaseClientSideWebPart<ISpfxCrudPnpWebPartProps> {
    protected onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=SpfxCrudPnpWebPart.d.ts.map