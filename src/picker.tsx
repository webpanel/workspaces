import * as React from 'react';

import { Alert, Modal, Spin } from 'antd';
import { IWorkspace, WorkspaceSession } from './session';
import { Query, QueryResult } from 'react-apollo';

import { AuthSession } from 'webpanel-auth';
import { Button } from 'antd';
import { ResourceCollectionLayer } from 'webpanel-data';
import { WorkspaceMenu } from './menu';
import { api } from './model/api';
import gql from 'graphql-tag';

// import { workspace } from "src/model";

interface IWorkspacePickerRenderProps {
  workspaces: IWorkspace[];
  selectedWorkspace: IWorkspace;
}

interface IWorkspacePickerProps {
  render: (props: IWorkspacePickerRenderProps) => React.ReactNode;
}

const MEBMERSHIPS_QUERY = gql`
  query($memberID: ID!) {
    memberships(memberID: $memberID, entity: "Workspace") {
      entityID
    }
  }
`;

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
    const token = AuthSession.current().getTokenPayload();
    const variables = { memberID: token && token.sub };
    return (
      <Query
        query={MEBMERSHIPS_QUERY}
        variables={variables}
        children={({
          data,
          loading,
          refetch,
          error
        }: QueryResult<any>): JSX.Element => {
          if (error) {
            return this.errorModal(error.message);
          }
          if (!data.memberships && loading) {
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
          const workspacesIDs = data.memberships.map((x: any) => x.entityID);

          const currentWorkspace = this.session.getCurrentWorkspace();
          if (
            currentWorkspace &&
            workspacesIDs.indexOf(currentWorkspace.id) === -1
          ) {
            this.session.clearCurrentWorkspace();
          }

          if (workspacesIDs.length === 0) {
            return this.errorModal("You don't have access to any workspace :(");
          }
          return (
            //   <Query
            //     query={WORKSPACES_QUERY}
            //     variables={{ workspacesIDs }}
            //     children={({ data, loading, error }: QueryResult<any>) => {
            <ResourceCollectionLayer
              dataSource={api}
              name="Workspace"
              fields={['id', 'name']}
              initialFilters={{ id_in: workspacesIDs }}
              render={({ error, data, loading }) => {
                if (error) {
                  return this.errorModal(error.message);
                }

                if (!data && loading) {
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

                const workspaces = data || [];
                if ((workspaces || []).length === 0) {
                  return this.errorModal(
                    "You don't have access to any workspace :("
                  );
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

                let selectedWorkspace = this.session.getCurrentWorkspace();
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
