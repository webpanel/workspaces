import * as React from 'react';

import { IWorkspace } from './session';
import { Menu } from 'antd';

interface IWorkspaceMenu {
  workspaces: IWorkspace[];
  onSelect: (workspace: IWorkspace) => void;
}

export class WorkspaceMenu extends React.Component<IWorkspaceMenu> {
  public render() {
    const { workspaces, onSelect } = this.props;
    return (
      <Menu
        onClick={e => {
          for (const workspace of workspaces) {
            if (workspace.id === e.key) {
              onSelect(workspace);
              break;
            }
          }
        }}
      >
        {workspaces.map(w => {
          return <Menu.Item key={w.id}>{w.name}</Menu.Item>;
        })}
      </Menu>
    );
  }
}
