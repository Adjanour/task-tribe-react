// ExamplePage.tsx
import React, { useEffect, useState } from 'react';
import {ProjectForm} from '../components/ProjectForm';
import {ProjectDetails} from '../components/ProjectDetails';
import { Project } from '../types';
import axios from 'axios';
import {useTaskContext} from "@/features/Task-Module/stores/TaskContext";
import {useGetData} from "@/hooks/useGetData";
import {fetchTaskUpdates} from "@/features/Task-Module/utils/functions";
import {Card, Col, Divider, FloatButton, Row, Skeleton} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {TeamCreateForm} from "@/features/Team-Module/components/Elements/TeamForm";
import {TaskAssignForm} from "@/features/Team-Module/components/Elements/TeamForm/TaskAssignForm";
import {TeamDetails} from "@/features/Team-Module/components/TeamDetails";
import TeamTable from "@/features/Team-Module/components/Elements/TeamTable";
import ProjectTable from "@/features/Project-Module/components/ProjectTable/ProjectTable";

export const defaultProject: Project = {
    projectId: 1,
    projectName: 'Sample Project',
    projectStartDate: '2024-01-01',
    projectEndDate: '2024-12-31',
    projectCreatedDate: '2024-01-16',
    projectTeamId: 2,
    projectProjectManagerId: 1,
};
export  const ProjectCreatePage = () => {
    const projects = useGetData({dataAlias:"team",endpoint:"http://localhost:8000/api/v1/projects/",token:""})
    const [state,setState] = useState({
        selectedProjectId: "1",
        statusData: { label: "", value: "" },
        projectData: { label: "", value: "" },
        startDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
        endDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
        loading: false,
        pageState: 0,
        projectDetails:defaultProject,
    })
    useEffect(()=>{
       const projectsFiltered =  projects.data?.filter((project:Project)=>{
            return project.projectId === Number(state.selectedProjectId)
        })
        console.log(projectsFiltered)
        setState((prevState) => ({
            ...prevState,projectDetails: projectsFiltered ? projectsFiltered[0] : defaultProject
        }))
    },[state.selectedProjectId])
    const handlePageChange = (newPageState:number) => {
        setState({...state,pageState:newPageState})
    }

    return (
        <div className=" ">
            <FloatButton.Group trigger="click" type="primary" style={{ right: 24}}>
                <FloatButton tooltip={<div>Create</div>} icon={<PlusOutlined />} className="p-1"   onClick={() => handlePageChange(0)} />
                <FloatButton tooltip={<div>Assign</div>}  icon={<EditOutlined />} className="p-1" onClick={() => handlePageChange(1)} />
            </FloatButton.Group>
            <Row className="w-full">
                <Col span={9}>
                    <Card className="h-full p-0">
                        <div className="w-full mb-0 md:mb-0 p-0">
                            <div className="bg-gray-200 w-full rounded-md mb-2 dark:bg-white dark:text-black">
                                {state.pageState === 0 && <p className="text-2xl">Project </p>}
                                {state.pageState === 1 && <p className="text-2xl">Project Assignment</p>}
                            </div>
                            {projects.isLoading ? (
                                <Skeleton active />
                            ) : (
                                <>
                                    {state.pageState === 0 && <ProjectForm refetchProjects={projects.refetchData} />}
                                    {state.pageState === 1 && <TaskAssignForm />}
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
                                // <TaskUpdateTable pageSize={5} tasks={state.taskUpdates} yScroll={295} refetchData={refetchData} />
                                // <TeamDetails teamDetails={state.teamDetails}/>
                                <ProjectDetails project={state.projectDetails}/>
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
                            <ProjectTable setState={setState} pageSize={50} projects={projects.data} yScroll={400} />
                        )}

                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default ProjectCreatePage