import * as core from '@actions/core'
import axios from 'axios'

async function run() {
  try {
    const repository = process.env.GITHUB_REPOSITORY
    const workflow = process.env.GITHUB_WORKFLOW
    const runId = process.env.GITHUB_RUN_ID
    const runNumber = process.env.GITHUB_RUN_NUMBER
    const commit = process.env.GITHUB_SHA
    let ref = process.env.GITHUB_REF

    const jobStatus = process.env.INPUT_JOB_STATUS

    const botToken = '5365896757:AAFb30hf22bMj8AZBfdmhn2wbOBmra74ITQ'
    //process.env.INPUT_BOT_TOKEN
    const chatId = '329763759'
    //process.env.INPUT_CHAT_ID

    let statusMessage = 'Undefined ❎'

    switch (jobStatus) {
      case 'success':
        statusMessage = 'Success ✅'
        break
      case 'failure':
        statusMessage = 'Failure 🚫'
        break
      case 'cancelled':
        statusMessage = 'Cancelled ❌'
        break
    }

    let tag

    if (ref?.startsWith('refs/tags/')) {
      tag = ref.replace('refs/tags/', '')
      ref = `\nTag: ${tag}`
    } else if (ref?.startsWith('refs/heads/')) {
      ref = `\nBranch: ${ref.replace('refs/heads/', '')}`
    } else {
      ref = ''
    }

    const checkURL = `https://github.com/${repository}/commit/${commit}/checks`

    await axios.get(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      params: {
        chat_id: chatId,
        text: `*GitHub Actions Workflow*\nStatus: ${statusMessage}\nRepository: https://github.com/${repository}` +
          `${ref}\nWorkflow: ${workflow} - ${runId} (${runNumber})\nChecks: ${checkURL}`,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      },
    })

    if (jobStatus !== 'success' || !tag) {
      return
    }

  } catch (error) {
    core.setFailed(error)
  }
}

run()