import './App.scss';

import { Redirect, Route, Router, Switch } from 'react-router-dom';

// 组件
import Article from '@/pages/ArticlePage';
import Layout from '@/pages/Layout';
import Login from '@/pages/LoginPage';
import ProfileEdit from '@/pages/ProfilePage/EditPage';
import Search from '@/pages/SearchPage';
import Chat from '@/pages/ChatPage';
import SearchResult from '@/pages/SearchPage/Result';
// 引入方法
import { useCustomHistory } from '@/hooks/useCustomHistory';

function App() {
  return (
    <div className="app">
      {/* react-router-dom */}
      <Router history={useCustomHistory}>
        <Switch>
          {/* 重定向到首页 */}
          <Route exact path="/" render={() => <Redirect to="/home" />}></Route>
          {/* 首页 */}
          <Route path={'/home'} component={Layout} />
          {/* 登录页 */}
          <Route path={'/login'} component={Login} />
          {/* 个人信息编辑页 */}
          <Route path="/profile/edit" component={ProfileEdit} />
          {/*搜索*/}
          <Route exact path="/search" component={Search} />
          {/* 搜索结果页 */}
          <Route path="/search/result" component={SearchResult} />
          {/* 文章页 */}
          <Route path="/articles/:id" component={Article}></Route>
          {/* 小智同学页 , 未完成*/}
          <Route path="/chat" component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
