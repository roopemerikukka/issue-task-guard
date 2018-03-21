const { createRobot } = require('probot')
const app = require('..')
const issueClosedWithTasksPayload = require('./payload/issue_closed_with_open_tasks')
const issueClosedWithoutTasksPayload = require('./payload/issue_closed_without_open_tasks')
const issueReOpenedPayload = require('./payload/issue_reopened')
const issueOpenedPayload = require('./payload/issue_opened')

describe('issue-task-guard', () => {
  let robot
  let github

  beforeEach(() => {
    robot = createRobot()
    app(robot)
    github = {
      issues: {
        edit: jest.fn().mockReturnValue(Promise.resolve({})),
        createComment: jest.fn().mockReturnValue(Promise.resolve({}))
      }
    }
    robot.auth = () => Promise.resolve(github)
  })

  it('should reopen the issue if tasks open', async () => {
    await robot.receive(issueClosedWithTasksPayload)
    expect(github.issues.edit).toHaveBeenCalledWith({
      number: issueClosedWithTasksPayload.payload.issue.number,
      owner: issueClosedWithTasksPayload.payload.repository.owner.login,
      repo: issueClosedWithTasksPayload.payload.repository.name,
      state: 'open'
    })
  })

  it('should comment the issue if tasks open', async () => {
    await robot.receive(issueClosedWithTasksPayload)
    expect(github.issues.createComment).toBeCalled()
  })

  it('should not reopen the issue if no tasks open', async () => {
    await robot.receive(issueClosedWithoutTasksPayload)
    expect(github.issues.edit).not.toBeCalled()
  })

  it('should not edit when issue reopened', async () => {
    await robot.receive(issueReOpenedPayload)
    expect(github.issues.edit).not.toBeCalled()
  })

  it('should not comment when issue reopened', async () => {
    await robot.receive(issueReOpenedPayload)
    expect(github.issues.createComment).not.toBeCalled()
  })

  it('should not edit when issue opened', async () => {
    await robot.receive(issueOpenedPayload)
    expect(github.issues.edit).not.toBeCalled()
  })

  it('should not comment when issue opened', async () => {
    await robot.receive(issueOpenedPayload)
    expect(github.issues.createComment).not.toBeCalled()
  })
})
