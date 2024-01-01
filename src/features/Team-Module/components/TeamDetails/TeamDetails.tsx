// TeamDetails.tsx

import React from 'react';
import { Card, Descriptions, Button } from 'antd';

interface TeamDetailsProps {
  team: {
    teamName: string;
    teamLead: string;
    teamDescription: string;
    // Add more team details as needed
  };
}

export const TeamDetails: React.FC<TeamDetailsProps> = ({ team }) => {
  const handleEdit = () => {
    // Add logic for editing team details
  };

  const handleManageMembership = () => {
    // Add logic for managing team membership
  };

  return (
    <Card title="Team Details">
      <Descriptions bordered>
        <Descriptions.Item label="Name">{team.teamName}</Descriptions.Item>
        <Descriptions.Item label="Lead">{team.teamName}</Descriptions.Item>
        <Descriptions.Item label="Description">{team.teamDescription}</Descriptions.Item>
        {/* Add more team details as needed */}
      </Descriptions>

      <Button type="primary" onClick={handleEdit}>
        Edit Team Details
      </Button>
      <Button onClick={handleManageMembership}>Manage Team Membership</Button>
    </Card>
  );
};


