// BEWARE: This file is an intereem solution until we have a proper config strategy

import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '..', '..', '.env'), override: true })

// デフォルトのログディレクトリを選択
// Render環境の場合は /tmp 配下に作成する
const getDefaultLogDir = () => {
    // Render環境での実行の場合
    if (process.env.RENDER === 'true') {
        return path.join('/tmp', '.flowise', 'logs')
    }
    // 通常のローカル実行の場合
    return path.join(__dirname, '..', '..', 'logs')
}

// default config
const loggingConfig = {
    dir: process.env.LOG_PATH ?? getDefaultLogDir(),
    server: {
        level: process.env.LOG_LEVEL ?? 'info',
        filename: 'server.log',
        errorFilename: 'server-error.log'
    },
    express: {
        level: process.env.LOG_LEVEL ?? 'info',
        format: 'jsonl', // can't be changed currently
        filename: 'server-requests.log.jsonl' // should end with .jsonl
    }
}

export default {
    logging: loggingConfig
}
