// @flow

import * as React from 'react';

import ProjectBox from './ProjectBox';

import projectData from '../json/project-data.json';

function Projects() {
    const projectBoxes = Object.keys(projectData).map(letter => {
        // console.log(letter);
        // const obj = JSON.parse(JSON.stringify(projectData[v][0]));
        if (projectData[letter].length > 0) {
            console.log(JSON.parse(JSON.stringify(projectData[letter][0])));
            return <ProjectBox key={letter}
                               letter={letter}
                               content={JSON.parse(JSON.stringify(projectData[letter][0]))}/>
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
