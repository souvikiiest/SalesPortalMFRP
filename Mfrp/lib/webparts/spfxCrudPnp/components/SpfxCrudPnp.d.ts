import * as React from 'react';
import { ISpfxCrudPnpProps } from './ISpfxCrudPnpProps';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
export default class SpfxCrudPnp extends React.Component<ISpfxCrudPnpProps, {}> {
    componentWillMount(): Promise<void>;
    render(): React.ReactElement<ISpfxCrudPnpProps>;
    private createItem;
    private getItemsfromcdm;
    private getItems;
    private getItemByPdtId;
    private showme;
    private readitemsbyID;
    private deleteItem;
    private updateItem;
    private resetField;
}
//# sourceMappingURL=SpfxCrudPnp.d.ts.map