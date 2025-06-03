import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

function Projects() {
      const{ PortfolioData} = useSelector((state) => state.root);
  const{projects}= PortfolioData;
  return (
    <div>
      <SectionTitle title="Projects" />

      <div className="flex flex-col gap-6 mt-6">
        {projects.map((project, index) => (
          <div
            key={project._id|| index}
            className="border border-tertiary rounded p-5 hover:shadow-lg transition-all"
          >
            <h2 className="text-secondary text-xl font-semibold">
              {project.title}
            </h2>
            <p className="text-white mt-2">{project.description}</p>
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tertiary underline mt-2 inline-block"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
