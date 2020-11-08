import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './home-page.module.scss';
import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import ChildrenImage from 'images/illustration-children-bro.svg';
import BoatImage from 'images/illustration-yacht-bro.svg';
import HousesImage from 'images/illustration-houses-bro.svg';

import ExampleDataset from 'components/example-dataset';

const cx = classNames.bind(styles);

export default function Home() {
  return (
    <Layout fluid>
      <Head>
        <title>Gold.is</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={cx('fluidWrapper', 'homePage')}>
        <Container>
          <Row>
            <Col>
              <p className={cx('hero')}>
                Let us tell you a story about your dataset.
              </p>
            </Col>
          </Row>
        </Container>

        <div className={cx('section', 'examples')}>
          <Container>
            <Row>
              <Col xs={12}>
                <h2>Example Datasets</h2>
              </Col>
            </Row>

            <ExampleDataset
              title="World Happiness Report 2020"
              description="The Happiness Score is a national average of the responses to the main life evaluation question asked in the Gallup World Poll (GWP), which uses the Cantril Ladder."
              imageSrc={ChildrenImage}
              dataUrl="https://github.com/gold-is/sample-datasets/raw/main/world_happiness_report_2020_cleaned.csv"
            />

            <ExampleDataset
              title="Titanic Dataset"
              description="The Titanic sank into the icy water in 1912. The tragic accident killed 1502 out of 2224 passengers and crew. Was women's chance of survival higher? How about passenger class? Did people with higher ticket prices have higher chances of survival?"
              imageSrc={BoatImage}
              dataUrl="https://raw.githubusercontent.com/gold-is/sample-datasets/main/titanic.csv"
            />

            <ExampleDataset
              title="New York Airbnb Data 2019"
              description="Since 2008, guests and hosts have used Airbnb to expand on traveling possibilities and present more unique, personalized way of experiencing the world. This dataset describes the listing activity and metrics in NYC, NY for 2019."
              imageSrc={HousesImage}
              dataUrl="https://github.com/gold-is/sample-datasets/raw/main/AirBnB_NYC_2019.csv"
            />
          </Container>
        </div>
      </main>
    </Layout>
  );
}
