import * as React from 'react';

import { Card, Col, Row } from 'antd';

import { DataSource } from 'webpanel-data';
import { MembershipList } from 'webpanel-membershiplist';
import { getWorkspace } from '../model/workspace';

interface IWorkspaceDetailProps {
  dataSource: DataSource;
  workspaceID: string;
}

export class WorkspaceSettings extends React.Component<IWorkspaceDetailProps> {
  public render() {
    const { workspaceID, dataSource } = this.props;

    const workspace = getWorkspace(dataSource);

    return (
      <Row gutter={8}>
        <Col span={12}>{workspace.getEditView(workspaceID)}</Col>
        <Col span={12}>
          <Card title="Members">
            <MembershipList entity="Workspace" entityID={workspaceID} />
          </Card>
        </Col>
      </Row>
    );
  }
}
