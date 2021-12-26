import fs from 'fs';
import path from 'path';

export function buildDataPath() {
    return path.join(process.cwd(), 'data', 'data.json');
}

export function extractData(filePath) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData.toString());
    return data;
}

let randomToken = require('randomstring');

module.exports = (req, res) => {
    if (req.method === 'GET') {
        const filePath = buildDataPath();
        const data = extractData(filePath);
        res.status(200).json(data);
    } else if (req.method === 'POST') {
        const { email, password } = req.body;

        const data = extractData(filePath);

        const findUser = data.users.findIndex(
            data => data.user.email === email
            && data.user.password === password
        )

        if (findUser >= 0) {
            // Berhasil Login
            
            const loginData = {
                jwt: randomToken.generate(36),
                user: data.users[findUser].user
            }

            data.users.push(loginData);
            res.status(200).send({
                user: data,
                meta: {
                    message: "Berhasil Login!"
                },
                pagination: {
                    total_records: 0,
                    total_page: 0,
                    limit_page: 0,
                    current_page: 0
                }
            })
        }
    }
}