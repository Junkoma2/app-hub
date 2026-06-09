#!/usr/bin/env node
/**
 * app-hub 整合性監査スクリプト
 * apps.json の公開アプリと app-hub の掲載URLの差分を検出する
 *
 * 使い方: node audit.js [--apps-json <path>]
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// app-hub自体は自分のページには掲載しない
const SKIP_IDS = ['app-hub', 'nnook']

const appsJsonPath = process.argv[3] || resolve(__dirname, '../apps.json')
const indexHtmlPath = resolve(__dirname, 'index.html')
const projectsHtmlPath = resolve(__dirname, 'projects.html')

let appsJson, indexHtml, projectsHtml
try {
  appsJson = JSON.parse(readFileSync(appsJsonPath, 'utf8'))
  indexHtml = readFileSync(indexHtmlPath, 'utf8')
  projectsHtml = readFileSync(projectsHtmlPath, 'utf8')
} catch (e) {
  console.error('ファイル読み込みエラー:', e.message)
  process.exit(1)
}

const publicApps = appsJson.apps.filter(
  a => a.status === 'public' && a.pagesUrl && !SKIP_IDS.includes(a.id)
)

let hasError = false
const issues = []

for (const app of publicApps) {
  const url = app.pagesUrl
  const inIndex = indexHtml.includes(url)
  const inProjects = projectsHtml.includes(url)

  if (!inIndex && !inProjects) {
    issues.push(`[掲載漏れ] ${app.id} (${url}) が index.html / projects.html に未掲載`)
    hasError = true
  } else if (!inProjects) {
    issues.push(`[警告] ${app.id} が projects.html に未掲載（index.htmlのみ）`)
  }
}

if (issues.length > 0) {
  console.error('== app-hub 整合性監査 ==')
  issues.forEach(i => console.error(i))
  if (hasError) process.exit(1)
} else {
  console.log('== app-hub 整合性監査: すべてのアプリが掲載済み ==')
}
