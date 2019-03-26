// @flow

import * as React from 'react';

import ProjectBox from './ProjectBox';

import '../../css/v2.0.0/projects.css';

import projectData from '../json/project-data.json';

type SetCurPgFuncType = (newCurPg: string) => void;

export default class Projects extends React.PureComponent<{setCurPg: SetCurPgFuncType}> {
    componentDidMount() {
        const {setCurPg} = this.props;
        setCurPg('/projects');
    }

    render() {
        const projectBoxes = Object.keys(projectData).map((letter) => {
            return <ProjectBox key={letter}
                               letter={letter}
                               content={
                                   projectData[letter].length > 0 ?
                                   JSON.parse(JSON.stringify(projectData[letter][0])) :
                                   undefined
                               }
            />
        });

        return (
            <section id="body-projects">
                {projectBoxes}
            </section>
        )
    }
}
