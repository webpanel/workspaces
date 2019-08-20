import * as React from 'react';

import { Dropdown, Icon, Menu, Modal } from 'antd';
import { IWorkspace, WorkspaceSession } from './session';

import { WorkspaceSettings } from './workspace-settings';
import { workspace } from './model/workspace';

interface IWorkspaceMenuItemProps {
  workspaces: IWorkspace[];
  selectedWorkspace: IWorkspace;
}

interface IWorkspaceMenuItemState {
  addingWorkspace: boolean;
  editingWorkspaceID: string | undefined;
}

export class WorkspaceHeaderItem extends React.Component<
  IWorkspaceMenuItemProps,
  IWorkspaceMenuItemState
> {
  public state: IWorkspaceMenuItemState = {
    addingWorkspace: false,
    editingWorkspaceID: undefined
  };

  private session = WorkspaceSession.shared();

  public render() {
    const { workspaces, selectedWorkspace } = this.props;

    const menu = (
      <Menu
        onClick={e => {
          window.history.pushState(null, 'aa', '/');
          if (e.key === 'settings') {
            const currentWorkspace = this.session.getCurrentWorkspace();
            this.setState({
              editingWorkspaceID: currentWorkspace && currentWorkspace.id
            });
            return;
          }
          for (const w of workspaces) {
            if (w.id === e.key) {
              this.session.setCurrentWorkspace(w);
              break;
            }
          }
        }}
      >
        {workspaces.map(w => {
          return (
            <Menu.Item key={w.id}>
              <Icon
                type="check"
                style={{
                  visibility:
                    w.id !== selectedWorkspace.id ? 'hidden' : undefined
                }}
              />
              {w.name}
            </Menu.Item>
          );
        })}
        <Menu.Divider />
        <Menu.Item key="settings">
          <Icon type="setting" />
          Settings
        </Menu.Item>
      </Menu>
    );

    return (
      <>
        {this.state.editingWorkspaceID &&
          this.editWorkspaceModal(this.state.editingWorkspaceID)}
        {this.getAddingWorkspaceModal()}
        <Dropdown overlay={menu}>
          <span className="antd-header-content-item">
            <Icon type="folder" style={{ padding: '0 8px 0 0' }} />
            {selectedWorkspace.name}
          </span>
        </Dropdown>
      </>
    );
  }

  private editWorkspaceModal(id: string): React.ReactNode {
    return (
      <Modal
        visible={true}
        title="Workspace settings"
        width="80%"
        onCancel={() => this.setState({ editingWorkspaceID: undefined })}
        footer={null}
      >
        <WorkspaceSettings workspaceID={id} />
      </Modal>
    );
  }

  private getAddingWorkspaceModal(): React.ReactNode {
    return workspace.getCreateView(
      {
        // initialValues: { name: 'blah' },
        wrapperType: 'modal',
        modal: {
          title: 'Add workspace',
          visible: this.state.addingWorkspace
        }
      },
      {
        onSave: (id: string) => {
          this.setState({ addingWorkspace: false });
        },
        onCancel: () => {
          this.setState({ addingWorkspace: false });
        }
      }
    );
  }
  // private addWorkspace() {
  //   this.setState({ addingWorkspace: true });
  //   // const modal = workspace.getCreateView(
  //   //   {
  //   //     initialValues: { name: 'blah' }
  //   //   },
  //   //   (id: string) => {
  //   //     global.console.log('created!', id);
  //   //   }
  //   // );
  //   // return modal;
  //   // message.warning('Not implemented', 3);
  // }
}
