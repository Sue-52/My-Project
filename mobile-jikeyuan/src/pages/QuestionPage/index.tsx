import { NavBar } from 'antd-mobile';
import { useState } from 'react';

import styles from './index.module.scss';

// 引入类型
import { HomeQuestionLists } from '@/types/data';

const Question = () => {
  const [data, setData] = useState<HomeQuestionLists[]>([
    {
      title: '作为 IT 行业的过来人，你有什么话想对后辈说的？',
      agree: 1000,
      comment: 100,
      time: '2020-01-01',
      img: 'http://geek.itheima.net/resources/images/9.jpg',
    },
    {
      title: '作为 IT 行业的过来人，你有什么话想对后辈说的？',
      agree: 1000,
      comment: 100,
      time: '2020-01-01',
      img: 'http://geek.itheima.net/resources/images/9.jpg',
    },
    {
      title: '作为 IT 行业的过来人，你有什么话想对后辈说的？',
      agree: 1000,
      comment: 100,
      time: '2020-01-01',
      img: 'http://geek.itheima.net/resources/images/9.jpg',
    },
    {
      title: '作为 IT 行业的过来人，你有什么话想对后辈说的？',
      agree: 1000,
      comment: 100,
      time: '2020-01-01',
      img: 'http://geek.itheima.net/resources/images/9.jpg',
    },
    {
      title: '作为 IT 行业的过来人，你有什么话想对后辈说的？',
      agree: 1000,
      comment: 100,
      time: '2020-01-01',
      img: 'http://geek.itheima.net/resources/images/9.jpg',
    },
  ]);

  return (
    <div className={styles.root}>
      <NavBar>问答</NavBar>

      <div className="question-list">
        {data.map((item, index) => (
          <div className="question-item" key={index}>
            <div className="left">
              <h3>{item.title}</h3>
              <div className="info">
                <span>赞同 {item.agree}+</span>
                <span>评论 {item.comment}+</span>
                <span>{item.time}</span>
              </div>
            </div>
            <div className="right">
              <img src={item.img} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
