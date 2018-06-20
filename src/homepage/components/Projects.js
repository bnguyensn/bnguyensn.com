// @flow

import * as React from 'react';

import ProjectBox from './ProjectBox';

import '../css/projects.css';

import projectData from '../json/project-data.json';

function Projects() {
    const projectBoxes = Object.keys(projectData).map((letter) => {
        // console.log(`Checking letter ${letter}`);
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

export default Projects
