module.exports = (robot) => {
  robot.on('issues.closed', async context => {
    const body = context.payload.issue.body
    const hasUnchecked = /-\s\[\s\]/g.test(body)

    if (hasUnchecked) {
      robot.log('Reopening issue due to open tasks')

      context.github.issues.edit(context.issue({
        state: 'open'
      }))

      context.github.issues.createComment(context.issue({
        body: 'Reopening issue due to open tasks'
      }))
    }
  })
}
