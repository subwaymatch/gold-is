import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import usePyodideStore from 'stores/pyodide';
import Layout from 'components/Layout';
import StepsDisplay from 'components/steps-display';
import generateOverviewCode from 'python/generate-overview.py';
import generateColumnsSummary from 'python/generate-columns-summary.py';
import styles from './results-page.module.scss';
import classNames from 'classnames/bind';
import ColumnOverview from 'components/data-summary/column-overview';
import MyResponsiveHeatMap from 'components/visualizations/heatmap';
import DatasetStory from 'components/data-summary/dataset-story';
import SectionTitle from 'components/common/section-title';

const cx = classNames.bind(styles);

const dfSelector = (state) => state.dataFrame;

const data = [
  {
    country: 'AD',
    'hot dog': 29,
    'hot dogColor': 'hsl(32, 70%, 50%)',
    burger: 6,
    burgerColor: 'hsl(206, 70%, 50%)',
    sandwich: 27,
    sandwichColor: 'hsl(141, 70%, 50%)',
    kebab: 82,
    kebabColor: 'hsl(93, 70%, 50%)',
    fries: 61,
    friesColor: 'hsl(103, 70%, 50%)',
    donut: 19,
    donutColor: 'hsl(307, 70%, 50%)',
    junk: 10,
    junkColor: 'hsl(108, 70%, 50%)',
    sushi: 72,
    sushiColor: 'hsl(313, 70%, 50%)',
    ramen: 9,
    ramenColor: 'hsl(176, 70%, 50%)',
    curry: 4,
    curryColor: 'hsl(138, 70%, 50%)',
    udon: 94,
    udonColor: 'hsl(226, 70%, 50%)',
  },
  {
    country: 'AE',
    'hot dog': 5,
    'hot dogColor': 'hsl(160, 70%, 50%)',
    burger: 16,
    burgerColor: 'hsl(351, 70%, 50%)',
    sandwich: 28,
    sandwichColor: 'hsl(222, 70%, 50%)',
    kebab: 42,
    kebabColor: 'hsl(156, 70%, 50%)',
    fries: 69,
    friesColor: 'hsl(215, 70%, 50%)',
    donut: 9,
    donutColor: 'hsl(220, 70%, 50%)',
    junk: 44,
    junkColor: 'hsl(135, 70%, 50%)',
    sushi: 34,
    sushiColor: 'hsl(270, 70%, 50%)',
    ramen: 34,
    ramenColor: 'hsl(152, 70%, 50%)',
    curry: 79,
    curryColor: 'hsl(201, 70%, 50%)',
    udon: 64,
    udonColor: 'hsl(36, 70%, 50%)',
  },
  {
    country: 'AF',
    'hot dog': 7,
    'hot dogColor': 'hsl(256, 70%, 50%)',
    burger: 41,
    burgerColor: 'hsl(205, 70%, 50%)',
    sandwich: 16,
    sandwichColor: 'hsl(25, 70%, 50%)',
    kebab: 46,
    kebabColor: 'hsl(168, 70%, 50%)',
    fries: 32,
    friesColor: 'hsl(72, 70%, 50%)',
    donut: 22,
    donutColor: 'hsl(93, 70%, 50%)',
    junk: 83,
    junkColor: 'hsl(168, 70%, 50%)',
    sushi: 6,
    sushiColor: 'hsl(279, 70%, 50%)',
    ramen: 12,
    ramenColor: 'hsl(232, 70%, 50%)',
    curry: 92,
    curryColor: 'hsl(318, 70%, 50%)',
    udon: 84,
    udonColor: 'hsl(47, 70%, 50%)',
  },
  {
    country: 'AG',
    'hot dog': 59,
    'hot dogColor': 'hsl(228, 70%, 50%)',
    burger: 51,
    burgerColor: 'hsl(257, 70%, 50%)',
    sandwich: 84,
    sandwichColor: 'hsl(96, 70%, 50%)',
    kebab: 55,
    kebabColor: 'hsl(333, 70%, 50%)',
    fries: 85,
    friesColor: 'hsl(146, 70%, 50%)',
    donut: 66,
    donutColor: 'hsl(263, 70%, 50%)',
    junk: 87,
    junkColor: 'hsl(270, 70%, 50%)',
    sushi: 2,
    sushiColor: 'hsl(351, 70%, 50%)',
    ramen: 47,
    ramenColor: 'hsl(276, 70%, 50%)',
    curry: 84,
    curryColor: 'hsl(67, 70%, 50%)',
    udon: 49,
    udonColor: 'hsl(158, 70%, 50%)',
  },
  {
    country: 'AI',
    'hot dog': 78,
    'hot dogColor': 'hsl(158, 70%, 50%)',
    burger: 67,
    burgerColor: 'hsl(283, 70%, 50%)',
    sandwich: 79,
    sandwichColor: 'hsl(30, 70%, 50%)',
    kebab: 6,
    kebabColor: 'hsl(37, 70%, 50%)',
    fries: 13,
    friesColor: 'hsl(76, 70%, 50%)',
    donut: 22,
    donutColor: 'hsl(118, 70%, 50%)',
    junk: 12,
    junkColor: 'hsl(121, 70%, 50%)',
    sushi: 45,
    sushiColor: 'hsl(297, 70%, 50%)',
    ramen: 49,
    ramenColor: 'hsl(306, 70%, 50%)',
    curry: 79,
    curryColor: 'hsl(4, 70%, 50%)',
    udon: 20,
    udonColor: 'hsl(104, 70%, 50%)',
  },
  {
    country: 'AL',
    'hot dog': 81,
    'hot dogColor': 'hsl(18, 70%, 50%)',
    burger: 15,
    burgerColor: 'hsl(159, 70%, 50%)',
    sandwich: 99,
    sandwichColor: 'hsl(43, 70%, 50%)',
    kebab: 33,
    kebabColor: 'hsl(272, 70%, 50%)',
    fries: 41,
    friesColor: 'hsl(38, 70%, 50%)',
    donut: 75,
    donutColor: 'hsl(58, 70%, 50%)',
    junk: 81,
    junkColor: 'hsl(29, 70%, 50%)',
    sushi: 51,
    sushiColor: 'hsl(331, 70%, 50%)',
    ramen: 74,
    ramenColor: 'hsl(284, 70%, 50%)',
    curry: 77,
    curryColor: 'hsl(266, 70%, 50%)',
    udon: 41,
    udonColor: 'hsl(302, 70%, 50%)',
  },
  {
    country: 'AM',
    'hot dog': 31,
    'hot dogColor': 'hsl(318, 70%, 50%)',
    burger: 17,
    burgerColor: 'hsl(173, 70%, 50%)',
    sandwich: 68,
    sandwichColor: 'hsl(112, 70%, 50%)',
    kebab: 44,
    kebabColor: 'hsl(307, 70%, 50%)',
    fries: 40,
    friesColor: 'hsl(162, 70%, 50%)',
    donut: 7,
    donutColor: 'hsl(320, 70%, 50%)',
    junk: 20,
    junkColor: 'hsl(283, 70%, 50%)',
    sushi: 15,
    sushiColor: 'hsl(342, 70%, 50%)',
    ramen: 14,
    ramenColor: 'hsl(28, 70%, 50%)',
    curry: 95,
    curryColor: 'hsl(303, 70%, 50%)',
    udon: 90,
    udonColor: 'hsl(287, 70%, 50%)',
  },
  {
    country: 'AO',
    'hot dog': 66,
    'hot dogColor': 'hsl(281, 70%, 50%)',
    burger: 80,
    burgerColor: 'hsl(336, 70%, 50%)',
    sandwich: 99,
    sandwichColor: 'hsl(247, 70%, 50%)',
    kebab: 60,
    kebabColor: 'hsl(292, 70%, 50%)',
    fries: 69,
    friesColor: 'hsl(148, 70%, 50%)',
    donut: 14,
    donutColor: 'hsl(151, 70%, 50%)',
    junk: 56,
    junkColor: 'hsl(305, 70%, 50%)',
    sushi: 6,
    sushiColor: 'hsl(275, 70%, 50%)',
    ramen: 57,
    ramenColor: 'hsl(252, 70%, 50%)',
    curry: 26,
    curryColor: 'hsl(310, 70%, 50%)',
    udon: 30,
    udonColor: 'hsl(192, 70%, 50%)',
  },
  {
    country: 'AQ',
    'hot dog': 22,
    'hot dogColor': 'hsl(96, 70%, 50%)',
    burger: 57,
    burgerColor: 'hsl(90, 70%, 50%)',
    sandwich: 84,
    sandwichColor: 'hsl(232, 70%, 50%)',
    kebab: 36,
    kebabColor: 'hsl(68, 70%, 50%)',
    fries: 34,
    friesColor: 'hsl(233, 70%, 50%)',
    donut: 3,
    donutColor: 'hsl(350, 70%, 50%)',
    junk: 38,
    junkColor: 'hsl(265, 70%, 50%)',
    sushi: 53,
    sushiColor: 'hsl(32, 70%, 50%)',
    ramen: 26,
    ramenColor: 'hsl(104, 70%, 50%)',
    curry: 40,
    curryColor: 'hsl(299, 70%, 50%)',
    udon: 55,
    udonColor: 'hsl(80, 70%, 50%)',
  },
];

export default function SelectPage() {
  const [dfHtml, setDfHtml] = useState('');
  const [overview, setOverview] = useState<any>(null);
  const columnSummaries = usePyodideStore((state) => state.columnSummaries);
  const setColumnSummaries = usePyodideStore(
    (state) => state.setColumnSummaries
  );
  const pyodideManager = usePyodideStore((state) => state.pyodideManager);
  const df = usePyodideStore(dfSelector);
  const router = useRouter();

  useEffect(() => {
    if (!df) {
      router.push('/load');
      return;
    } else {
      (async () => {
        const overviewCodeResult = await pyodideManager.runCode(
          generateOverviewCode
        );

        console.log(overviewCodeResult);

        setOverview(overviewCodeResult.output);

        const columnsSummaryCodeResult = await pyodideManager.runCode(
          generateColumnsSummary
        );

        setColumnSummaries(columnsSummaryCodeResult.output.to_dict());
      })();

      setDfHtml(df.head(10).to_html());
    }
  }, []);

  return (
    <Layout fluid>
      <Container>
        <StepsDisplay currentIndex={2} />
      </Container>

      <Container>
        <Row>
          <Col>
            <div className={cx('storyDivider')} />
          </Col>
        </Row>
      </Container>

      <DatasetStory overview={overview} />

      <div className={cx('fluidWrapper')}>
        <Container>
          <Row>
            <Col>
              <SectionTitle desc="Dataset" title="Columns" />
            </Col>
          </Row>

          {columnSummaries &&
            Object.keys(columnSummaries).map((columnName) => {
              const columnSummary = columnSummaries[columnName];

              return (
                <div key={columnName}>
                  <ColumnOverview
                    columnName={columnName}
                    summary={columnSummary}
                    className={cx('columnOverview')}
                  />
                </div>
              );
            })}

          <Row>
            <Col>
              <div
                style={{
                  width: '100%',
                  height: '600px',
                }}
              >
                <MyResponsiveHeatMap data={data} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
