// @flow

import * as React from 'react';

import ProjectBox from './ProjectBox';

import projectData from '../json/project-data.json';

function Projects() {
    const projectBoxes = Object.keys(projectData).map(letter => {
        if (projectData[letter].length > 0) {
            return <ProjectBox key={letter}
                               letter={letter}
                               content={
                                   projectData[letter].length > 0 ?
                                   JSON.parse(JSON.stringify(projectData[letter][0])) :
                                   undefined
                               }/>
        }
        return <span key={letter}>Nothing</span>
    });

    return (
        <section id="body-projects">
            {projectBoxes}
        </section>
    )
}

export default Projects
