import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Develop as a Nanoservice',
    Svg: require('@site/static/img/api.svg').default,
    description: (
      <>
       Nanoservices are developed as small microservices, inheriting all their advantages,
        such as isolated code and comprehensive testing environments.
      </>
    ),
  },
  {
    title: 'Use Docker as a private crate registry',
    Svg: require('@site/static/img/structs.svg').default,
    description: (
      <>
        Reference docker images in your cargo.toml for our package manager to download and 
        configure for your build. 
      </>
    ),
  },
  {
    title: 'Compile into single binary',
    Svg: require('@site/static/img/compile.svg').default,
    description: (
      <>
        Compiling into a single binary enhances performance by allowing functions to be 
      called in-memory, reducing latency. This approach simplifies deployment, streamlines 
      version control, and minimizes dependency conflicts.
      </>
    ),
  },
  
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
