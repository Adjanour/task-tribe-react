import React, { useEffect, useState } from 'react';
import { ProjectDetails } from '../components/ProjectDetails';
import { TeamDetails } from '../../Team-Module/components/TeamDetails';
import { TaskTable } from '../components/TaskTable';
import { ProjectTeamForm } from '../components/ProjectTeamForm';
import { ProjectTaskForm } from '../components/ProjectTaskForm';
import { Project } from '../types';
import { useGetData } from '@/hooks/useGetData';
import {FloatButton, Card, Row, Col, Divider, Skeleton, Button} from 'antd';
import {EditOutlined, PlusCircleOutlined, PlusOutlined, ScheduleOutlined, TeamOutlined} from '@ant-design/icons';
import TeamTable from "@/features/Team-Module/components/Elements/TeamTable";
import { useParams } from 'react-router-dom';

export const defaultProject: Project = {
    projectId: 2,
    projectName: 'Sample Project',
    projectStartDate: '2024-01-01',
    projectEndDate: '2024-12-31',
    projectCreatedDate: '2024-01-16',
    projectTeamId: 2,
    projectProjectManagerId: 1,
};

export const ProjectPage = () => {
    const params = useParams();
    const projects = useGetData({ dataAlias: 'team', endpoint: 'http://localhost:8000/api/v1/projects/', token: '' });
    const teamDetails = useGetData({dataAlias:"teamDetails",endpoint:"http://localhost:8000/api/v1/team-details/",token:""})
    const team = useGetData({dataAlias:"team",endpoint:`http://localhost:8000/api/v1/project-teams/${params.projectId}`,token:""})

    const [state, setState] = useState({
        selectedProjectId: '1',
        projectDetails: defaultProject,
        pageState: 0, // 0: Project Details, 1: Project Teams, 2: Project Tasks
    });

    useEffect(() => {
        const projectsFiltered = projects.data?.filter((project: Project) => {
            return project.projectId === Number(state.selectedProjectId);
        });

        setState((prevState) => ({
            ...prevState,
            projectDetails: projectsFiltered ? projectsFiltered[0] : defaultProject,
        }));
    }, [state.selectedProjectId, projects.data]);

    const handlePageChange = (newPageState: number) => {
        setState({ ...state, pageState: newPageState });
    };

    return (
        <div className=" ">
            <FloatButton.Group trigger="click" type="primary" style={{ right: 24 }}>
                <FloatButton
                    tooltip={<div>Create</div>}
                    icon={<PlusCircleOutlined />}
                    onClick={() => handlePageChange(0)}
                />
                <FloatButton
                    tooltip={<div>Manage Teams</div>}
                    icon={<TeamOutlined />}
                    onClick={() => handlePageChange(1)}
                />
                <FloatButton
                    tooltip={<div>Manage Tasks</div>}
                    icon={<ScheduleOutlined />}
                    onClick={() => handlePageChange(2)}
                />
            </FloatButton.Group>

            <Row className="w-full">
                <Col span={9}>
                    <Card className="h-full p-0">
                        <div className="w-full mb-0 md:mb-0 p-0">
                            <div className="bg-gray-200 w-full rounded-md mb-2 dark:bg-white dark:text-black">
                                {state.pageState === 0 && <p className="text-2xl">Project Details</p>}
                                {state.pageState === 1 && <p className="text-2xl">Manage Teams</p>}
                                {state.pageState === 2 && <p className="text-2xl">Manage Tasks</p>}
                            </div>
                            {projects.isLoading ? (
                                <Skeleton active />
                            ) : (
                                <>
                                    {state.pageState === 0 && <ProjectDetails project={state.projectDetails} />}
                                    {state.pageState === 1 && <ProjectTeamForm projectId={Number(state.selectedProjectId)} />}
                                    {state.pageState === 2 && <ProjectTaskForm projectId={Number(state.selectedProjectId)} />}
                                </>
                            )}
                        </div>
                    </Card>
                </Col>
                <Col span={15}>
                    <Card className="h-full">
                        <div className="w-full mb-0">
                            <div className="bg-gray-200 rounded-md mb-0 dark:bg-white dark:text-black">
                                <p className="text-2xl">Project Details</p>
                            </div>
                            {projects.isLoading ? (
                                <Skeleton active />
                            ) : (
                                <>
                                    {state.pageState === 0 && <ProjectDetails project={state.projectDetails} />}
                                    {state.pageState === 1 && <TeamDetails teamDetails={teamDetails.data} />}
                                    {state.pageState === 2 && <TaskTable projectId={Number(state.selectedProjectId)} />}
                                </>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
            <Divider className="bg-blue-400 m-0" />
            <Row className="w-full h-1/2">
                <Col span={24}>
                    <Card className="h-full p-1">
                        {projects.isLoading ? (
                            <Skeleton active />
                        ) : (
                            <TeamTable setState={setState} pageSize={50} teams={team.data} yScroll={400} />
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProjectPage;
