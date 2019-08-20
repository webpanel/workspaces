import * as React from 'react';

import { Card, Col, Row } from 'antd';

import { MembershipList } from 'webpanel-membershiplist';
import { workspace } from './model/workspace';

interface IWorkspaceDetailProps {
  workspaceID: string;
}

export class WorkspaceSettings extends React.Component<IWorkspaceDetailProps> {
  public render() {
    const { workspaceID } = this.props;

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
