// import React from 'react';
// import { Card, Descriptions, Button } from 'antd';
//
// interface TeamDetailsProps {
//     teamDetails: {
//         teamDetailsId?: number;
//         teamDetailsTeamSize?: number;
//         teamDetailsProjectCount?: number;
//         teamDetailsTeamNotes?: string;
//         teamDetailsCreatedDate?: string;
//         teamDetailsTeamId?: {
//             teamId?: number;
//             teamName?: string;
//             teamDescription?: string;
//             teamCreatedDate?: string;
//             teamLeadUserId?: {
//                 id?: number;
//                 email?: string;
//                 userName?: string;
//                 firstName?: string;
//                 lastName?: string;
//                 dateOfBirth?: string;
//                 isActive?: boolean;
//                 createdDate?: string;
//                 lastEditDate?: string;
//             };
//         };
//         // Add more team details as needed
//     };
// }
//
// export const TeamDetails: React.FC<TeamDetailsProps> = ({ teamDetails }) => {
//     if (!teamDetails) {
//         // Handle the case where teamDetails is undefined or null
//         return <div>No team details available</div>;
//     }
//     console.log(teamDetails)
//     const {
//         teamDetailsId,
//         teamDetailsTeamSize,
//         teamDetailsProjectCount,
//         teamDetailsTeamNotes,
//         teamDetailsCreatedDate,
//         teamDetailsTeamId,
//     } = teamDetails;
//
//     // Destructure with default values to handle potential undefined or null values
//     const {
//         teamId = 'N/A',
//         teamName = 'N/A',
//         teamDescription = 'N/A',
//         teamCreatedDate = 'N/A',
//         teamLeadUserId = {},
//     } = teamDetailsTeamId || {};
//
//     const {
//         id = 'N/A',
//         email = 'N/A',
//         userName = 'N/A',
//         firstName = 'N/A',
//         lastName = 'N/A',
//         dateOfBirth = 'N/A',
//         isActive = false,
//         createdDate = 'N/A',
//         lastEditDate = 'N/A',
//     } = teamLeadUserId;
//
//     const handleEdit = () => {
//         // Add logic for editing team details
//     };
//
//     const handleManageMembership = () => {
//         // Add logic for managing team membership
//     };
//
//     return (
//         <Card title="Team Details">
//             <Descriptions bordered column={3}>
//                 <Descriptions.Item label="Team ID">{teamId}</Descriptions.Item>
//                 <Descriptions.Item label="Team Name">{teamName}</Descriptions.Item>
//                 <Descriptions.Item label="Team Description">{teamDescription}</Descriptions.Item>
//                 <Descriptions.Item label="Team Size">{teamDetailsTeamSize}</Descriptions.Item>
//                 <Descriptions.Item label="Project Count">{teamDetailsProjectCount}</Descriptions.Item>
//                 <Descriptions.Item label="Team Notes">{teamDetailsTeamNotes}</Descriptions.Item>
//                 <Descriptions.Item label="Created Date">{teamDetailsCreatedDate}</Descriptions.Item>
//                 <Descriptions.Item label="Lead ID">{id}</Descriptions.Item>
//                 <Descriptions.Item label="Lead Name">{`${firstName} ${lastName}`}</Descriptions.Item>
//                 <Descriptions.Item label="Lead Email">{email}</Descriptions.Item>
//                 {/* Add more details as needed */}
//             </Descriptions>
//             {teamId}
//             {teamName}
//             {teamDescription}
//             {teamDetailsTeamSize}
//             {teamDetailsId}
//             {teamDescription}
//             {teamDetailsCreatedDate}
//             {id}
//             <div style={{ marginTop: '16px' }}>
//                 <Button  onClick={handleEdit} style={{ marginRight: '8px' }}>
//                     Edit Team Details
//                 </Button>
//                 <Button onClick={handleManageMembership}>Manage Team Membership</Button>
//             </div>
//         </Card>
//     );
// };

import React from 'react';
import { Card, Descriptions, Button, Row, Col } from 'antd';
import {doc} from "prettier";


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
    if (!teamDetails || teamDetails.length == 0) {
        return <div>No team details available</div>;
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
        <Card title="Team Details">
            <Descriptions bordered column={4}>
                <Descriptions.Item label="Team ID">{teamId}</Descriptions.Item>
                <Descriptions.Item label="Team Name">{teamName}</Descriptions.Item>
                <Descriptions.Item label="Team Description">{teamDescription}</Descriptions.Item>
                <Descriptions.Item label="Team Size">{teamDetailsTeamSize}</Descriptions.Item>
                <Descriptions.Item label="Project Count">{teamDetailsProjectCount}</Descriptions.Item>
                <Descriptions.Item label="Team Notes" span={3}>{teamDetailsTeamNotes}</Descriptions.Item>
                <Descriptions.Item label="Created Date">{teamDetailsCreatedDate}</Descriptions.Item>
                <Descriptions.Item label="Lead ID">{id}</Descriptions.Item>
                <Descriptions.Item label="Lead Name">{`${firstName} ${lastName}`}</Descriptions.Item>
                <Descriptions.Item label="Lead Email" span={2}>{email}</Descriptions.Item>
            </Descriptions>
            <Row justify="end" style={{ marginTop: '16px' }}>
                <Col>
                    <Button onClick={handleEdit} style={{ marginRight: '8px' }}>
                        Edit Team Details
                    </Button>
                </Col>
                <Col>
                    <Button onClick={handleManageMembership}>Manage Team Membership</Button>
                </Col>
            </Row>
        </Card>
        </div>
    );
};


