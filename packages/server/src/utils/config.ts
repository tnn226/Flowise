// BEWARE: This file is an intereem solution until we have a proper config strategy

import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '..', '..', '.env'), override: true })

// デフォルトのログディレクトリを選択
// Render環境の場合やkubernetesなどクラウド環境では /tmp 配下に作成する
const getDefaultLogDir = () => {
    // 重要: LOG_PATHが設定されていれば最優先で使用
    if (process.env.LOG_PATH) {
        return process.env.LOG_PATH
    }

    // Render環境やその他のクラウド環境での実行の場合
    // 通常はwritableな/tmpディレクトリを使用する
    if (process.env.RENDER === 'true' || process.env.CLOUD_ENV === 'true' || process.env.NODE_ENV === 'production') {
        return path.join('/tmp', '.flowise', 'logs')
    }

    // 通常のローカル実行の場合
    return path.join(__dirname, '..', '..', 'logs')
}

// default config
const loggingConfig = {
    dir: getDefaultLogDir(),
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
