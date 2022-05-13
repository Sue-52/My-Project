import { TabBar } from 'antd-mobile';
import { Route, useHistory, useLocation } from 'react-router-dom';

import Icon from '@/components/Icon';

// 导入页面组件，配置路由
import Home from '../HomePage';
import Profile from '../ProfilePage';
import Question from '../QuestionPage';
import Video from '../VideoPage';
import styles from './index.module.scss';

const tabs = [
  { path: '/home', icon: 'iconbtn_home', text: '首页' },
  { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
  { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
  { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' },
];

const Layout = () => {
  const localtion = useLocation();
  const history = useHistory();
  // 切换路由
  function changeRoute(key: string) {
    history.push(key);
  }
  return (
    <div className={styles.root}>
      {/* 内容区域*/}
      <Route exact path="/home" component={Home} />
      <Route path="/home/question" component={Question} />
      <Route path="/home/video" component={Video} />
      <Route path="/home/profile" component={Profile} />

      {/* 底部导航栏 */}
      <TabBar
        className="tab-bar"
        activeKey={localtion.pathname}
        onChange={(key) => changeRoute(key)}
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            icon={(active) => (
              <Icon
                type={active ? `${item.icon}_sel` : item.icon}
                className="tab-bar-item-icon"
              />
            )}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  );
};

export default Layout;
