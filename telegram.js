const https = require('https');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body);
    const botToken = '9242143063:AAH107QTJ9MqzoUy7BEhV4A9JVMsm-6Kac0';
    const chatId = '8840326120';

    let message = 'New Support Request:\n';
    for (const [key, value] of Object.entries(data)) {
        message += `${key}: ${value}\n`;
    }

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const postData = JSON.stringify({ chat_id: chatId, text: message });

    return new Promise((resolve) => {
        const req = https.request(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Content-Length': postData.length },
        }, (res) => {
            res.on('data', () => {});
            res.on('end', () => resolve({ statusCode: 200, body: JSON.stringify({ message: 'Message sent' }) }));
        });

        req.on('error', () => resolve({ statusCode: 500, body: JSON.stringify({ message: 'Failed to send' }) }));
        req.write(postData);
        req.end();
    });
};
