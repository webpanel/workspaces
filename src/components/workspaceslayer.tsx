import * as React from "react";

import { DataSource, ResourceCollectionLayer } from "webpanel-data";
import { Query, QueryResult } from "react-apollo";

import { IWorkspace } from "../session";
import gql from "graphql-tag";

// import { workspace } from "src/model";

interface IWorkspacesLayerRenderProps {
  workspaces: IWorkspace[];
  error?: Error;
  loading: boolean;
}

interface IWorkspacesLayerProps {
  dataSource: DataSource;
  memberID: string;
  render: (props: IWorkspacesLayerRenderProps) => JSX.Element;
}

const MEBMERSHIPS_QUERY = gql`
  query($memberID: ID!) {
    memberships(memberID: $memberID, entity: "Workspace") {
      entityID
    }
  }
`;

export class WorkspacesLayer extends React.Component<IWorkspacesLayerProps> {
  public render() {
    const { dataSource, memberID } = this.props;

    const variables = { memberID };
    return (
      <Query
        query={MEBMERSHIPS_QUERY}
        variables={variables}
        children={({
          data,
          loading,
          refetch,
          error,
        }: QueryResult<any>): JSX.Element => {
          if (loading) {
            return this.props.render({ error, loading, workspaces: [] });
          }
          if (error) {
            return this.props.render({ error, loading: false, workspaces: [] });
          }
          const workspacesIDs = (data.memberships || []).map(
            (x: any) => x.entityID
          );

          return (
            <ResourceCollectionLayer
              dataSource={dataSource}
              name="Workspace"
              fields={["id", "name"]}
              initialFilters={{ id_in: workspacesIDs }}
              render={({ error, data, loading }) => {
                if (loading) {
                  return this.props.render({ loading, workspaces: [] });
                }
                if (error) {
                  return this.props.render({
                    error,
                    loading: false,
                    workspaces: [],
                  });
                }

                const workspaces = data || [];
                if ((workspaces || []).length === 0) {
                  return this.props.render({
                    error: new Error(
                      "You don't have access to any workspace :("
                    ),
                    loading: false,
                    workspaces: [],
                  });
                }

                return this.props.render({
                  workspaces,
                  loading: false,
                });
              }}
            />
          );
        }}
      />
    );
  }
}
