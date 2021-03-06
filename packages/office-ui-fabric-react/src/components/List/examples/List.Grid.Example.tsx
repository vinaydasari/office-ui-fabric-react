import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import './List.Grid.Example.scss';
import { IRectangle } from 'office-ui-fabric-react/lib/Utilities';

export interface IListGridExampleProps {
  items: any[];
}

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;

export class ListGridExample extends React.Component<IListGridExampleProps> {
  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;

  public render(): JSX.Element {
    return (
      <FocusZone>
        <List
          className="ms-ListGridExample"
          items={this.props.items}
          getItemCountForPage={this._getItemCountForPage}
          getPageHeight={this._getPageHeight}
          renderedWindowsAhead={4}
          onRenderCell={this._onRenderCell}
        />
      </FocusZone>
    );
  }

  private _getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
    if (itemIndex === 0) {
      this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
      this._rowHeight = this._columnWidth;
    }

    return this._columnCount * ROWS_PER_PAGE;
  };

  private _getPageHeight = (): number => {
    return this._rowHeight * ROWS_PER_PAGE;
  };

  private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {
    return (
      <div
        className="ms-ListGridExample-tile"
        data-is-focusable={true}
        style={{
          width: 100 / this._columnCount + '%'
        }}
      >
        <div className="ms-ListGridExample-sizer">
          <div className="msListGridExample-padder">
            <img src={item.thumbnail} className="ms-ListGridExample-image" />
            <span className="ms-ListGridExample-label">{`item ${index}`}</span>
          </div>
        </div>
      </div>
    );
  };
}
