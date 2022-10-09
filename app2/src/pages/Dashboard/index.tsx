import React, { useEffect } from 'react';
import { Card, Button, Typography, Input, Tooltip } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import router from '@/utils/history';
import { connect } from 'dva';
import { importAssetsPath } from '@/utils/importUtils';
import styles from './index.module.less';
import MonacoEditor from 'react-monaco-editor';
import moment from 'moment';
import _ from 'lodash';
import EchartExample from './components/echarts';
console.log(React.version);

function Dashboard(props) {
  const { count, dispatch } = props;
  return (
    <>
      <Card>
        <Typography.Paragraph>
          <h3>路由跳转:</h3>
          <div>
            router.push: <Button onClick={() => router?.push('/')}>home</Button>
          </div>
          <div>
            router.replace: <Button onClick={() => router?.replace('/')}>home</Button>
          </div>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <h3>moment:</h3>
          <div>{moment('20111031', 'YYYYMMDD').fromNow()}</div>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <h3>lodash:</h3>
          <div>random: {_.random(0, 5)}</div>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <h3>dva演示:</h3>
          <div>
            <Button onClick={() => dispatch({ type: 'count/minus' })}>
              <MinusOutlined />
            </Button>
            <Input value={count} style={{ width: 40 }} />
            <Button onClick={() => dispatch({ type: 'count/add' })}>
              <PlusOutlined />
            </Button>
          </div>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <h3>图片测试:</h3>
          <div>
            动态路径png:
            <Tooltip title={importAssetsPath('images/empty.png')}>
              <img src={importAssetsPath('images/empty.png')} />
            </Tooltip>
            background:
            <span className={styles.backgroundImg} />
          </div>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <h3>monaco-editor:</h3>
          <div>
            <MonacoEditor width="800" height="600" language="javascript" theme="vs-dark" value={'test code'} />
          </div>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <h3>echarts:</h3>
          <EchartExample />
        </Typography.Paragraph>
      </Card>
    </>
  );
}

export default connect(({ count }: any) => ({
  count,
}))(Dashboard);
