import React from 'react';
import { useSelector } from 'react-redux';
import Headers from '../../components/Header';
import Intro from './Intro';
import About from './About';
import Skill from './Skill';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import LeftSider from './LeftSider';

function Home({setToken, setUserRole, setRoleChecked}) {
  const { PortfolioData } = useSelector((state) => state.root);

  if (!PortfolioData) return null;

  return (
    <div>
      <Headers  setToken={setToken} setUserRole={setUserRole} setRoleChecked={setRoleChecked} />
      <div className='bg-primary px-40 sm:px-5'>
        <section id="profile">
          <Intro />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="skills">
          <Skill />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <Footer />
        <LeftSider />
      </div>
    </div>
  );
}

export default Home;
