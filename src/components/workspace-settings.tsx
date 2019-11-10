import * as React from 'react';

import { Card, Col, Row } from 'antd';
import { IMembershipListRole, MembershipList } from 'webpanel-membershiplist';

import { DataSource } from 'webpanel-data';
import { getWorkspace } from '../model/workspace';

interface IWorkspaceSettingsProps {
  dataSource: DataSource;
  workspaceID: string;
  roles?: IMembershipListRole[];
}

export class WorkspaceSettings extends React.Component<
  IWorkspaceSettingsProps
> {
  public render() {
    const { workspaceID, dataSource, roles } = this.props;

    const workspace = getWorkspace(dataSource);

    return (
      <Row gutter={8}>
        <Col span={12}>{workspace.getEditView(workspaceID)}</Col>
        <Col span={12}>
          <Card title="Members">
            <MembershipList
              roles={roles}
              entity="Workspace"
              entityID={workspaceID}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}
