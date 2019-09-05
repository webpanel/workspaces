import * as React from 'react';

import { Alert, Modal, Spin } from 'antd';
import { IWorkspace, WorkspaceSession } from '../session';

import { AuthSession } from 'webpanel-auth';
import { Button } from 'antd';
import { DataSource } from 'webpanel-data';
import { WorkspaceMenu } from '../menu';
import { WorkspacesLayer } from './workspaceslayer';

// import { workspace } from "src/model";

interface IWorkspacePickerRenderProps {
  workspaces: IWorkspace[];
  selectedWorkspace: IWorkspace;
}

interface IWorkspacePickerProps {
  dataSource: DataSource;
  render: (props: IWorkspacePickerRenderProps) => React.ReactNode;
}

export class WorkspacePicker extends React.Component<IWorkspacePickerProps> {
  private session = WorkspaceSession.shared();

  constructor(props: IWorkspacePickerProps) {
    super(props);
    this.session.onCurrentWorkspaceChange = () => {
      this.forceUpdate();
    };
  }

  public getCurrentWorkspace(): IWorkspace | undefined {
    return;
  }

  public render() {
    const { dataSource } = this.props;

    return (
      <WorkspacesLayer
        dataSource={dataSource}
        render={({ error, loading, workspaces }) => {
          if (error) {
            return this.errorModal(error.message);
          }

          if (loading) {
            return (
              <Spin
                spinning={loading}
                style={{
                  width: '100%',
                  height: '100%',
                  marginTop: '30px'
                }}
              />
            );
          }

          const currentWorkspace = this.session.getCurrentWorkspace();
          if (
            currentWorkspace &&
            workspaces.map(w => w.id).indexOf(currentWorkspace.id) === -1
          ) {
            this.session.clearCurrentWorkspace();
          }

          if (workspaces.length === 0) {
            return this.errorModal("You don't have access to any workspace :(");
            // return workspace.getCreateView(
            //   {
            //     wrapperType: "modal",
            //     modal: {
            //       closable: false,
            //       visible: true,
            //       title: "Create new workspace"
            //     }
            //   },
            //   { onSave: () => refetch() }
            // );
          }

          let selectedWorkspace = currentWorkspace;
          if (!selectedWorkspace && workspaces.length === 1) {
            selectedWorkspace = workspaces[0];
            if (selectedWorkspace) {
              this.session.setCurrentWorkspace(selectedWorkspace);
            }
          }
          if (!selectedWorkspace) {
            return (
              <Modal
                title="Select workspace"
                visible={true}
                footer={null}
                closable={false}
              >
                <WorkspaceMenu
                  workspaces={workspaces}
                  onSelect={(w: IWorkspace) => {
                    this.session.setCurrentWorkspace(w);
                  }}
                />
              </Modal>
            );
          }

          return (
            <div key={`workspace_${selectedWorkspace.id}`}>
              {this.props.render({
                selectedWorkspace,
                workspaces
              })}
            </div>
          );
        }}
      />
    );
  }

  private errorModal(message: string): JSX.Element {
    return (
      <Modal
        visible={true}
        closable={false}
        footer={
          <Button type="primary" onClick={() => AuthSession.current().logout()}>
            Logout
          </Button>
        }
      >
        <Alert type="error" message={message} />
      </Modal>
    );
  }
}
