import { Table } from 'antd';
import { useRequest, useMount } from 'ahooks';
import repoService from '@/services/getRepo';
import styles from './index.module.less';


export default function Home() {
  const { data, run, loading, error } = useRequest(repoService.getRepo);
  const { dataSource = [] } = data || {};

  useMount(() => {
    console.log('Home useMount....');
    run();
  });

  return (
    <div className={styles.container}>
      <h2>Home page</h2>
      {error ? (
        <div>request error: {error.message}</div>
      ) : (
        <Table loading={loading} dataSource={dataSource} rowKey="id">
          <Table.Column title="ID" dataIndex="id" key="id" />
          <Table.Column title="名称" dataIndex="name" key="name" />
          <Table.Column title="描述" dataIndex="description" key="description" />
        </Table>
      )}
    </div>
  );
}
