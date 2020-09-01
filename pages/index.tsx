import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/Layout';
import styles from './home-page.module.scss';
import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import ChildrenBroImage from 'images/illustration-children-bro.svg';

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
              <p className={cx('hero')}>Find the gold in your dataset.</p>
            </Col>
          </Row>
        </Container>

        <div className={cx('section', 'examples')}>
          <Container>
            <Row>
              <Col md={12}>
                <h2>Example Datasets</h2>
              </Col>
            </Row>

            <div className={cx('exampleItem')}>
              <Row>
                <Col md={8}>
                  <h3>World Happiness Report 2020</h3>

                  <p>
                    The Happiness Score is a national average of the responses
                    to the main life evaluation question asked in the Gallup
                    World Poll (GWP), which uses the Cantril Ladder.
                  </p>

                  <a>Select and Continue 🡒</a>
                </Col>

                <Col md={4}>
                  <img src={ChildrenBroImage} alt="World Happiness Image" />
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </main>
    </Layout>
  );
}
