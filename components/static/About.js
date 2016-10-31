import React from 'react';
import styles from '../sass/about.scss';

class About extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <h1 className={styles.title}>About</h1>
        <div className={styles.description}>
          <h2 id={styles.who}>Who We Are</h2>
          <p id={styles.paragraph}>We are a duo of programmers from Hawaii. Our origins as Web Developers
          started in September of 2016 when we joined the <a id={styles.link} href='http://www.devleague.com/'>DevLeague</a> program.
          Although our backgrounds are different, we came into the program with the same goal in mind. JP, a
          former banker, came into the program with no coding experience. Now, 8 weeks later, he is a Full-Stack
          Developer. Renee worked as a health administrator in Boston before deciding to change her career path. She discovered
          her passion for Web Development when she saw the need for a better web interface for her hospital's departmental website. She
          learned how to create the website through independent studying. In order to accelerate her career path change, Renee
          began the DevLeague program.
          </p>
        </div>
      </div>
    )
  }
}

export default About;