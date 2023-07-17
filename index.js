// 导入必要的模块和库
const express = require('express');
const axios = require('axios');

// 创建 Express 应用
const app = express();

// 定义用于处理订阅事件的路由
app.post('/subscription', async (req, res) => {
  // 处理订阅事件逻辑

  // 假设从请求中获取到了用户信息和订阅时间
  const { userId, subscriptionTime } = req.body;

  // 等待 1 分钟
  await delay(60000);

  // 发送服务提醒消息
  try {
    const accessToken = await getAccessToken(); // 获取访问令牌
    const templateId = 'WsdmQ7-3J-zqj6IxG030OgF9cVinrk6xDssGgSuQuns'; // 替换为您的模板 ID
    const message = {
      touser: userId,
      template_id: templateId,
      data: {
        // 根据模板要求设置消息内容
        keyword1: { value: '服务提醒内容' },
        keyword2: { value: '更多信息' }
      }
    };

    // 使用 axios 发送 POST 请求到微信推送服务消息接口
    await axios.post(`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${accessToken}`, message);

    // 发送成功
    console.log('服务提醒消息发送成功');
  } catch (error) {
    // 发送失败
    console.error('服务提醒消息发送失败:', error.message);
  }

  // 返回响应
  res.status(200).end();
});

// 辅助函数：延迟指定时间
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 辅助函数：获取访问令牌

// 辅助函数：获取访问令牌
async function getAccessToken() {
  const appId = 'wx1e1f16b64387ae7d'; // 替换为您的小程序的 AppID
  const appSecret = 'f39e51eda08d414b43d22974d4a23e1b'; // 替换为您的小程序的 AppSecret

  try {
    const response = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`);
    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('获取访问令牌失败:', error.message);
    throw error;
  }
}

// 启动 Express 应用
const port = 3000;
app.listen(port, () => {
  console.log(`应用已启动，监听端口 ${port}`);
});
