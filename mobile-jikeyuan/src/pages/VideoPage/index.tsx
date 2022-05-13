/* eslint-disable */
import { NavBar } from 'antd-mobile';
import { useState } from 'react';

import styles from './index.module.scss';
// 引入类型
import { VideoList } from '@/types/data';

const Video = () => {
  const [data, setData] = useState<VideoList[]>([
    {
      title: '格力电器将继续发展手机业务，并将向全产业覆盖！',
      video:
        'https://ips.ifeng.com/video19.ifeng.com/video09/2021/05/26/p6803231351488126976-102-8-161249.mp4?reqtype=tsl&vid=2c791e3b-444e-4578-83e3-f4808228ae3b&uid=0puFR4&from=v_Free&pver=vHTML5Player_v2.0.0&sver=&se=&cat=&ptype=&platform=pc&sourceType=h5&dt=1622096387396&gid=6a4poXmsep1E&sign=39f76885daca6503ebf90acbfffc1ff1&tm=1622096387396',
      playTime: 1563,
    },
    {
      title: '你用上5G了吗？我国5G手机终端达3.1亿 占全球比例超80％',
      video:
        'https://ips.ifeng.com/video19.ifeng.com/video09/2021/05/26/p6803231351488126976-102-8-161249.mp4?reqtype=tsl&vid=2c791e3b-444e-4578-83e3-f4808228ae3b&uid=0puFR4&from=v_Free&pver=vHTML5Player_v2.0.0&sver=&se=&cat=&ptype=&platform=pc&sourceType=h5&dt=1622096387396&gid=6a4poXmsep1E&sign=39f76885daca6503ebf90acbfffc1ff1&tm=1622096387396',
      playTime: 1563,
    },
  ]);

  return (
    <div className={styles.root}>
      <NavBar>视频</NavBar>

      <div className="video-list">
        {data.map((item, index) => (
          <div className="video-item" key={index}>
            <h3 className="title">{item.title}</h3>
            <div className="play">
              <video src={item.video}></video>
            </div>
            <span>{item.playTime} 次播放</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;
