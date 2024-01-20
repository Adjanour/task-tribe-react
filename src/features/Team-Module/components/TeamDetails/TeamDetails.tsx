
import React from 'react';
import { Descriptions, Button } from 'antd';



interface TeamDetailsProps {
    teamDetails: {
        teamDetailsId: number;
        teamDetailsTeamSize?: number;
        teamDetailsProjectCount?: number;
        teamDetailsTeamNotes?: string;
        teamDetailsCreatedDate?: string;
        teamDetailsTeamId?: {
            teamId?: number;
            teamName?: string;
            teamDescription?: string;
            teamCreatedDate?: string;
            teamLeadUserId?: {
                id?: number;
                email?: string;
                userName?: string;
                firstName?: string;
                lastName?: string;
                dateOfBirth?: string;
                isActive?: boolean;
                createdDate?: string;
                lastEditDate?: string;
            };
            teamProjectId?: number | undefined
        };
        // Add more team details as needed
    }[];
}

export const TeamDetails: React.FC<TeamDetailsProps> = ({ teamDetails }) => {
    if (!teamDetails || teamDetails.length === 0) {
        return (
            <div className="flex items-center mt-[50px] justify-center h-full w-full">
                <h1 className="text-center text-blue-300 dark:text-white font-semibold text-xl">No team details available</h1>
            </div>
        );
    }

    const {
        teamDetailsId,
        teamDetailsTeamSize,
        teamDetailsProjectCount,
        teamDetailsTeamNotes,
        teamDetailsCreatedDate,
        teamDetailsTeamId
    } = teamDetails[0]

    const {teamId, teamName, teamDescription, teamCreatedDate, teamLeadUserId} = teamDetailsTeamId || {};

    const {
        id,
        email,
        userName,
        firstName,
        lastName,
    } = teamLeadUserId || {};

    const handleEdit = () => {
        // Add logic for editing team details
    };

    const handleManageMembership = () => {
        // Add logic for managing team membership
    };
    console.log("starting")
    console.log(teamId)
    console.log(teamName)
    console.log(teamDetailsId)
    console.log(teamDetails)
    console.log(teamDetailsTeamId)

    return (
        <div>
            {teamDetails && <>
                <Descriptions layout="vertical" className="w-full" bordered column={4}>
                    <Descriptions.Item label="Team Name">{teamName}</Descriptions.Item>
                    <Descriptions.Item label="Team Description">{teamDescription}</Descriptions.Item>
                    <Descriptions.Item label="Team Size">{teamDetailsTeamSize}</Descriptions.Item>
                    <Descriptions.Item label="Project Count">{teamDetailsProjectCount}</Descriptions.Item>
                </Descriptions>
                <br/>
                <Descriptions layout="vertical" className="w-full" bordered column={4}>
                    <Descriptions.Item label="Team Notes">{teamDetailsTeamNotes}</Descriptions.Item>
                    <Descriptions.Item label="Created Date">{teamDetailsCreatedDate}</Descriptions.Item>
                    <Descriptions.Item label="Lead Name">{`${firstName} ${lastName}`}</Descriptions.Item>
                    <Descriptions.Item label="Lead Email">{email}</Descriptions.Item>
                </Descriptions>
                <div style={{ marginTop: '16px' }}>
                    <Button  onClick={handleEdit} style={{ marginRight: '8px' }}>
                        Edit Team Details
                    </Button>
                    <Button onClick={handleManageMembership}>Manage Team Membership</Button>
                </div>
            </> }
            {!teamDetails && <h1 className="m-auto mx-auto justify-center font-semibold">No team details available</h1>}
        </div>
    );
};


